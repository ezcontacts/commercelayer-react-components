import { useContext, type ReactNode } from 'react'
import Parent from '#components/utils/Parent'
import { type ChildrenFunction } from '#typings/index'
import OrderContext from '#context/OrderContext'
// import { OrderCodeType } from '#reducers/OrderReducer'
import { has, isEmpty } from 'lodash'

interface ChildrenProps extends Omit<Props, 'children'> {}

interface Props extends Omit<JSX.IntrinsicElements['button'], 'children'> {
  children?: ChildrenFunction<ChildrenProps>
  label?: string | ReactNode
}

export function GiftCardOrCouponSubmit(props: Props): JSX.Element {
  const { children, label = 'Submit', ...p } = props
  const parentProps = {
    ...p,
    label
  }  
  const {order, } = useContext(OrderContext)
  let codeType : "coupon_code" | "gift_card_code" | "gift_card_or_coupon_code" | undefined = undefined
  if (
    order &&
    has(order, 'coupon_code') &&
    !isEmpty(order.coupon_code)
  )
    codeType = 'coupon_code'
  else codeType = 'gift_card_code'
  const existingCode = order && codeType ? order[codeType] : ''

  // const [codeType, setCodeType] = useState<OrderCodeType>('gift_card_or_coupon_code')
//   const [existingCode, setExistingCode] = useState<string | null>(null)

//   useEffect(() => {
//     if (order?.gift_card_code && !order?.coupon_code) {
//       setCodeType('coupon_code')
//     }
//     if (!order?.gift_card_code && order?.coupon_code) {
//       setCodeType('gift_card_code')
//     }
//     if (!order?.gift_card_code && !order?.coupon_code) {
//       setCodeType('gift_card_or_coupon_code')
//     }
//     console.log('order', order)
//   }, [order])
// ==
//   useEffect(() => {
//     console.log('neworder', order, 'codeType', codeType)
//     if (order && codeType) {
//       setExistingCode(order[codeType] || null)
//     }
//   }, [order, codeType])


  console.log('outorder', order)

  console.log('existingCode', existingCode)

  return children ? (
    <Parent {...parentProps}>{children}</Parent>
  ) : (
    <button type='submit' {...p} disabled={existingCode? true: false}>
      {label}
    </button>
  )
}

export default GiftCardOrCouponSubmit
