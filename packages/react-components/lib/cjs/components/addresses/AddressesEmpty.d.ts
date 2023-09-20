/// <reference types="react" />
import { type ChildrenFunction } from '../../typings/index';
interface Props extends Omit<JSX.IntrinsicElements['span'], 'children'> {
    /**
     * Function allow you to customize the component
     */
    children?: ChildrenFunction<Omit<Props, 'children'>>;
    /**
     * Label to show. Default: 'No addresses available.'
     */
    emptyText?: string;
}
export declare function AddressesEmpty(props: Props): JSX.Element | null;
export default AddressesEmpty;
