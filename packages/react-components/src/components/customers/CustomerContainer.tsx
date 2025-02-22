import { useContext, useEffect, useReducer, useMemo } from 'react'
import customerReducer, {
  customerInitialState,
  getCustomerAddresses,
  getCustomerOrders,
  getCustomerPaymentSources,
  setCustomerEmail,
  setCustomerErrors,
  deleteCustomerAddress,
  createCustomerAddress,
  type TCustomerAddress,
  saveCustomerUser,
  getCustomerPayments,
  getCustomerSubscriptions
} from '#reducers/CustomerReducer'
import OrderContext from '#context/OrderContext'
import CommerceLayerContext from '#context/CommerceLayerContext'
import CustomerContext from '#context/CustomerContext'
import type { BaseError } from '#typings/errors'
import type { DefaultChildrenType } from '#typings/globals'

interface Props {
  children: DefaultChildrenType
  /**
   * Customer type
   */
  isGuest?: boolean
}

export function CustomerContainer(props: Props): JSX.Element {
  const { children, isGuest = false } = props
  const [state, dispatch] = useReducer(customerReducer, customerInitialState)
  const {
    order,
    addResourceToInclude,
    include,
    updateOrder,
    includeLoaded,
    withoutIncludes
  } = useContext(OrderContext)
  const config = useContext(CommerceLayerContext)
  useEffect(() => {
    if (
      !include?.includes('available_customer_payment_sources.payment_source') &&
      !isGuest
    ) {
      addResourceToInclude({
        newResource: 'available_customer_payment_sources.payment_source'
      })
    } else if (
      !includeLoaded?.['available_customer_payment_sources.payment_source'] &&
      !isGuest
    ) {
      addResourceToInclude({
        newResourceLoaded: {
          'available_customer_payment_sources.payment_source': true
        }
      })
    }
  }, [include?.length, Object.keys(includeLoaded ?? {}).length])

  useEffect(() => {
    if (config.accessToken && state.addresses == null && !isGuest) {
      void getCustomerAddresses({
        config,
        dispatch,
        isOrderAvailable: withoutIncludes != null
      })
    }
    if (order?.available_customer_payment_sources && !isGuest) {
      getCustomerPaymentSources({ dispatch, order })
    }
    if (
      config.accessToken &&
      order == null &&
      include == null &&
      includeLoaded == null &&
      !isGuest
    ) {
      async function getCustomerData(): Promise<void> {
        await getCustomerOrders({ config, dispatch })
        await getCustomerSubscriptions({ config, dispatch })
        await getCustomerPayments({ config, dispatch })
      }
      void getCustomerData()
    }
  }, [config.accessToken, order, isGuest])
  const contextValue = useMemo(() => {
    return {
      isGuest,
      ...state,
      saveCustomerUser: async (customerEmail: string) => {
        await saveCustomerUser({
          config,
          customerEmail,
          dispatch,
          updateOrder,
          order
        })
      },
      setCustomerErrors: (errors: BaseError[]) => {
        setCustomerErrors(errors, dispatch)
      },
      setCustomerEmail: (customerEmail: string) => {
        setCustomerEmail(customerEmail, dispatch)
      },
      getCustomerPaymentSources: () => {
        getCustomerPaymentSources({ dispatch, order })
      },
      deleteCustomerAddress: async ({
        customerAddressId
      }: {
        customerAddressId: string
      }) => {
        await deleteCustomerAddress({
          customerAddressId,
          dispatch,
          config,
          addresses: state.addresses
        })
      },
      createCustomerAddress: async (address: TCustomerAddress) => {
        await createCustomerAddress({ address, config, dispatch, state })
      },
      getCustomerOrders: async ({
        pageNumber,
        pageSize
      }: {
        pageNumber?: number
        pageSize?: number
      }) => {
        await getCustomerOrders({
          config,
          dispatch,
          pageNumber,
          pageSize
        })
      }
    }
  }, [state, isGuest])
  return (
    <CustomerContext.Provider value={contextValue}>
      {children}
    </CustomerContext.Provider>
  )
}

export default CustomerContainer
