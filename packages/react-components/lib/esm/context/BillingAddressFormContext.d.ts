/// <reference types="react" />
import type { Address } from '@commercelayer/sdk';
export type AddressValuesKeys = `${keyof Address}` | `billing_address_${keyof Address}` | `shipping_address_${keyof Address}`;
export interface DefaultContextAddress {
    validation?: void;
    setValue?: (name: AddressValuesKeys, value: string | number | readonly string[]) => void;
    errors?: Record<string, {
        code: string;
        message: string;
        error: boolean;
    }>;
    errorClassName?: string;
    requiresBillingInfo?: boolean;
    resetField?: (name: string) => void;
    values?: {
        [T in AddressValuesKeys]: string | {
            value: string;
        };
    };
    isBusiness?: boolean;
}
declare const BillingAddressFormContext: import("react").Context<DefaultContextAddress>;
export default BillingAddressFormContext;
