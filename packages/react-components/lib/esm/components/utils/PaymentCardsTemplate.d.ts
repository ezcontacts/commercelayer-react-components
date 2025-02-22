import { type PaymentResource } from '../../reducers/PaymentMethodReducer';
import PaymentSourceContext, { type IconBrand } from '../../context/PaymentSourceContext';
import { type ChildrenFunction } from '../../typings/index';
import { type CustomerPaymentSource } from '@commercelayer/sdk';
interface ChildrenProps extends Pick<Props, 'customerPayments'> {
    PaymentSourceProvider: typeof PaymentSourceContext.Provider;
}
interface CustomerPayment extends CustomerPaymentSource {
    /**
     * Card details
     */
    card?: {
        /**
         * Card brand
         */
        brand: IconBrand;
        /**
         * Card last 4 digits
         */
        last4: string;
    };
    /**
     * Handle click event
     */
    handleClick?: () => void;
}
export type CustomerCardsTemplateChildren = ChildrenFunction<ChildrenProps>;
interface Props {
    /**
     * Customer payments
     */
    customerPayments: CustomerPayment[];
    children: CustomerCardsTemplateChildren;
    /**
     * Payment resource
     */
    paymentResource: PaymentResource;
}
export default function PaymentCardsTemplate({ customerPayments, children, paymentResource }: Props): JSX.Element;
export {};
