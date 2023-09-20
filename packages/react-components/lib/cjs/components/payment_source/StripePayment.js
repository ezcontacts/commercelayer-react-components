"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.StripePayment=void 0;const tslib_1=require("tslib"),jsx_runtime_1=require("react/jsx-runtime"),react_1=require("react"),PaymentMethodContext_1=tslib_1.__importDefault(require("../../context/PaymentMethodContext")),react_stripe_js_1=require("@stripe/react-stripe-js"),Parent_1=tslib_1.__importDefault(require("../utils/Parent")),localStorage_1=require("../../utils/localStorage"),OrderContext_1=tslib_1.__importDefault(require("../../context/OrderContext")),StripeExpressPayment_1=require("./StripeExpressPayment"),defaultOptions={layout:{type:"accordion",defaultCollapsed:!1,radios:!0,spacedAccordionItems:!1},fields:{billingDetails:"never"}},defaultAppearance={theme:"stripe",variables:{colorText:"#32325d",fontFamily:'"Helvetica Neue", Helvetica, sans-serif'}};function StripePaymentForm({options=defaultOptions,templateCustomerSaveToWallet}){const ref=(0,react_1.useRef)(null),{currentPaymentMethodType,setPaymentMethodErrors,setPaymentRef}=(0,react_1.useContext)(PaymentMethodContext_1.default),{order}=(0,react_1.useContext)(OrderContext_1.default),stripe=(0,react_stripe_js_1.useStripe)(),elements=(0,react_stripe_js_1.useElements)();(0,react_1.useEffect)(()=>(ref.current&&stripe&&elements&&(ref.current.onsubmit=()=>tslib_1.__awaiter(this,void 0,void 0,function*(){return yield onSubmit({event:ref.current,stripe,elements})}),setPaymentRef({ref})),()=>{setPaymentRef({ref:{current:null}})}),[ref,stripe,elements]);const onSubmit=({event,stripe:stripe2,elements:elements2})=>tslib_1.__awaiter(this,void 0,void 0,function*(){var _a,_b,_c,_d,_e,_f;if(!stripe2)return!1;const savePaymentSourceToCustomerWallet=(_b=(_a=event?.elements)===null||_a===void 0?void 0:_a.save_payment_source_to_customer_wallet)===null||_b===void 0?void 0:_b.checked;if(savePaymentSourceToCustomerWallet&&(0,localStorage_1.setCustomerOrderParam)("_save_payment_source_to_customer_wallet",savePaymentSourceToCustomerWallet),elements2!=null){const billingInfo=order?.billing_address,email=(_c=order?.customer_email)!==null&&_c!==void 0?_c:"",billingDetails={name:(_d=billingInfo?.full_name)!==null&&_d!==void 0?_d:"",email,phone:billingInfo?.phone,address:{city:billingInfo?.city,country:billingInfo?.country_code,line1:billingInfo?.line_1,line2:(_e=billingInfo?.line_2)!==null&&_e!==void 0?_e:"",postal_code:(_f=billingInfo?.zip_code)!==null&&_f!==void 0?_f:"",state:billingInfo?.state_code}},{error}=yield stripe2.confirmPayment({elements:elements2,confirmParams:{return_url:window.location.href,payment_method_data:{billing_details:billingDetails}},redirect:"if_required"});return error?(console.error(error),setPaymentMethodErrors([{code:"PAYMENT_INTENT_AUTHENTICATION_FAILURE",resource:"payment_methods",field:currentPaymentMethodType,message:error.message}]),!1):!0}return!1});return(0,jsx_runtime_1.jsxs)("form",{ref,children:[(0,jsx_runtime_1.jsx)(react_stripe_js_1.PaymentElement,{id:"payment-element",options:Object.assign(Object.assign({},defaultOptions),options)}),templateCustomerSaveToWallet&&(0,jsx_runtime_1.jsx)(Parent_1.default,{name:"save_payment_source_to_customer_wallet",children:templateCustomerSaveToWallet})]})}function StripePayment(_a){var{publishableKey,show,options,clientSecret,locale="auto",expressPayments=!1}=_a,p=tslib_1.__rest(_a,["publishableKey","show","options","clientSecret","locale","expressPayments"]);const[isLoaded,setIsLoaded]=(0,react_1.useState)(!1),[stripe,setStripe]=(0,react_1.useState)(null),{containerClassName,templateCustomerSaveToWallet,fonts=[],appearance}=p,divProps=tslib_1.__rest(p,["containerClassName","templateCustomerSaveToWallet","fonts","appearance"]);(0,react_1.useEffect)(()=>(show&&publishableKey&&Promise.resolve().then(()=>tslib_1.__importStar(require("@stripe/stripe-js"))).then(({loadStripe})=>{(()=>tslib_1.__awaiter(this,void 0,void 0,function*(){const res=yield loadStripe(publishableKey,{locale});res!=null&&(setStripe(res),setIsLoaded(!0))}))()}),()=>{setIsLoaded(!1)}),[show,publishableKey]);const elementsOptions={clientSecret,appearance:Object.assign(Object.assign({},defaultAppearance),appearance),fonts};return isLoaded&&stripe!=null&&clientSecret!=null?(0,jsx_runtime_1.jsx)("div",Object.assign({className:containerClassName},divProps,{children:(0,jsx_runtime_1.jsx)(react_stripe_js_1.Elements,{stripe,options:elementsOptions,children:expressPayments?(0,jsx_runtime_1.jsx)(StripeExpressPayment_1.StripeExpressPayment,{clientSecret}):(0,jsx_runtime_1.jsx)(StripePaymentForm,{options,templateCustomerSaveToWallet})})})):null}exports.StripePayment=StripePayment,exports.default=StripePayment;