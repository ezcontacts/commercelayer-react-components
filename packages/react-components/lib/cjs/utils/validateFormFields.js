"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.businessMandatoryField=exports.fieldsExist=exports.validateValue=void 0;const tslib_1=require("tslib"),isEmpty_1=tslib_1.__importDefault(require("lodash/isEmpty")),isString_1=tslib_1.__importDefault(require("lodash/isString")),without_1=tslib_1.__importDefault(require("lodash/without")),keys_1=tslib_1.__importDefault(require("lodash/keys")),map_1=tslib_1.__importDefault(require("lodash/map")),AddressReducer_1=require("../reducers/AddressReducer"),EMAIL_PATTERN=/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,validateValue=(val,name,type,resourceType)=>val?type==="email"&&(0,isString_1.default)(val)&&!val.match(EMAIL_PATTERN)?{field:name,code:"VALIDATION_ERROR",message:`${name} - is not valid`,resourceType}:{}:{field:name,code:"VALIDATION_ERROR",message:`${name} - is required`,resourceType};exports.validateValue=validateValue;const validateFormFields=(fields,required,resourceType)=>{const errors=[];let values={metadata:{}};return(0,map_1.default)(fields,v=>{const val="checked"in v||(v.value==="on"?!1:v.value),attrName=v.getAttribute("name");if(attrName&&required.includes(attrName)||v.required){const error=(0,exports.validateValue)(val,v.name,v.type,resourceType);(0,isEmpty_1.default)(error)||errors.push(error),values=Object.assign(Object.assign({},values),{[`${v.name}`]:val})}v.getAttribute("name")&&(values=!!v.getAttribute("data-metadata")?Object.assign(Object.assign({},values),{metadata:Object.assign(Object.assign({},values.metadata),{[`${v.name}`]:val})}):Object.assign(Object.assign({},values),{[`${v.name}`]:val}))}),{errors,values}},fieldsExist=(address,schema=AddressReducer_1.addressFields)=>{if(address.business){const required=(0,without_1.default)(schema,"first_name","last_name"),validAddress=(0,keys_1.default)(address).filter(k=>required.includes(k));return required.length>validAddress.length}else{const required=(0,without_1.default)(schema,"line_2","company"),validAddress=(0,keys_1.default)(address).filter(k=>required.includes(k));return required.length>validAddress.length}};exports.fieldsExist=fieldsExist;const businessOptionalFields=["billing_address_first_name","billing_address_last_name","shipping_address_first_name","shipping_address_last_name","first_name","last_name"],customerOptionalFields=["billing_address_company","shipping_address_company","company"];function businessMandatoryField(fieldName,isBusiness){return!(isBusiness&&businessOptionalFields.includes(fieldName)||!isBusiness&&customerOptionalFields.includes(fieldName))}exports.businessMandatoryField=businessMandatoryField,exports.default=validateFormFields;