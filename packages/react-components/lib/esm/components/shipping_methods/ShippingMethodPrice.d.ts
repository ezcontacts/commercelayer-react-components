import { type BaseAmountComponent } from '../../typings/index';
type Props = BaseAmountComponent & {
    labelFreeOver?: string;
} & ({
    type?: 'amount';
    base?: 'freeOver';
} | {
    type?: 'amount' | 'amountForShipment';
    base?: 'price';
});
export declare function ShippingMethodPrice(props: Props): JSX.Element;
export default ShippingMethodPrice;
