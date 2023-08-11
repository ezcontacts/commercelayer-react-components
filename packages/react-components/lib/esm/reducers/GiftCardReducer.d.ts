import { type Customer, type Market, type GiftCardRecipient, type GiftCardRecipientCreate, type Order } from '@commercelayer/sdk';
import { type BaseMetadata } from '../typings/index';
import { type Dispatch } from 'react';
import { type CommerceLayerConfig } from '../context/CommerceLayerContext';
import { type BaseError } from '../typings/errors';
import { type CreateOrder, type getOrderContext } from './OrderReducer';
export type GiftCardActionType = 'setAvailability' | 'setGiftCardRecipient' | 'setGiftCardErrors' | 'setGiftCardLoading';
export interface GiftCardRecipientI {
    email: string;
    firstName?: string;
    lastName?: string;
    referenceOrigin?: string;
    reference?: string;
    metadata?: BaseMetadata;
    customer?: Customer;
}
export interface GiftCardI {
    currencyCode?: string;
    balanceCent?: number;
    balanceMaxCents?: number;
    singleUse?: boolean;
    rechargeable?: boolean;
    imageUrl?: string;
    expiresAt?: null | Date;
    firstName?: string;
    lastName?: string;
    email?: string;
    referenceOrigin?: string;
    recipientEmail?: string;
    reference?: string;
    metadata?: BaseMetadata;
    orderId?: string;
}
export interface GiftCardActionPayload extends GiftCardI {
    market?: Market;
    giftCardRecipient?: GiftCardRecipient;
    errors?: BaseError[];
    loading?: boolean;
}
export interface GiftCardState extends GiftCardActionPayload {
    currencyCode: string;
    balanceCent: number;
    addGiftCardRecipient?: (values: GiftCardRecipientI & Record<string, any>) => void;
    addGiftCard?: (values: GiftCardI & Record<string, any>) => void;
    addGiftCardError?: (errors: BaseError[]) => void;
    addGiftCardLoading?: (loading: boolean) => void;
}
export interface GiftCardAction {
    type: GiftCardActionType;
    payload: GiftCardActionPayload;
}
export declare const giftCardInitialState: GiftCardState;
export type AddGiftCardError = <V extends BaseError[]>(errors: V, dispatch: Dispatch<GiftCardAction>) => void;
export type AddGiftCardLoading = <V extends boolean>(loading: V, dispatch: Dispatch<GiftCardAction>) => void;
export declare function addGiftCardRecipient<V extends GiftCardRecipientCreate>(values: V, config: CommerceLayerConfig, dispatch: Dispatch<GiftCardAction>): Promise<void>;
export declare const addGiftCardLoading: AddGiftCardLoading;
export declare function addGiftCard<V extends GiftCardI>(values: V, { config, dispatch, getOrder, createOrder, order }: {
    getOrder?: getOrderContext;
    createOrder?: CreateOrder;
    config: CommerceLayerConfig;
    dispatch: Dispatch<GiftCardAction>;
    order?: Order;
}): Promise<void>;
export declare const addGiftCardError: AddGiftCardError;
declare const giftCardReducer: (state: GiftCardState, reducer: GiftCardAction) => GiftCardState;
export default giftCardReducer;
