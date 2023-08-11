/// <reference types="react" />
import { type Order } from '@commercelayer/sdk';
import { type OrderState, type CreateOrder, type SaveAddressToCustomerAddressBook, setGiftCardOrCouponCode, removeGiftCardOrCouponCode, addResourceToInclude, updateOrder, type getOrderContext, type addToCart } from '../reducers/OrderReducer';
import { type BaseError } from '../typings/errors';
interface DefaultContext extends OrderState {
    createOrder: CreateOrder;
    addToCart?: typeof addToCart;
    setOrderErrors: (errors: BaseError[]) => void;
    setGiftCardOrCouponCode?: typeof setGiftCardOrCouponCode;
    removeGiftCardOrCouponCode?: typeof removeGiftCardOrCouponCode;
    saveAddressToCustomerAddressBook: SaveAddressToCustomerAddressBook;
    addResourceToInclude: typeof addResourceToInclude;
    getOrder: getOrderContext;
    updateOrder: typeof updateOrder;
    setOrder: (order: Order) => void;
}
export declare const defaultOrderContext: {
    createOrder: CreateOrder;
    setOrderErrors: () => void;
    setOrder: () => void;
    setGiftCardOrCouponCode: typeof setGiftCardOrCouponCode;
    removeGiftCardOrCouponCode: typeof removeGiftCardOrCouponCode;
    saveAddressToCustomerAddressBook: SaveAddressToCustomerAddressBook;
    addResourceToInclude: typeof addResourceToInclude;
    getOrder: () => Promise<undefined>;
    updateOrder: typeof updateOrder;
};
declare const OrderContext: import("react").Context<DefaultContext>;
export default OrderContext;
