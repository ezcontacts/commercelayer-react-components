"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.CheckoutLink=void 0;const tslib_1=require("tslib"),jsx_runtime_1=require("react/jsx-runtime"),react_1=require("react"),OrderContext_1=tslib_1.__importDefault(require("../../context/OrderContext")),Parent_1=tslib_1.__importDefault(require("../utils/Parent")),CommerceLayerContext_1=tslib_1.__importDefault(require("../../context/CommerceLayerContext")),getApplicationLink_1=require("../../utils/getApplicationLink"),getDomain_1=require("../../utils/getDomain");function CheckoutLink(props){var _a;const{label,hostedCheckout=!0,children}=props,p=tslib_1.__rest(props,["label","hostedCheckout","children"]),{order}=(0,react_1.useContext)(OrderContext_1.default),{accessToken,endpoint}=(0,react_1.useContext)(CommerceLayerContext_1.default);if(accessToken==null||endpoint==null)throw new Error("Cannot use `CheckoutLink` outside of `CommerceLayer`");const{domain,slug}=(0,getDomain_1.getDomain)(endpoint),href=hostedCheckout&&order?.id?(0,getApplicationLink_1.getApplicationLink)({slug,orderId:order?.id,accessToken,applicationType:"checkout",domain}):(_a=order?.checkout_url)!==null&&_a!==void 0?_a:"",parentProps=Object.assign({checkoutUrl:order?.checkout_url,hostedCheckout,label,href},p);return children?(0,jsx_runtime_1.jsx)(Parent_1.default,Object.assign({},parentProps,{children})):(0,jsx_runtime_1.jsx)("a",Object.assign({href},p,{children:label}))}exports.CheckoutLink=CheckoutLink,exports.default=CheckoutLink;