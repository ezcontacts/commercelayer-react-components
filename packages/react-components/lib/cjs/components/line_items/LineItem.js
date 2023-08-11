"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.LineItem=void 0;const tslib_1=require("tslib"),jsx_runtime_1=require("react/jsx-runtime"),react_1=require("react"),LineItemContext_1=tslib_1.__importDefault(require("../../context/LineItemContext")),LineItemChildrenContext_1=tslib_1.__importDefault(require("../../context/LineItemChildrenContext")),ShipmentChildrenContext_1=tslib_1.__importDefault(require("../../context/ShipmentChildrenContext"));function LineItem(props){const{type="skus",children}=props,{lineItems}=(0,react_1.useContext)(LineItemContext_1.default),{lineItems:shipmentLineItems}=(0,react_1.useContext)(ShipmentChildrenContext_1.default),items=shipmentLineItems&&shipmentLineItems?.length>0?shipmentLineItems:lineItems,components=items?.filter(l=>l?.item_type===type).map((lineItem,k,check)=>{var _a;if(lineItem?.item_type==="bundles"&&k>0&&((_a=check[k-1])===null||_a===void 0?void 0:_a.bundle_code)===lineItem.bundle_code||lineItem?.item_type==="gift_cards"&&lineItem?.total_amount_cents&&lineItem?.total_amount_cents<=0)return null;const lineProps={lineItem};return(0,jsx_runtime_1.jsx)(LineItemChildrenContext_1.default.Provider,{value:lineProps,children},lineItem?.id)});return(0,jsx_runtime_1.jsx)(jsx_runtime_1.Fragment,{children:components})}exports.LineItem=LineItem,exports.default=LineItem;