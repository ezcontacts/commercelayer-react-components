"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.LineItemRemoveLink=void 0;const tslib_1=require("tslib"),jsx_runtime_1=require("react/jsx-runtime"),react_1=require("react"),LineItemChildrenContext_1=tslib_1.__importDefault(require("../../context/LineItemChildrenContext")),LineItemContext_1=tslib_1.__importDefault(require("../../context/LineItemContext")),Parent_1=tslib_1.__importDefault(require("../utils/Parent")),useCustomContext_1=tslib_1.__importDefault(require("../../utils/hooks/useCustomContext"));function LineItemRemoveLink(props){var _a;const{label="Remove",onClick}=props,{lineItem}=(0,useCustomContext_1.default)({context:LineItemChildrenContext_1.default,contextComponentName:"LineItem",currentComponentName:"LineItemRemoveLink",key:"lineItem"}),{deleteLineItem}=(0,react_1.useContext)(LineItemContext_1.default),handleRemove=e=>{e.preventDefault(),deleteLineItem!=null&&lineItem!=null&&deleteLineItem(lineItem.id),onClick?.(e)},parentProps=Object.assign({handleRemove},props);return props.children?(0,jsx_runtime_1.jsx)(Parent_1.default,Object.assign({},parentProps,{children:props.children})):(0,jsx_runtime_1.jsx)("a",Object.assign({"data-testid":`line-item-remove-link-${(_a=lineItem?.sku_code)!==null&&_a!==void 0?_a:""}`},props,{href:"#",onClick:handleRemove,children:label}))}exports.LineItemRemoveLink=LineItemRemoveLink,exports.default=LineItemRemoveLink;