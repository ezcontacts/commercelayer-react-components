"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.baseOrderComponentPricePropTypes=exports.baseOrderPricePropTypes=exports.BMObject=exports.BaseSelectComponentPropTypes=exports.PTLoader=exports.BC=void 0;const tslib_1=require("tslib"),prop_types_1=tslib_1.__importDefault(require("prop-types"));exports.BC={id:prop_types_1.default.string,className:prop_types_1.default.string,style:prop_types_1.default.object,name:prop_types_1.default.string},exports.PTLoader=prop_types_1.default.oneOfType([prop_types_1.default.element,prop_types_1.default.string]),exports.BaseSelectComponentPropTypes={children:prop_types_1.default.func,options:prop_types_1.default.arrayOf(prop_types_1.default.shape({label:prop_types_1.default.string.isRequired,value:prop_types_1.default.oneOfType([prop_types_1.default.string,prop_types_1.default.number]).isRequired,selected:prop_types_1.default.bool}).isRequired).isRequired,placeholder:prop_types_1.default.shape({label:prop_types_1.default.string.isRequired,value:prop_types_1.default.oneOfType([prop_types_1.default.string,prop_types_1.default.number]).isRequired}),value:prop_types_1.default.string,name:prop_types_1.default.string.isRequired},exports.BMObject=prop_types_1.default.objectOf(prop_types_1.default.string),exports.baseOrderPricePropTypes=Object.assign({base:prop_types_1.default.string.isRequired,type:prop_types_1.default.string.isRequired,children:prop_types_1.default.func,format:prop_types_1.default.oneOf(["formatted","cents","float"])},exports.BC),exports.baseOrderComponentPricePropTypes=Object.assign({children:exports.baseOrderPricePropTypes.children,format:exports.baseOrderPricePropTypes.format},exports.BC);