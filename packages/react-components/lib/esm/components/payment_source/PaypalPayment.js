import{jsx as _jsx}from"react/jsx-runtime";import PaymentMethodContext from"../../context/PaymentMethodContext";import isFunction from"lodash/isFunction";import{useContext,useEffect,useRef}from"react";const defaultMessage="by placing the order, you will be redirected to the PayPal website to sign in and authorize the payment";export function PaypalPayment({infoMessage,...p}){const ref=useRef(null),{setPaymentSource,paymentSource,currentPaymentMethodType,setPaymentRef}=useContext(PaymentMethodContext);useEffect(()=>(ref.current&&paymentSource&&currentPaymentMethodType&&paymentSource?.approval_url&&(ref.current.onsubmit=async()=>await handleClick(),setPaymentRef({ref})),()=>{setPaymentRef({ref:{current:null}})}),[ref,paymentSource,currentPaymentMethodType]);const handleClick=async()=>{if(paymentSource&&currentPaymentMethodType)try{return await setPaymentSource({paymentSourceId:paymentSource.id,paymentResource:currentPaymentMethodType,attributes:{metadata:{card:{id:paymentSource.id,brand:"paypal",last4:""}}}}),!0}catch{return!1}return!1};return _jsx("form",{ref,children:_jsx("div",{...p,children:_jsx("span",{className:infoMessage?.className,children:isFunction(infoMessage?.text)?infoMessage?.text():infoMessage?.text||defaultMessage})})})}export default PaypalPayment;