import { Dispatch } from 'react'
import { SetLocalOrder, DeleteLocalOrder } from '#utils/localStorage'
import { CommerceLayerConfig } from '#context/CommerceLayerContext'
import baseReducer from '#utils/baseReducer'
import { ItemOption, CustomLineItem } from './ItemReducer'
import { isEmpty, size, map } from 'lodash'
import differenceBy from 'lodash/differenceBy'
import { BaseMetadataObject } from '#typings/index'
import { BaseError } from '#typings/errors'
import getSdk from '#utils/getSdk'
import getErrors from '../utils/getErrors'
import {
  Order,
  LineItemCreate,
  LineItemOptionCreate,
  OrderUpdate,
} from '@commercelayer/sdk'

export interface GetOrderParams {
  clearWhenPlaced?: boolean
  config: CommerceLayerConfig
  deleteLocalOrder?: DeleteLocalOrder
  dispatch: Dispatch<OrderActions>
  id: string
  persistKey?: string
}

export interface GetOrder {
  (params: GetOrderParams): Promise<void | Order>
}

type CreateOrderParams = Pick<
  AddToCartParams,
  | 'config'
  | 'dispatch'
  | 'persistKey'
  | 'state'
  | 'orderMetadata'
  | 'orderAttributes'
  | 'setLocalOrder'
>

export interface CreateOrder {
  (params: CreateOrderParams): Promise<string>
}

export interface AddToCartParams {
  skuCode: string
  persistKey: string
  config: CommerceLayerConfig
  dispatch: Dispatch<OrderActions>
  state: Partial<OrderState>
  skuId?: string
  quantity?: number
  option?: ItemOption
  lineItem?: CustomLineItem
  orderMetadata?: BaseMetadataObject
  orderAttributes?: Record<string, any>
  errors?: BaseError[]
  setLocalOrder?: SetLocalOrder
}

export interface AddToCartImportParams
  extends Omit<
    AddToCartParams,
    'skuCode' | 'skuId' | 'quantity' | 'option' | 'lineItem'
  > {
  lineItems: CustomLineItem[]
}

export type AddToCartReturn = Promise<{
  success: boolean
}>

export interface AddToCart {
  (params: AddToCartParams): AddToCartReturn
}

export interface AddToCartImport {
  (params: AddToCartImportParams): AddToCartReturn
}

export interface UnsetOrderState {
  (dispatch: Dispatch<OrderActions>): void
}

export interface OrderPayload {
  loading?: boolean
  orderId?: string
  order?: Order
  errors?: BaseError[]
}

export type AddToCartValues = {
  skuCode: string
  skuId?: string
  quantity?: number
  option?: ItemOption
  lineItem?: CustomLineItem
}

export type AddToCartImportValues = Pick<AddToCartImportParams, 'lineItems'>

export type getOrderContext = (id: string) => Promise<undefined | Order>

export interface OrderState extends OrderPayload {
  loading: boolean
  orderId: string
  order?: Order
  saveBillingAddressToCustomerAddressBook: boolean
  saveShippingAddressToCustomerAddressBook: boolean
  getOrder?: getOrderContext
  createOrder?: () => Promise<string>
  addToCart: (values: AddToCartValues) => AddToCartReturn
  setOrderErrors: (collection: any) => { success: boolean }
  setGiftCardOrCouponCode: SetGiftCardOrCouponCode
  removeGiftCardOrCouponCode: RemoveGiftCardOrCouponCode
  saveAddressToCustomerAddressBook: (
    type: 'BillingAddress' | 'ShippingAddress',
    value: boolean
  ) => void
}

export interface OrderActions {
  type: OrderActionType
  payload: OrderPayload
}

export type OrderActionType =
  | 'setLoading'
  | 'setOrderId'
  | 'setOrder'
  | 'setSingleQuantity'
  | 'setCurrentSkuCodes'
  | 'setCurrentSkuPrices'
  | 'setCurrentItem'
  | 'setErrors'
  | 'setSaveAddressToCustomerAddressBook'
  | 'setGiftCardOrCouponCode'

const actionType: OrderActionType[] = [
  'setLoading',
  'setOrderId',
  'setOrder',
  'setSingleQuantity',
  'setCurrentSkuCodes',
  'setCurrentSkuPrices',
  'setErrors',
  'setCurrentItem',
  'setSaveAddressToCustomerAddressBook',
]

export const createOrder: CreateOrder = async (params) => {
  const {
    persistKey,
    state,
    dispatch,
    config,
    orderMetadata: metadata,
    orderAttributes = {},
    setLocalOrder,
  } = params
  if (state.orderId) return state.orderId
  const sdk = getSdk(config)
  try {
    const o = await sdk.orders.create({ metadata, ...orderAttributes })
    dispatch({
      type: 'setOrderId',
      payload: {
        orderId: o.id,
      },
    })
    persistKey && setLocalOrder && setLocalOrder(persistKey, o.id)
    return o.id
  } catch (error: any) {
    const errors = getErrors(error, 'orders')
    // TODO: Make function to merge errors as below
    console.error('Create order', errors)
    const errorsDifference = differenceBy(state?.errors, errors, 'code')
    const mergeErrors = state?.errors?.length === 0 ? errors : errorsDifference
    setOrderErrors({
      errors: [...(state?.errors || []), ...mergeErrors],
      dispatch,
    })
    return ''
  }
}

export const getApiOrder: GetOrder = async (params) => {
  const {
    id,
    dispatch,
    config,
    clearWhenPlaced,
    persistKey,
    deleteLocalOrder,
  } = params
  const sdk = getSdk(config)
  try {
    const order = await sdk.orders.retrieve(id)
    if (order)
      if (
        (clearWhenPlaced && order.status === 'placed') ||
        order.status === 'approved' ||
        order.status === 'cancelled'
      ) {
        persistKey && deleteLocalOrder && deleteLocalOrder(persistKey)
        dispatch({
          type: 'setOrder',
          payload: {
            order: undefined,
            orderId: '',
          },
        })
      } else {
        dispatch({
          type: 'setOrder',
          payload: {
            order: order,
          },
        })
      }
    return order
  } catch (error: any) {
    const errors = getErrors(error, 'orders')
    console.error('Get order', errors)
    persistKey && deleteLocalOrder && deleteLocalOrder(persistKey)
    setOrderErrors({ errors, dispatch })
    dispatch({
      type: 'setOrder',
      payload: {
        order: undefined,
        orderId: '',
      },
    })
    return
  }
}

export const setOrder = (
  order: Order,
  dispatch: Dispatch<OrderActions>
): void => {
  dispatch({
    type: 'setOrder',
    payload: {
      order,
    },
  })
}

export const addToCart: AddToCart = async (params) => {
  const {
    skuCode,
    skuId,
    quantity,
    option,
    config,
    dispatch,
    lineItem,
    errors = [],
  } = params
  try {
    const sdk = getSdk(config)
    const id = await createOrder(params)
    if (id) {
      const order = sdk.orders.relationship(id)
      const name = lineItem?.name
      const imageUrl = lineItem?.imageUrl as string
      const attrs: LineItemCreate = {
        order,
        sku_code: skuCode,
        name,
        image_url: imageUrl,
        quantity: quantity || 1,
        _update_quantity: true,
      }
      if (skuId) {
        attrs['item'] = sdk.skus.relationship(skuId)
      }
      const newLineItem = await sdk.line_items.create(attrs)
      if (!isEmpty(option)) {
        let c = 0
        map(option, async (opt) => {
          const { options, skuOptionId } = opt
          const skuOption = sdk.sku_options.relationship(skuOptionId)
          const lineItemRel = sdk.line_items.relationship(newLineItem.id)
          const lineItemOptionsAttributes: LineItemOptionCreate = {
            quantity: 1,
            options,
            sku_option: skuOption,
            line_item: lineItemRel,
          }
          await sdk.line_item_options.create(lineItemOptionsAttributes)
          c += 1
          if (c === size(option)) {
            await getApiOrder({ id, ...params })
          }
        })
      } else {
        await getApiOrder({ id, ...params })
      }
      if (!isEmpty(errors)) {
        dispatch({
          type: 'setErrors',
          payload: {
            errors: [],
          },
        })
      }
      return { success: true }
    }
    return { success: false }
  } catch (error: any) {
    const errs = getErrors(error, 'orders')
    console.error('Create line item', errs, errors, [...errors, ...errs])
    setOrderErrors({ errors: [...errors, ...errs], dispatch })
    return { success: false }
  }
}

export const unsetOrderState: UnsetOrderState = (dispatch) => {
  dispatch({
    type: 'setOrderId',
    payload: {
      orderId: '',
    },
  })
  dispatch({
    type: 'setOrder',
    payload: {
      order: undefined,
    },
  })
}

type OrderErrors = {
  dispatch: Dispatch<OrderActions>
  errors: any
}

export function setOrderErrors({ dispatch, errors }: OrderErrors) {
  dispatch({
    type: 'setErrors',
    payload: {
      errors,
    },
  })
  return { success: false }
}

type SaveAddressToCustomerAddressBook = (params: {
  dispatch: Dispatch<OrderActions>
  type: 'BillingAddress' | 'ShippingAddress'
  value: boolean
}) => void

export const saveAddressToCustomerAddressBook: SaveAddressToCustomerAddressBook =
  ({ type, value, dispatch }) => {
    const k = `save${type}ToCustomerBook`
    const v = `${value}`
    localStorage.setItem(k, v)
    dispatch({
      type: 'setSaveAddressToCustomerAddressBook',
      payload: {
        [k]: v,
      },
    })
  }

type SetGiftCardOrCouponCode = (args: {
  code: string
  dispatch?: Dispatch<OrderActions>
  config?: CommerceLayerConfig
  order?: Order
}) => Promise<{ success: boolean }>

export const setGiftCardOrCouponCode: SetGiftCardOrCouponCode = async ({
  code,
  dispatch,
  config,
  order,
}) => {
  try {
    if (config && order && code && dispatch) {
      const sdk = getSdk(config)
      const attributes: OrderUpdate = {
        id: order.id,
        gift_card_or_coupon_code: code,
      }
      const orderUpdated = await sdk.orders.update(attributes)
      dispatch({
        type: 'setErrors',
        payload: {
          errors: [],
          order: orderUpdated,
        },
      })
      return { success: true }
    }
    return { success: false }
  } catch (error: any) {
    const errors = getErrors(error, 'gift_card_or_coupon_code')
    dispatch && setOrderErrors({ errors, dispatch })
    return { success: false }
  }
}

export type CodeType = 'coupon' | 'gift_card'
export type OrderCodeType = `${CodeType}_code`

type RemoveGiftCardOrCouponCode = (args: {
  codeType: OrderCodeType
  dispatch?: Dispatch<OrderActions>
  config?: CommerceLayerConfig
  order?: Order
}) => Promise<{ success: boolean }>

export const removeGiftCardOrCouponCode: RemoveGiftCardOrCouponCode = async ({
  codeType,
  dispatch,
  config,
  order,
}) => {
  try {
    if (config && order && dispatch) {
      const sdk = getSdk(config)
      const attributes: OrderUpdate = {
        id: order.id,
        [codeType]: '',
      }
      const orderUpdated = await sdk.orders.update(attributes)
      dispatch({
        type: 'setErrors',
        payload: {
          errors: [],
          order: orderUpdated,
        },
      })
      return { success: true }
    }
    return { success: false }
  } catch (error: any) {
    const errors = getErrors(error, 'gift_card_or_coupon_code')
    console.error('Remove gift card o coupon code', errors)
    dispatch && setOrderErrors({ errors, dispatch })
    return { success: false }
  }
}

export const orderInitialState: Partial<OrderState> = {
  loading: false,
  orderId: '',
  order: undefined,
  errors: [],
}

const orderReducer = (
  state: Partial<OrderState>,
  reducer: OrderActions
): Partial<OrderState> =>
  baseReducer<Partial<OrderState>, OrderActions, OrderActionType[]>(
    state,
    reducer,
    actionType
  )

export default orderReducer
