"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.GiftCardOrCouponSubmit=void 0;const tslib_1=require("tslib"),jsx_runtime_1=require("react/jsx-runtime"),Parent_1=tslib_1.__importDefault(require("../utils/Parent"));function GiftCardOrCouponSubmit(props){const{children,label="Submit"}=props,p=tslib_1.__rest(props,["children","label"]),parentProps=Object.assign(Object.assign({},p),{label});return children?(0,jsx_runtime_1.jsx)(Parent_1.default,Object.assign({},parentProps,{children})):(0,jsx_runtime_1.jsx)("button",Object.assign({type:"submit"},p,{children:label}))}exports.GiftCardOrCouponSubmit=GiftCardOrCouponSubmit,exports.default=GiftCardOrCouponSubmit;