import { GeneralReducer, GeneralActions } from '../@types/index'
import { SkuCollection, InventoryCollection } from '@commercelayer/js-sdk'
import { SkuCodePropObj } from '../components/VariantSelector'

export interface SetCurrentQuantity {
  (quantity: number): void
}

export interface SetSkuCodeVariant {
  (code: string, id: string): void
}

export interface SetSkuCodesVariant {
  (skuCodes: SkuCodePropObj[]): void
}

export interface VariantsObject {
  [key: string]: SkuCollection
}

export interface VariantState {
  loading: boolean
  variants: VariantsObject
  skuCodes: string[]
  currentSkuCode: string
  currentSkuId: string
  currentSkuInventory:
    | InventoryCollection
    | {
        available: false
        quantity: 0
      }
  currentQuantity: number
  setSkuCode?: SetSkuCodeVariant
  setSkuCodes?: SetSkuCodesVariant
  setCurrentQuantity?: SetCurrentQuantity
}

export interface VariantActions extends GeneralActions {
  type:
    | 'setLoading'
    | 'setVariants'
    | 'setSkuCodes'
    | 'setCurrentSkuCode'
    | 'setCurrentSkuId'
    | 'setCurrentSkuInventory'
    | 'setCurrentQuantity'
}

export const variantInitialState: VariantState = {
  loading: false,
  variants: {},
  skuCodes: [],
  currentSkuCode: '',
  currentSkuId: '',
  currentSkuInventory: {
    available: false,
    quantity: 0
  },
  currentQuantity: 1
}

const variantReducer: GeneralReducer<VariantState, VariantActions> = (
  state,
  action
) => {
  if (action.type === 'setLoading') {
    state = { ...state, loading: action.payload }
  }
  if (action.type === 'setVariants') {
    state = { ...state, variants: action.payload }
  }
  if (action.type === 'setSkuCodes') {
    state = { ...state, skuCodes: action.payload }
  }
  if (action.type === 'setCurrentSkuCode') {
    state = { ...state, currentSkuCode: action.payload }
  }
  if (action.type === 'setCurrentSkuId') {
    state = { ...state, currentSkuId: action.payload }
  }
  if (action.type === 'setCurrentSkuInventory') {
    state = { ...state, currentSkuInventory: action.payload }
  }
  if (action.type === 'setCurrentQuantity') {
    state = { ...state, currentQuantity: action.payload }
  }
  return state
}

export default variantReducer
