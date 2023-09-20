/// <reference types="react" />
import { type TimeFormat, type ChildrenFunction } from '../../typings/index';
import { type DeliveryLeadTime } from '../../reducers/AvailabilityReducer';
interface AvailabilityTemplateChildrenProps extends Omit<Props, 'children'>, DeliveryLeadTime {
    text: string;
    quantity: number;
}
type FormatRules = {
    /**
     * Set time format for shipping method
     */
    timeFormat?: TimeFormat;
    /**
     * Show shipping method name
     */
    showShippingMethodName?: false;
    /**
     * Show shipping method price
     */
    showShippingMethodPrice?: false;
} | {
    timeFormat: TimeFormat;
    showShippingMethodName: true;
    showShippingMethodPrice?: boolean;
} | {
    timeFormat: TimeFormat;
    showShippingMethodName?: boolean;
    showShippingMethodPrice: true;
};
type Props = {
    children?: ChildrenFunction<AvailabilityTemplateChildrenProps>;
} & Omit<JSX.IntrinsicElements['span'], 'children'> & FormatRules;
export declare function AvailabilityTemplate(props: Props): JSX.Element;
export default AvailabilityTemplate;
