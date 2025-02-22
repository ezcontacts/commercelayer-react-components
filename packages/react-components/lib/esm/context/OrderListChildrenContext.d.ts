/// <reference types="react" />
import type { Order, OrderSubscription } from '@commercelayer/sdk';
import { type Row } from '@tanstack/react-table';
export type TOrderList = 'orders' | 'subscriptions';
export type TableAccessor<T extends TOrderList> = T extends 'orders' ? keyof Order : keyof OrderSubscription;
export type OrderListContent<T extends TOrderList> = T extends 'orders' ? Order : OrderSubscription;
export type InitialOrderListContext = Partial<{
    type: TOrderList;
    /**
     * The current order
     */
    order: OrderListContent<TOrderList> | null;
    /**
     * The list of orders
     */
    orders: Array<OrderListContent<TOrderList>> | null | undefined;
    /**
     * The current row
     */
    row: Row<OrderListContent<TOrderList>>;
    /**
     * Show the row actions
     */
    showActions: boolean;
    /**
     * Function to assign as custom row renderer
     */
    actionsComponent: (props: {
        order: OrderListContent<TOrderList>;
    }) => JSX.Element;
    /**
     * Class name to assign as custom row renderer
     */
    actionsContainerClassName: string;
    /**
     * Infinite scroll enabled
     */
    infiniteScroll: boolean;
}>;
declare const OrderListChildrenContext: import("react").Context<Partial<{
    type: TOrderList;
    /**
     * The current order
     */
    order: OrderListContent<TOrderList> | null;
    /**
     * The list of orders
     */
    orders: Array<OrderListContent<TOrderList>> | null | undefined;
    /**
     * The current row
     */
    row: Row<OrderListContent<TOrderList>>;
    /**
     * Show the row actions
     */
    showActions: boolean;
    /**
     * Function to assign as custom row renderer
     */
    actionsComponent: (props: {
        order: OrderListContent<TOrderList>;
    }) => JSX.Element;
    /**
     * Class name to assign as custom row renderer
     */
    actionsContainerClassName: string;
    /**
     * Infinite scroll enabled
     */
    infiniteScroll: boolean;
}>>;
export default OrderListChildrenContext;
