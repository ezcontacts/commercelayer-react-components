/// <reference types="react" />
import { type PriceState } from '../reducers/PriceReducer';
export interface PricesContextValue extends PriceState {
    skuCode: PriceState['skuCode'];
}
declare const PricesContext: import("react").Context<PriceState>;
export default PricesContext;
