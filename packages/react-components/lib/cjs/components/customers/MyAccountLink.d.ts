/// <reference types="react" />
import { type ChildrenFunction } from '../../typings/index';
interface ChildrenProps extends Omit<Props, 'children'> {
    /**
     * The link href
     */
    href: string;
    /**
     * The link status
     */
    disabled: boolean;
}
interface Props extends Omit<JSX.IntrinsicElements['a'], 'children'> {
    /**
     * A render function to render your own custom component
     */
    children?: ChildrenFunction<ChildrenProps>;
    /**
     * The label of the link
     */
    label?: string;
}
export declare function MyAccountLink(props: Props): JSX.Element;
export default MyAccountLink;
