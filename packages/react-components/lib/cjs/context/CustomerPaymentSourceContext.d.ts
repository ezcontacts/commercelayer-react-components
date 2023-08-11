/// <reference types="react" />
import { type IconBrand } from './PaymentSourceContext';
interface DefaultContext {
    brand?: IconBrand | string;
    exp_month?: number | string;
    exp_year?: number | string;
    last4?: string;
}
export declare const defaultCustomerPaymentSourceContext: {};
declare const CustomerPaymentSourceContext: import("react").Context<DefaultContext>;
export default CustomerPaymentSourceContext;
