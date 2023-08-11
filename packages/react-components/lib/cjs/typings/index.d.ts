import { type Dispatch, type ForwardedRef, type Ref } from 'react';
import PropTypes, { type InferProps } from 'prop-types';
import { type BaseError } from './errors';
export declare const BC: {
    id: PropTypes.Requireable<string>;
    className: PropTypes.Requireable<string>;
    style: PropTypes.Requireable<object>;
    name: PropTypes.Requireable<string>;
};
export declare const PTLoader: PropTypes.Requireable<NonNullable<string | PropTypes.ReactElementLike | null | undefined>>;
export declare const BaseSelectComponentPropTypes: {
    children: PropTypes.Requireable<(...args: any[]) => any>;
    options: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
        label: PropTypes.Validator<string>;
        value: PropTypes.Validator<NonNullable<NonNullable<string | number | null | undefined>>>;
        selected: PropTypes.Requireable<boolean>;
    }>>[]>;
    placeholder: PropTypes.Requireable<PropTypes.InferProps<{
        label: PropTypes.Validator<string>;
        value: PropTypes.Validator<NonNullable<NonNullable<string | number | null | undefined>>>;
    }>>;
    value: PropTypes.Requireable<string>;
    name: PropTypes.Validator<string>;
};
export type SelectPlaceholder = Option;
type BaseSelectChildrenComponentProps = Omit<BaseSelectComponentProps, 'children'>;
interface Option {
    label: string;
    value: string | number;
    disabled?: boolean;
}
export interface BaseSelectComponentProps {
    children?: (props: BaseSelectChildrenComponentProps) => JSX.Element;
    options: Option[];
    placeholder?: Option;
    value?: string;
    className?: string;
    required?: boolean;
    name: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
type BaseInputChildrenComponentProps = Omit<BaseInputComponentProps, 'children'> & {
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    parentRef: ForwardedRef<any>;
};
export interface BaseInputComponentProps {
    ref?: Ref<any>;
    children?: (props: BaseInputChildrenComponentProps) => JSX.Element;
    name: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
}
export type GiftCardInputName = 'balanceCents' | 'balanceMaxCents' | 'singleUse' | 'rechargeable' | 'imageUrl' | 'expiresAt' | 'referenceOrigin' | 'email' | 'firstName' | 'lastName' | 'reference';
export type AddressInputName = 'billing_address_city' | 'billing_address_company' | 'billing_address_first_name' | 'billing_address_email' | 'billing_address_last_name' | 'billing_address_line_1' | 'billing_address_line_2' | 'billing_address_phone' | 'billing_address_state_code' | 'billing_address_zip_code' | 'billing_address_billing_info' | 'billing_address_save_to_customer_book' | 'shipping_address_city' | 'shipping_address_company' | 'shipping_address_email' | 'shipping_address_first_name' | 'shipping_address_last_name' | 'shipping_address_line_1' | 'shipping_address_line_2' | 'shipping_address_phone' | 'shipping_address_state_code' | 'shipping_address_zip_code' | 'shipping_address_save_to_customer_book';
export type AddressCountrySelectName = 'billing_address_country_code' | 'shipping_address_country_code';
export type AddressStateSelectName = 'billing_address_state_code' | 'shipping_address_state_code';
export type LoaderType = string | JSX.Element;
export declare const BMObject: PropTypes.Requireable<{
    [x: string]: string | null | undefined;
}>;
export type BaseMetadataObject = Record<string, string | undefined | null>;
export type TimeFormat = 'days' | 'hours';
export type BaseComponent = InferProps<typeof BC>;
export interface BaseAction<A = string, P = Record<string, any>> {
    type: A;
    payload: P;
}
export interface BaseState {
    [key: string]: any;
    errors?: BaseError[];
}
export type BaseActionType<T = string> = T[];
export type BFSetStateContainer<T> = <P extends T>(param: P) => void;
export type BaseReducer = <S extends BaseState, A extends BaseAction, T extends BaseActionType>(state: S, action: A, type: T) => S;
export type BaseUnsetState<A> = (dispatch: Dispatch<A>) => void;
export type BaseMetadata = Record<string, string | undefined | null>;
export type BaseFormatPrice = 'formatted' | 'cents' | 'float';
export declare const baseOrderPricePropTypes: {
    id: PropTypes.Requireable<string>;
    className: PropTypes.Requireable<string>;
    style: PropTypes.Requireable<object>;
    name: PropTypes.Requireable<string>;
    base: PropTypes.Validator<string>;
    type: PropTypes.Validator<string>;
    children: PropTypes.Requireable<(...args: any[]) => any>;
    format: PropTypes.Requireable<BaseFormatPrice>;
};
export declare const baseOrderComponentPricePropTypes: {
    id: PropTypes.Requireable<string>;
    className: PropTypes.Requireable<string>;
    style: PropTypes.Requireable<object>;
    name: PropTypes.Requireable<string>;
    children: PropTypes.Requireable<(...args: any[]) => any>;
    format: PropTypes.Requireable<BaseFormatPrice>;
};
export type BasePriceType = 'total' | 'option' | 'unit';
export type BaseSelectorType = 'select' | 'radio';
export type BaseAmountComponentChildren = Omit<BaseAmountComponent, 'children'>;
export interface BaseAmountComponent extends Omit<JSX.IntrinsicElements['span'], 'children'> {
    children?: ChildrenFunction<BaseAmountComponentChildren>;
    format?: BaseFormatPrice;
    price?: string;
    priceCents?: number;
    labelFree?: string;
}
export type ChildrenFunction<P = Record<string, any>> = (props: P) => JSX.Element | null;
export type ExcludeTag<T extends keyof JSX.IntrinsicElements> = Exclude<keyof JSX.IntrinsicElements, T>;
export type ExtractTag<T extends keyof JSX.IntrinsicElements> = Extract<keyof JSX.IntrinsicElements, T>;
export type ConditionalElement<E> = ({
    attribute: Extract<keyof E, 'image_url'>;
    tagElement?: ExtractTag<'img'>;
} & JSX.IntrinsicElements['img']) | ({
    attribute: Exclude<keyof E, 'image_url'>;
    tagElement?: ExcludeTag<'img'>;
} & Omit<JSX.IntrinsicElements[ExcludeTag<'img'>], 'children'>);
export {};
