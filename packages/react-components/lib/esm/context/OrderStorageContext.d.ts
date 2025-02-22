/// <reference types="react" />
import { getLocalOrder, setLocalOrder, deleteLocalOrder } from '../utils/localStorage';
export interface OrderStorageConfig {
    persistKey: string;
    clearWhenPlaced: boolean;
    getLocalOrder: typeof getLocalOrder;
    setLocalOrder: typeof setLocalOrder;
    deleteLocalOrder: typeof deleteLocalOrder;
}
declare const OrderStorageContext: import("react").Context<OrderStorageConfig>;
export default OrderStorageContext;
