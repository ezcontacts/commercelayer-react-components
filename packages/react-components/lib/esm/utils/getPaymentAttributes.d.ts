import type { PaypalConfig } from '../components/payment_source/PaypalPayment';
import { type PaymentMethodConfig, type PaymentResource } from '../reducers/PaymentMethodReducer';
import { type ExternalPayment } from '@commercelayer/sdk';
import { type StringReplace } from './replace';
import { type SnakeToCamelCase } from './snakeToCamelCase';
interface Params<R extends PaymentResource, C extends PaymentMethodConfig> {
    resource: R;
    config: C;
    keys: R[];
}
export type ResourceKeys<K extends PaymentResource> = SnakeToCamelCase<StringReplace<StringReplace<K, 'payments', 'payment'>, 'transfers', 'transfer'>>;
export declare function getPaymentAttributes<R extends PaymentResource = PaymentResource, C extends PaymentMethodConfig = PaymentMethodConfig>(params: Params<R, C>): Pick<C, ResourceKeys<R>> | undefined;
export declare function getPaypalAttributes(paymentResource: PaymentResource, config: PaymentMethodConfig): Pick<PaypalConfig, 'return_url' | 'cancel_url'> | undefined;
export declare function getExternalPaymentAttributes(paymentResource: PaymentResource, config: PaymentMethodConfig): Pick<ExternalPayment, 'payment_source_token'> | undefined;
export {};
