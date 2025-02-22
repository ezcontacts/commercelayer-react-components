import { type InitialSkuContext } from '../../context/SkuChildrenContext';
import { type InitialStockTransferContext } from '../../context/StockTransferChildrenContext';
import type { Customer, LineItem, Sku, Parcel, ParcelLineItem } from '@commercelayer/sdk';
import { type InitialLineItemChildrenContext } from '../../context/LineItemChildrenContext';
import { type Context } from 'react';
import { type InitialCustomerContext } from '../../context/CustomerContext';
import { type InitialParcelContext } from '../../context/ParcelChildrenContext';
import { type InitialParcelLineItemContext } from '../../context/ParcelLineItemChildrenContext';
export interface TResources {
    StockTransfer: LineItem & {
        resource: 'stock_transfers';
    };
    Sku: Sku & {
        resource: 'sku';
    };
    LineItem: LineItem & {
        resource: 'lineItem';
    };
    Customer: Customer & {
        resource: 'customers';
    };
    Parcel: Parcel & {
        resource: 'parcel';
    };
    ParcelLineItem: Pick<ParcelLineItem, 'quantity' | 'sku_code' | 'name' | 'image_url'> & {
        resource: 'parcelLineItem';
    };
}
export type TResourceKey = {
    [K in keyof TResources]: K;
};
export type TGenericChildrenProps<E extends TResources[keyof TResources]> = Omit<Props<E>, 'children' | 'attribute' | 'context' | 'tagElement'> & {
    attributeValue: E[keyof E];
};
interface ResourceContext {
    stock_transfers: InitialStockTransferContext;
    sku: InitialSkuContext;
    lineItem: InitialLineItemChildrenContext;
    customers: InitialCustomerContext;
    parcel: InitialParcelContext;
    parcelLineItem: InitialParcelLineItemContext;
}
type GenericContext<K extends keyof ResourceContext> = Context<ResourceContext[K]>;
interface Props<E extends TResources[keyof TResources]> {
    children?: (props: TGenericChildrenProps<E>) => JSX.Element;
    resource: E['resource'];
    attribute: keyof E;
    tagElement: keyof JSX.IntrinsicElements;
    context: GenericContext<E['resource']>;
}
export default function GenericFieldComponent<R extends keyof TResources>(props: Props<TResources[R]>): JSX.Element;
export {};
