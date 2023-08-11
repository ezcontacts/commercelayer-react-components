import { type IconBrand } from '../context/PaymentSourceContext';
import { type PaymentResource } from '../reducers/PaymentMethodReducer';
import { type CustomerPaymentSource } from '@commercelayer/sdk';
interface CardDetails {
    brand: IconBrand | string;
    last4: string;
    exp_month: number | string;
    exp_year: number | string;
}
interface Args {
    paymentType: PaymentResource;
    customerPayment: Partial<CustomerPaymentSource>;
}
export default function getCardDetails({ paymentType, customerPayment }: Args): CardDetails;
export {};
