import{jsx as _jsx,jsxs as _jsxs}from"react/jsx-runtime";import{useContext,useEffect,useRef,useState}from"react";import PaymentMethodContext from"../../context/PaymentMethodContext";import{Elements,PaymentElement,useElements,useStripe}from"@stripe/react-stripe-js";import Parent from"../utils/Parent";import{setCustomerOrderParam}from"../../utils/localStorage";import OrderContext from"../../context/OrderContext";import{StripeExpressPayment}from"./StripeExpressPayment";const defaultOptions={layout:{type:"accordion",defaultCollapsed:!1,radios:!0,spacedAccordionItems:!1},fields:{billingDetails:"never"}},defaultAppearance={theme:"stripe",variables:{colorText:"#32325d",fontFamily:'"Helvetica Neue", Helvetica, sans-serif'}};function StripePaymentForm({options=defaultOptions,templateCustomerSaveToWallet}){const ref=useRef(null),{currentPaymentMethodType,setPaymentMethodErrors,setPaymentRef}=useContext(PaymentMethodContext),{order}=useContext(OrderContext),stripe=useStripe(),elements=useElements();useEffect(()=>(ref.current&&stripe&&elements&&(ref.current.onsubmit=async()=>await onSubmit({event:ref.current,stripe,elements}),setPaymentRef({ref})),()=>{setPaymentRef({ref:{current:null}})}),[ref,stripe,elements]);const onSubmit=async({event,stripe:stripe2,elements:elements2})=>{if(!stripe2)return!1;const savePaymentSourceToCustomerWallet=event?.elements?.save_payment_source_to_customer_wallet?.checked;if(savePaymentSourceToCustomerWallet&&setCustomerOrderParam("_save_payment_source_to_customer_wallet",savePaymentSourceToCustomerWallet),elements2!=null){const billingInfo=order?.billing_address,email=order?.customer_email??"",billingDetails={name:billingInfo?.full_name??"",email,phone:billingInfo?.phone,address:{city:billingInfo?.city,country:billingInfo?.country_code,line1:billingInfo?.line_1,line2:billingInfo?.line_2??"",postal_code:billingInfo?.zip_code??"",state:billingInfo?.state_code}},{error}=await stripe2.confirmPayment({elements:elements2,confirmParams:{return_url:window.location.href,payment_method_data:{billing_details:billingDetails}},redirect:"if_required"});return error?(console.error(error),setPaymentMethodErrors([{code:"PAYMENT_INTENT_AUTHENTICATION_FAILURE",resource:"payment_methods",field:currentPaymentMethodType,message:error.message}]),!1):!0}return!1};return _jsxs("form",{ref,children:[_jsx(PaymentElement,{id:"payment-element",options:{...defaultOptions,...options}}),templateCustomerSaveToWallet&&_jsx(Parent,{name:"save_payment_source_to_customer_wallet",children:templateCustomerSaveToWallet})]})}export function StripePayment({publishableKey,show,options,clientSecret,locale="auto",expressPayments=!1,...p}){const[isLoaded,setIsLoaded]=useState(!1),[stripe,setStripe]=useState(null),{containerClassName,templateCustomerSaveToWallet,fonts=[],appearance,...divProps}=p;useEffect(()=>(show&&publishableKey&&import("@stripe/stripe-js").then(({loadStripe})=>{(async()=>{const res=await loadStripe(publishableKey,{locale});res!=null&&(setStripe(res),setIsLoaded(!0))})()}),()=>{setIsLoaded(!1)}),[show,publishableKey]);const elementsOptions={clientSecret,appearance:{...defaultAppearance,...appearance},fonts};return isLoaded&&stripe!=null&&clientSecret!=null?_jsx("div",{className:containerClassName,...divProps,children:_jsx(Elements,{stripe,options:elementsOptions,children:expressPayments?_jsx(StripeExpressPayment,{clientSecret}):_jsx(StripePaymentForm,{options,templateCustomerSaveToWallet})})}):null}export default StripePayment;