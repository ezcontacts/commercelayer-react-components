"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const tslib_1=require("tslib"),jsx_runtime_1=require("react/jsx-runtime"),customMessages_1=tslib_1.__importDefault(require("../../utils/customMessages")),getAllErrors=params=>{const{allErrors,messages,field,props,lineItem,resource,returnHtml=!0}=params;return allErrors.map((v,k)=>{var _a;const objMsg=(0,customMessages_1.default)(messages,v);let text=v?.title&&v?.detail!=null&&!(!((_a=v.detail)===null||_a===void 0)&&_a.includes(v.title))?`${v.title} - ${v.detail}`:`${v?.detail||v.message}`;if(objMsg?.message&&(text=objMsg?.message),field){if(v.resource==="line_items"&&lineItem&&v.id===lineItem.id)return returnHtml?(0,jsx_runtime_1.jsx)("span",Object.assign({},props,{children:text}),k):text;if(field===v.field&&resource===v.resource)return returnHtml?(0,jsx_runtime_1.jsx)("span",Object.assign({},props,{children:text}),k):text}if(resource===v.resource&&!field)return returnHtml?(0,jsx_runtime_1.jsx)("span",Object.assign({},props,{children:text}),k):text}).filter(v=>v!==void 0)};exports.default=getAllErrors;