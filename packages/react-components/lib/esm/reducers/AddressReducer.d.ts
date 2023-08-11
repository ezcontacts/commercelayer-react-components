import { type Dispatch } from 'react';
import { type BaseError } from '../typings/errors';
import { type CommerceLayerConfig } from '../context/CommerceLayerContext';
import type { Address, AddressCreate, Order } from '@commercelayer/sdk';
import { type updateOrder } from './OrderReducer';
import { type TCustomerAddress } from './CustomerReducer';
import { type TResourceError } from '../components/errors/Errors';
export type AddressActionType = 'setErrors' | 'setAddress' | 'setShipToDifferentAddress' | 'setCloneAddress' | 'cleanup';
export type AddressField = 'city' | 'company' | 'country_code' | 'first_name' | 'last_name' | 'line_1' | 'line_2' | 'phone' | 'state_code' | 'zip_code' | 'billing_info';
export type AddressFieldView = AddressField | 'full_address' | 'full_name';
export declare const addressFields: AddressField[];
export type AddressResource = Extract<TResourceError, 'billing_address' | 'shipping_address'>;
export type AddressSchema = Omit<Address, 'created_at' | 'updated_at' | 'id' | 'type'>;
export interface AddressActionPayload {
    errors: BaseError[];
    billing_address: TCustomerAddress;
    shipping_address: AddressCreate;
    shipToDifferentAddress: boolean;
    billingAddressId: string;
    shippingAddressId: string;
    isBusiness: boolean;
}
export type AddressState = Partial<AddressActionPayload>;
export interface AddressAction {
    type: AddressActionType;
    payload: Partial<AddressActionPayload>;
}
export declare const addressInitialState: AddressState;
export type SetAddressErrors = <V extends BaseError[]>(args: {
    errors: V;
    resource: Extract<TResourceError, 'billing_address' | 'shipping_address'>;
    dispatch?: Dispatch<AddressAction>;
    currentErrors?: V;
}) => void;
export interface SetAddressParams<V extends AddressSchema> {
    values: V;
    resource: AddressResource;
    dispatch?: Dispatch<AddressAction>;
}
export type SetAddress = <V extends AddressSchema>(params: SetAddressParams<V>) => void;
export declare const setAddressErrors: SetAddressErrors;
export declare const setAddress: SetAddress;
type SetCloneAddress = (id: string, resource: AddressResource, dispatch: Dispatch<AddressAction>) => void;
export declare const setCloneAddress: SetCloneAddress;
interface TSaveAddressesParams {
    orderId?: string;
    order?: Order | null;
    updateOrder?: typeof updateOrder;
    config: CommerceLayerConfig;
    state: AddressState;
    dispatch: Dispatch<AddressAction>;
    getCustomerAddresses?: () => Promise<void>;
    customerEmail?: string;
}
export declare function saveAddresses({ config, updateOrder, order, state, customerEmail }: TSaveAddressesParams): Promise<{
    success: boolean;
    order?: Order;
    error?: unknown;
}>;
declare const addressReducer: (state: AddressState, reducer: AddressAction) => AddressState;
export default addressReducer;
