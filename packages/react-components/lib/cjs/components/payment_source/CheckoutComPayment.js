"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.CheckoutComPayment=void 0;const tslib_1=require("tslib"),jsx_runtime_1=require("react/jsx-runtime"),react_1=require("react"),useExternalScript_1=tslib_1.__importDefault(require("../../utils/hooks/useExternalScript")),PaymentMethodContext_1=tslib_1.__importDefault(require("../../context/PaymentMethodContext")),frames_react_1=require("frames-react"),OrderContext_1=tslib_1.__importDefault(require("../../context/OrderContext")),Parent_1=tslib_1.__importDefault(require("../utils/Parent")),localStorage_1=require("../../utils/localStorage"),scriptUrl="https://cdn.checkout.com/js/framesv2.min.js",systemLanguages=["DE-DE","EN-GB","ES-ES","FR-FR","IT-IT","KR-KR","NL-NL"],defaultOptions={style:{base:{color:"black",fontSize:"18px"},autofill:{backgroundColor:"yellow"},hover:{color:"blue"},focus:{color:"blue"},valid:{color:"green"},invalid:{color:"red"},placeholder:{base:{color:"gray"},focus:{border:"solid 1px blue"}}}};function CheckoutComPayment(_a){var{publicKey,options=defaultOptions,locale="EN-GB"}=_a,p=tslib_1.__rest(_a,["publicKey","options","locale"]);const ref=(0,react_1.useRef)(null),loaded=(0,useExternalScript_1.default)(scriptUrl),{setPaymentRef,currentPaymentMethodType,paymentSource,setPaymentSource,setPaymentMethodErrors}=(0,react_1.useContext)(PaymentMethodContext_1.default),{order}=(0,react_1.useContext)(OrderContext_1.default),{containerClassName,templateCustomerSaveToWallet,successUrl=window.location.href,failureUrl=window.location.href,show}=p,divProps=tslib_1.__rest(p,["containerClassName","templateCustomerSaveToWallet","successUrl","failureUrl","show"]),handleSubmit=()=>tslib_1.__awaiter(this,void 0,void 0,function*(){var _b,_c,_d,_e,_f,_g,_h,_j,_k,_l,_m,_o,_p;const savePaymentSourceToCustomerWallet=(_d=(_c=(_b=ref?.current)===null||_b===void 0?void 0:_b.elements)===null||_c===void 0?void 0:_c.save_payment_source_to_customer_wallet)===null||_d===void 0?void 0:_d.checked;if(savePaymentSourceToCustomerWallet&&(0,localStorage_1.setCustomerOrderParam)("_save_payment_source_to_customer_wallet",savePaymentSourceToCustomerWallet),window.Frames){window.Frames.cardholder={name:(_e=order?.billing_address)===null||_e===void 0?void 0:_e.full_name,billingAddress:{addressLine1:(_f=order?.billing_address)===null||_f===void 0?void 0:_f.line_1,addressLine2:(_h=(_g=order?.billing_address)===null||_g===void 0?void 0:_g.line_2)!==null&&_h!==void 0?_h:"",zip:(_k=(_j=order?.billing_address)===null||_j===void 0?void 0:_j.zip_code)!==null&&_k!==void 0?_k:"",city:(_l=order?.billing_address)===null||_l===void 0?void 0:_l.city,state:(_m=order?.billing_address)===null||_m===void 0?void 0:_m.state_code,country:(_o=order?.billing_address)===null||_o===void 0?void 0:_o.country_code},phone:(_p=order?.billing_address)===null||_p===void 0?void 0:_p.phone};try{const data=yield window.Frames.submitCard();if(data.token&&paymentSource&&currentPaymentMethodType){const ps=yield setPaymentSource({paymentSourceId:paymentSource.id,paymentResource:currentPaymentMethodType,attributes:{token:data.token,payment_type:"token",success_url:successUrl,failure_url:failureUrl,_authorize:!0}});ps?.redirect_uri&&(window.location.href=ps.redirect_uri)}}catch(error){console.error(error),setPaymentMethodErrors([{code:"PAYMENT_INTENT_AUTHENTICATION_FAILURE",resource:"payment_methods",field:currentPaymentMethodType,message:error?.message}])}}return!1}),lang=`${locale.toUpperCase()}-${locale.toUpperCase()}`,localization=systemLanguages.includes(lang)?lang:"EN-GB";return loaded&&show?(0,jsx_runtime_1.jsxs)("form",{ref,children:[(0,jsx_runtime_1.jsx)("div",Object.assign({className:containerClassName},divProps,{children:(0,jsx_runtime_1.jsxs)(frames_react_1.Frames,{config:Object.assign({debug:!0,publicKey,localization},options),cardValidationChanged:e=>{e.isValid&&ref.current&&(ref.current.onsubmit=()=>tslib_1.__awaiter(this,void 0,void 0,function*(){return yield handleSubmit()}),setPaymentRef({ref}))},cardTokenized:data=>data,children:[(0,jsx_runtime_1.jsx)(frames_react_1.CardNumber,{}),(0,jsx_runtime_1.jsx)(frames_react_1.ExpiryDate,{}),(0,jsx_runtime_1.jsx)(frames_react_1.Cvv,{})]})})),templateCustomerSaveToWallet&&(0,jsx_runtime_1.jsx)(Parent_1.default,{name:"save_payment_source_to_customer_wallet",children:templateCustomerSaveToWallet})]}):null}exports.CheckoutComPayment=CheckoutComPayment,exports.default=CheckoutComPayment;