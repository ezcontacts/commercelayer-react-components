import { type MouseEvent, type ReactNode } from 'react';
import { type ChildrenFunction } from '../../typings/index';
interface ChildrenProps extends Omit<Props, 'children'> {
    /**
     * The url of the cart
     */
    href: string;
    /**
     * Callback to dispatch the click event
     * @param e: MouseEvent<HTMLAnchorElement>
     * @returns Promise<void>
     */
    handleClick?: (e: MouseEvent<HTMLAnchorElement>) => Promise<void>;
}
interface Props extends Omit<JSX.IntrinsicElements['a'], 'children'> {
    children?: ChildrenFunction<ChildrenProps>;
    /**
     * Label to display
     */
    label?: string | ReactNode;
    /**
     * The type of the cart. Defaults to undefined. If set to 'mini', the cart will open in a modal.
     */
    type?: 'mini';
}
export declare function CartLink(props: Props): JSX.Element | null;
export default CartLink;
