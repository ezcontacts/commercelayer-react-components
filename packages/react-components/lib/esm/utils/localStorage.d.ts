export type GetLocalOrder = (key: string) => string | null;
export declare const getLocalOrder: GetLocalOrder;
export type SetLocalOrder = (key: string, value: string) => void;
export declare const setLocalOrder: SetLocalOrder;
export type DeleteLocalOrder = (key: string) => void;
export declare const deleteLocalOrder: DeleteLocalOrder;
export declare const getSavePaymentSourceToCustomerWallet: () => boolean;
export declare const getSaveBillingAddressToAddressBook: () => boolean;
export declare const getSaveShippingAddressToAddressBook: () => boolean;
export type CustomerOrderParams = '_save_payment_source_to_customer_wallet' | '_save_billing_address_to_customer_address_book' | '_save_shipping_address_to_customer_address_book';
export declare function setCustomerOrderParam<T extends CustomerOrderParams>(key: T, value: string): void;
