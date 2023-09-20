/// <reference types="react" />
import type { Address as AddressType } from '@commercelayer/sdk';
import { type AddressCardsTemplateChildren } from '../utils/AddressCardsTemplate';
import type { DefaultChildrenType } from '../../typings/globals';
interface Props extends Omit<JSX.IntrinsicElements['div'], 'children' | 'onSelect'> {
    children: DefaultChildrenType | AddressCardsTemplateChildren;
    selectedClassName?: string;
    disabledClassName?: string;
    onSelect?: (address: AddressType) => void;
    addresses?: AddressType[];
    deselect?: boolean;
}
export declare function Address(props: Props): JSX.Element;
export default Address;
