import { type Dispatch } from 'react';
import { type SetLocalOrder, type DeleteLocalOrder } from '../utils/localStorage';
import { type CommerceLayerConfig } from '../context/CommerceLayerContext';
import { type BaseMetadataObject } from '../typings/index';
import { type BaseError } from '../typings/errors';
import { type AddressResource } from './AddressReducer';
import type { Order, OrderUpdate } from '@commercelayer/sdk';
export type GetOrderParams = Partial<{
    clearWhenPlaced: boolean;
    config: CommerceLayerConfig;
    deleteLocalOrder: DeleteLocalOrder;
    dispatch: Dispatch<OrderActions>;
    id: string;
    persistKey: string;
    state: OrderState;
}>;
export type GetOrder = (params: GetOrderParams) => Promise<undefined | Order>;
type CreateOrderParams = Pick<AddToCartParams, 'config' | 'dispatch' | 'persistKey' | 'state' | 'orderMetadata' | 'orderAttributes' | 'setLocalOrder'>;
export type CreateOrder = (params?: CreateOrderParams) => Promise<string>;
export interface AddToCartImportParams extends Omit<AddToCartParams, 'skuCode' | 'skuId' | 'quantity' | 'option' | 'lineItem'> {
    lineItems: CustomLineItem[];
}
export type AddToCartReturn = Promise<{
    success: boolean;
    orderId: string | undefined;
}>;
export type AddToCartImport = (params: AddToCartImportParams) => AddToCartReturn;
export type UnsetOrderState = (dispatch: Dispatch<OrderActions>) => void;
export type ResourceIncluded = 'billing_address' | 'shipping_address' | 'line_items.line_item_options.sku_option' | 'line_items.item' | 'available_customer_payment_sources.payment_source' | 'shipments.available_shipping_methods' | 'shipments.stock_transfers' | 'shipments.stock_transfers.line_item' | 'shipments.stock_line_items.line_item' | 'shipments.shipping_method' | 'shipments.stock_location' | 'shipments.parcels' | 'shipments.parcels.parcel_line_items' | 'payment_source' | 'available_payment_methods' | 'payment_method';
type ResourceIncludedLoaded = Partial<Record<ResourceIncluded, boolean>>;
export interface OrderPayload {
    loading?: boolean;
    orderId?: string;
    order?: Order;
    errors?: BaseError[];
    include?: ResourceIncluded[] | undefined;
    includeLoaded?: ResourceIncludedLoaded;
    withoutIncludes?: boolean;
}
export type AddToCartImportValues = Pick<AddToCartImportParams, 'lineItems'>;
export type getOrderContext = (id: string) => Promise<undefined | Order>;
export type OrderState = Partial<OrderPayload>;
export interface OrderActions {
    type: OrderActionType;
    payload: OrderPayload;
}
export type OrderActionType = 'setLoading' | 'setOrderId' | 'setOrder' | 'setSingleQuantity' | 'setCurrentSkuCodes' | 'setCurrentSkuPrices' | 'setCurrentItem' | 'setErrors' | 'setSaveAddressToCustomerAddressBook' | 'setGiftCardOrCouponCode' | 'setIncludesResource';
export declare const createOrder: CreateOrder;
export declare const getApiOrder: GetOrder;
export interface UpdateOrderArgs {
    id: string;
    attributes: Omit<OrderUpdate, 'id'>;
    dispatch?: Dispatch<OrderActions>;
    include?: string[];
    config?: CommerceLayerConfig;
    state?: OrderState;
}
export declare function updateOrder({ id, attributes, dispatch, config, include, state }: UpdateOrderArgs): Promise<{
    success: boolean;
    error?: unknown;
    order?: Order;
}>;
export declare const setOrder: (order: Order, dispatch?: Dispatch<OrderActions>) => void;
export interface AddResourceToInclude {
    resourcesIncluded?: ResourceIncluded[];
    dispatch?: Dispatch<OrderActions>;
    newResource?: ResourceIncluded | ResourceIncluded[];
    resourceIncludedLoaded?: ResourceIncludedLoaded;
    newResourceLoaded?: ResourceIncludedLoaded;
}
export declare function addResourceToInclude({ resourcesIncluded, dispatch, newResource, newResourceLoaded, resourceIncludedLoaded }: AddResourceToInclude): void;
export interface LineItemOption {
    /**
     * SKU Option ID. Ex: mNJEgsJwBn
     */
    skuOptionId: string;
    /**
     * Set of key-value pairs that represent the selected options. Ex: { message: 'This is a option message' }
     */
    options: Record<string, string>;
    quantity?: number;
}
export interface CustomLineItem {
    name?: string;
    imageUrl?: string | null;
    metadata?: Record<string, string>;
    frequency?: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'two-month' | 'three-month' | 'four-month' | 'six-month' | 'yearly';
    externalPrice?: boolean;
}
export type AddToCartParams = Partial<{
    bundleCode: string;
    skuCode: string;
    persistKey: string;
    config: CommerceLayerConfig;
    dispatch: Dispatch<OrderActions>;
    state: Partial<OrderState>;
    quantity: number;
    lineItemOption: LineItemOption;
    lineItem: CustomLineItem;
    orderMetadata: BaseMetadataObject;
    orderAttributes: Record<string, any>;
    errors: BaseError[];
    setLocalOrder: SetLocalOrder;
    buyNowMode: boolean;
    checkoutUrl: string;
}>;
export declare function addToCart(params: AddToCartParams): Promise<{
    success: boolean;
    orderId?: string;
}>;
export declare const unsetOrderState: UnsetOrderState;
interface OrderErrors {
    dispatch?: Dispatch<OrderActions>;
    errors: BaseError[];
}
export declare function setOrderErrors({ dispatch, errors }: OrderErrors): {
    success: boolean;
};
export type SaveAddressToCustomerAddressBook = (params: {
    dispatch?: Dispatch<OrderActions>;
    type: AddressResource;
    value: boolean;
}) => void;
export declare const saveAddressToCustomerAddressBook: SaveAddressToCustomerAddressBook;
interface TSetGiftCardOrCouponCodeParams {
    code: string;
    codeType: OrderCodeType;
    dispatch?: Dispatch<OrderActions>;
    config?: CommerceLayerConfig;
    order?: Order;
    include?: string[];
    state?: OrderState;
}
export declare function setGiftCardOrCouponCode({ code, codeType, dispatch, config, order, include, state }: TSetGiftCardOrCouponCodeParams): Promise<{
    success: boolean;
    order?: Order;
}>;
export type CodeType = 'coupon' | 'gift_card' | 'gift_card_or_coupon';
export type OrderCodeType = `${CodeType}_code`;
interface TRemoveGiftCardOrCouponCodeParams {
    codeType: OrderCodeType;
    dispatch?: Dispatch<OrderActions>;
    config?: CommerceLayerConfig;
    order?: Order;
    include?: string[];
    state?: OrderState;
}
export declare function removeGiftCardOrCouponCode({ codeType, dispatch, config, order, include, state }: TRemoveGiftCardOrCouponCodeParams): Promise<{
    success: boolean;
    order?: Order;
}>;
export declare const orderInitialState: Partial<OrderState>;
declare const orderReducer: (state: OrderState, reducer: OrderActions) => OrderState;
export default orderReducer;
