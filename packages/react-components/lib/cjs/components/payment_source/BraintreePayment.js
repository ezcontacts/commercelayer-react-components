"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.BraintreePayment=void 0;const tslib_1=require("tslib"),jsx_runtime_1=require("react/jsx-runtime"),react_1=require("react"),PaymentMethodContext_1=tslib_1.__importDefault(require("../../context/PaymentMethodContext")),isEmpty_1=tslib_1.__importDefault(require("lodash/isEmpty")),OrderContext_1=tslib_1.__importDefault(require("../../context/OrderContext")),Parent_1=tslib_1.__importDefault(require("../utils/Parent")),localStorage_1=require("../../utils/localStorage"),promisify_1=tslib_1.__importDefault(require("../../utils/promisify")),defaultConfig={styles:{input:{"font-size":"16px",color:"#3A3A3A"},".number":{"font-family":"monospace"},":focus":{color:"blue"},".valid":{color:"green"},".invalid":{color:"red"},"@media screen and (max-width: 700px)":{input:{"font-size":"14px"}}},fields:{number:{label:"Card Number",selector:"#card-number",placeholder:"4111 1111 1111 1111"},cvv:{label:"CVV",selector:"#cvv",placeholder:"123"},expirationDate:{label:"Expiration Date",selector:"#expiration-date",placeholder:"10/2022"}},submitLabel:"Set payment method"};function BraintreePayment({authorization,config,templateCustomerSaveToWallet}){var _a,_b,_c;const{fields,styles,containerClassName,cardContainerClassName,fieldsContainerClassName,expDateContainerClassName,fieldLabelClassName,cvvContainerClassName,inputWrapperClassName,cardDetailsContainerClassName}=Object.assign(Object.assign({},defaultConfig),config),[loadBraintree,setLoadBraintree]=(0,react_1.useState)(!1),{setPaymentSource,paymentSource,setPaymentMethodErrors,currentPaymentMethodType,setPaymentRef}=(0,react_1.useContext)(PaymentMethodContext_1.default),{order}=(0,react_1.useContext)(OrderContext_1.default),ref=(0,react_1.useRef)(null),handleSubmitForm=({event,hostedFieldsInstance,threeDSInstance})=>tslib_1.__awaiter(this,void 0,void 0,function*(){var _d,_e,_f,_g,_h,_j;const savePaymentSourceToCustomerWallet=(_e=(_d=event?.elements)===null||_d===void 0?void 0:_d.save_payment_source_to_customer_wallet)===null||_e===void 0?void 0:_e.checked;if(savePaymentSourceToCustomerWallet&&(0,localStorage_1.setCustomerOrderParam)("_save_payment_source_to_customer_wallet",savePaymentSourceToCustomerWallet),hostedFieldsInstance)try{const payload=yield(0,promisify_1.default)(hostedFieldsInstance).then(payload2=>payload2),billingAddress=order?.billing_address,verifyCardOptions={nonce:payload.nonce,bin:payload.details.bin,amount:order?.total_amount_with_taxes_float,email:(_f=order?.customer_email)!==null&&_f!==void 0?_f:"",billingAddress:{givenName:(_g=billingAddress?.first_name)!==null&&_g!==void 0?_g:"",surname:(_h=billingAddress?.last_name)!==null&&_h!==void 0?_h:"",phoneNumber:billingAddress?.phone,streetAddress:billingAddress?.line_1,countryCodeAlpha2:billingAddress?.country_code,postalCode:(_j=billingAddress?.zip_code)!==null&&_j!==void 0?_j:"",region:billingAddress?.state_code,locality:billingAddress?.city},onLookupComplete:(_data,next)=>{next()}},response=yield threeDSInstance.verifyCard(verifyCardOptions);return response.rawCardinalSDKVerificationData.Validated&&paymentSource?(paymentSource&&(yield setPaymentSource({paymentSourceId:paymentSource.id,paymentResource:"braintree_payments",attributes:{payment_method_nonce:response.nonce,options:{id:response.nonce,card:{last4:response.details.lastFour,exp_year:response.details.expirationYear,exp_month:response.details.expirationMonth,brand:response.details.cardType.toLowerCase()}}}})),!0):!1}catch(error){return console.error(error),setPaymentMethodErrors([{code:"PAYMENT_INTENT_AUTHENTICATION_FAILURE",resource:"payment_methods",field:currentPaymentMethodType,message:error.message}]),!1}return!1});return(0,react_1.useEffect)(()=>{if(!ref&&authorization&&(0,localStorage_1.setCustomerOrderParam)("_save_payment_source_to_customer_wallet","false"),authorization&&!loadBraintree&&!(0,isEmpty_1.default)(window)){const braintreeClient=require("braintree-web/client"),hostedFields=require("braintree-web/hosted-fields"),threeDSecure=require("braintree-web/three-d-secure");braintreeClient.create({authorization},(clientErr,clientInstance)=>{if(clientErr){console.error(clientErr);return}hostedFields.create({client:clientInstance,fields,styles},(hostedFieldsErr,hostedFieldsInstance)=>{if(hostedFieldsErr){console.error(hostedFieldsErr);return}setLoadBraintree(!0),threeDSecure.create({authorization,version:2},(threeDSecureErr,threeDSInstance)=>{threeDSecureErr&&(console.error("3DSecure error",threeDSecureErr),setPaymentMethodErrors([{code:"PAYMENT_INTENT_AUTHENTICATION_FAILURE",resource:"payment_methods",field:currentPaymentMethodType,message:threeDSecureErr.message}])),ref.current&&(ref.current.onsubmit=paymentSource2=>tslib_1.__awaiter(this,void 0,void 0,function*(){return yield handleSubmitForm({event:ref.current,hostedFieldsInstance,threeDSInstance,paymentSource:paymentSource2})}),setPaymentRef({ref}))})})})}return()=>{setPaymentRef({ref:{current:null}}),setLoadBraintree(!1)}},[authorization,ref]),!authorization&&!loadBraintree?null:(0,jsx_runtime_1.jsx)("div",{className:containerClassName,children:(0,jsx_runtime_1.jsxs)("form",{ref,id:"braintree-form",onSubmit:handleSubmitForm,className:containerClassName,children:[(0,jsx_runtime_1.jsxs)("div",{className:fieldsContainerClassName,children:[(0,jsx_runtime_1.jsxs)("div",{className:cardContainerClassName,children:[(0,jsx_runtime_1.jsx)("label",{className:fieldLabelClassName,htmlFor:"card-number",children:(_a=fields?.number)===null||_a===void 0?void 0:_a.label}),(0,jsx_runtime_1.jsx)("div",{className:inputWrapperClassName,id:"card-number"})]}),(0,jsx_runtime_1.jsxs)("div",{className:cardDetailsContainerClassName,children:[(0,jsx_runtime_1.jsxs)("div",{className:expDateContainerClassName,children:[(0,jsx_runtime_1.jsx)("label",{className:fieldLabelClassName,htmlFor:"expiration-date",children:(_b=fields?.expirationDate)===null||_b===void 0?void 0:_b.label}),(0,jsx_runtime_1.jsx)("div",{className:inputWrapperClassName,id:"expiration-date"})]}),(0,jsx_runtime_1.jsxs)("div",{className:cvvContainerClassName,children:[(0,jsx_runtime_1.jsx)("label",{className:fieldLabelClassName,htmlFor:"cvv",children:(_c=fields?.cvv)===null||_c===void 0?void 0:_c.label}),(0,jsx_runtime_1.jsx)("div",{className:inputWrapperClassName,id:"cvv"})]})]})]}),(0,jsx_runtime_1.jsx)("div",{className:fieldsContainerClassName,children:templateCustomerSaveToWallet&&(0,jsx_runtime_1.jsx)(Parent_1.default,{name:"save_payment_source_to_customer_wallet",children:templateCustomerSaveToWallet})})]})})}exports.BraintreePayment=BraintreePayment,exports.default=BraintreePayment;