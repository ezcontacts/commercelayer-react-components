/// <reference types="react" />
import type { DeliveryLeadTime, LineItem, Parcel, Shipment, ShippingMethod, StockTransfer } from '@commercelayer/sdk';
export interface InitialShipmentContext {
    currentShippingMethodId?: string;
    deliveryLeadTimes?: DeliveryLeadTime[] | null | undefined;
    keyNumber: number;
    lineItems?: Array<LineItem | null | undefined>;
    parcels?: Parcel[] | null | undefined;
    shipment?: Shipment;
    shippingMethods?: ShippingMethod[] | null | undefined;
    stockTransfers?: StockTransfer[] | null | undefined;
}
declare const ShipmentChildrenContext: import("react").Context<InitialShipmentContext>;
export default ShipmentChildrenContext;
