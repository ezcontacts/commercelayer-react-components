"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ShipmentField=void 0;const tslib_1=require("tslib"),jsx_runtime_1=require("react/jsx-runtime"),react_1=require("react"),Parent_1=tslib_1.__importDefault(require("../utils/Parent")),get_1=tslib_1.__importDefault(require("lodash/get")),ShipmentChildrenContext_1=tslib_1.__importDefault(require("../../context/ShipmentChildrenContext"));function ShipmentField(props){const{name}=props,{shipment,keyNumber}=(0,react_1.useContext)(ShipmentChildrenContext_1.default),key=name,text=key!=="key_number"?(0,get_1.default)(shipment,key):keyNumber,parentProps=Object.assign({shipment},props);return props.children?(0,jsx_runtime_1.jsx)(Parent_1.default,Object.assign({},parentProps,{children:props.children})):(0,jsx_runtime_1.jsx)("span",Object.assign({},props,{children:text}))}exports.ShipmentField=ShipmentField,exports.default=ShipmentField;