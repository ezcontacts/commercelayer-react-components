/// <reference types="react" />
export type IconBrand = 'visa' | 'credit-card' | 'amex' | 'mastercard' | 'jcb' | 'wire-transfer' | 'maestro' | 'cirrus' | 'paypal';
interface DefaultContext {
    brand?: IconBrand | string;
    exp_month?: number | string;
    exp_year?: number | string;
    last4?: string;
    showCard?: boolean;
    readonly?: boolean;
    handleEditClick?: (e: MouseEvent) => void;
}
export declare const defaultPaymentSourceContext: {};
declare const PaymentSourceContext: import("react").Context<DefaultContext>;
export default PaymentSourceContext;
