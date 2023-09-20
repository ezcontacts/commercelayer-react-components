"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.AddressInput=void 0;const tslib_1=require("tslib"),jsx_runtime_1=require("react/jsx-runtime"),react_1=require("react"),BaseInput_1=tslib_1.__importDefault(require("../utils/BaseInput")),BillingAddressFormContext_1=tslib_1.__importDefault(require("../../context/BillingAddressFormContext")),ShippingAddressFormContext_1=tslib_1.__importDefault(require("../../context/ShippingAddressFormContext")),isEmpty_1=tslib_1.__importDefault(require("lodash/isEmpty")),validateFormFields_1=require("../../utils/validateFormFields"),CustomerAddressFormContext_1=tslib_1.__importDefault(require("../../context/CustomerAddressFormContext"));function AddressInput(props){const{placeholder="",required,value,className}=props,p=tslib_1.__rest(props,["placeholder","required","value","className"]),billingAddress=(0,react_1.useContext)(BillingAddressFormContext_1.default),shippingAddress=(0,react_1.useContext)(ShippingAddressFormContext_1.default),customerAddress=(0,react_1.useContext)(CustomerAddressFormContext_1.default),[hasError,setHasError]=(0,react_1.useState)(!1);(0,react_1.useEffect)(()=>{var _a,_b,_c,_d,_e,_f,_g,_h,_j;return value&&billingAddress?.setValue&&billingAddress.setValue(p.name,value),value&&shippingAddress?.setValue&&shippingAddress.setValue(p.name,value),value&&customerAddress?.setValue&&customerAddress.setValue(p.name,value),billingAddress.errors&&(!((_b=(_a=billingAddress?.errors)===null||_a===void 0?void 0:_a[p.name])===null||_b===void 0)&&_b.error)&&setHasError(!0),billingAddress&&(0,isEmpty_1.default)((_c=billingAddress?.errors)===null||_c===void 0?void 0:_c[p.name])&&hasError&&setHasError(!1),customerAddress.errors&&(!((_e=(_d=customerAddress?.errors)===null||_d===void 0?void 0:_d[p.name])===null||_e===void 0)&&_e.error)&&setHasError(!0),(0,isEmpty_1.default)((_f=customerAddress?.errors)===null||_f===void 0?void 0:_f[p.name])&&hasError&&setHasError(!1),shippingAddress.errors&&(!((_h=(_g=shippingAddress?.errors)===null||_g===void 0?void 0:_g[p.name])===null||_h===void 0)&&_h.error)&&setHasError(!0),shippingAddress&&(0,isEmpty_1.default)((_j=shippingAddress?.errors)===null||_j===void 0?void 0:_j[p.name])&&hasError&&setHasError(!1),()=>{setHasError(!1)}},[value,billingAddress?.errors,shippingAddress?.errors]);const mandatoryField=billingAddress?.isBusiness?(0,validateFormFields_1.businessMandatoryField)(p.name,billingAddress.isBusiness):(0,validateFormFields_1.businessMandatoryField)(p.name,shippingAddress.isBusiness),reqField=required!==void 0?required:mandatoryField,errorClassName=billingAddress?.errorClassName||shippingAddress?.errorClassName,classNameComputed=`${className||""} ${hasError&&errorClassName?errorClassName:""}`;return p.name==="billing_address_billing_info"&&billingAddress.requiresBillingInfo===!1&&required===void 0?null:(0,jsx_runtime_1.jsx)(BaseInput_1.default,Object.assign({ref:billingAddress?.validation||shippingAddress?.validation||customerAddress?.validation,className:classNameComputed,required:reqField,placeholder,defaultValue:value},p))}exports.AddressInput=AddressInput,exports.default=AddressInput;