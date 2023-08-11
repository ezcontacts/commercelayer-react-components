"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getPricesComponent=exports.getPriceByCode=void 0;const tslib_1=require("tslib"),react_1=require("react"),jsx_runtime_1=require("react/jsx-runtime"),lodash_1=require("lodash"),PriceTemplate_1=tslib_1.__importDefault(require("../components/utils/PriceTemplate"));function getPriceByCode(skuPrices,code=""){return code?(0,lodash_1.first)(skuPrices.filter(p=>p.currency_code===code)):(0,lodash_1.first)(skuPrices)}exports.getPriceByCode=getPriceByCode;function getPricesComponent(skuPrices,props){return(0,lodash_1.isEmpty)(skuPrices)?(0,jsx_runtime_1.jsx)(PriceTemplate_1.default,Object.assign({},props)):skuPrices.map((p,k)=>{const showCompare=typeof props.showCompare>"u"&&p?.compare_at_amount_cents>p?.amount_cents||props.showCompare;return(0,react_1.createElement)(PriceTemplate_1.default,Object.assign({},props,{key:k,showCompare,formattedAmount:p.formatted_amount,formattedCompare:p.formatted_compare_at_amount,skuCode:p.sku_code}))})}exports.getPricesComponent=getPricesComponent;function getPrices(prices){const obj={};return(0,lodash_1.isArray)(prices)&&prices.forEach(p=>{const sku=p.sku_code;(0,lodash_1.has)(obj,sku)?obj[sku].push(p):obj[sku]=[p]}),obj}exports.default=getPrices;