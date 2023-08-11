import{jsx as _jsx,Fragment as _Fragment}from"react/jsx-runtime";import{useState,useEffect,useContext}from"react";import PaymentMethodContext from"../../context/PaymentMethodContext";import PaymentMethodChildrenContext from"../../context/PaymentMethodChildrenContext";import getLoaderComponent from"../../utils/getLoaderComponent";import useCustomContext from"../../utils/hooks/useCustomContext";import OrderContext from"../../context/OrderContext";import CustomerContext from"../../context/CustomerContext";import{getExternalPaymentAttributes,getPaypalAttributes}from"../../utils/getPaymentAttributes";import{isEmpty}from"../../utils/isEmpty";import{getAvailableExpressPayments}from"../../utils/expressPaymentHelper";export function PaymentMethod({children,className,activeClass,loader="Loading...",clickableContainer,autoSelectSinglePaymentMethod,expressPayments,hide,onClick,...p}){const[loading,setLoading]=useState(!0),[paymentSelected,setPaymentSelected]=useState(""),{paymentMethods,currentPaymentMethodId,setPaymentMethod,setLoading:setLoadingPlaceOrder,paymentSource,setPaymentSource,config}=useCustomContext({context:PaymentMethodContext,contextComponentName:"PaymentMethodsContainer",currentComponentName:"PaymentMethod",key:"paymentMethods"}),{order}=useContext(OrderContext),{getCustomerPaymentSources}=useContext(CustomerContext);useEffect(()=>{if(paymentMethods!=null&&!isEmpty(paymentMethods)&&expressPayments){const[paymentMethod]=getAvailableExpressPayments(paymentMethods);!paymentSource&&paymentMethod!=null&&(async()=>{setLoadingPlaceOrder({loading:!0}),setPaymentSelected(paymentMethod.id);const paymentMethodId=paymentMethod?.id,paymentResource=paymentMethod?.payment_source_type;await setPaymentMethod({paymentResource,paymentMethodId}),await setPaymentSource({paymentResource,order})&&paymentMethod&&onClick!=null&&(onClick({payment:paymentMethod,order}),setTimeout(()=>{setLoading(!1)},200)),setLoadingPlaceOrder({loading:!1})})()}},[!isEmpty(paymentMethods),expressPayments]),useEffect(()=>{paymentMethods!=null&&autoSelectSinglePaymentMethod!=null&&!expressPayments&&(async()=>{if(paymentMethods.length===1){const[paymentMethod]=paymentMethods??[];if(paymentMethod&&!paymentSource){setLoadingPlaceOrder({loading:!0}),setPaymentSelected(paymentMethod.id);const paymentMethodId=paymentMethod?.id,paymentResource=paymentMethod?.payment_source_type;await setPaymentMethod({paymentResource,paymentMethodId});let attributes={};config!=null&&paymentResource==="paypal_payments"&&(attributes=getPaypalAttributes(paymentResource,config)),config!=null&&paymentResource==="external_payments"&&(attributes=getExternalPaymentAttributes(paymentResource,config)),await setPaymentSource({paymentResource,order,attributes})&&paymentMethod&&onClick!=null&&(onClick({payment:paymentMethod,order}),setTimeout(()=>{setLoading(!1)},200)),getCustomerPaymentSources&&getCustomerPaymentSources(),setLoadingPlaceOrder({loading:!1})}typeof autoSelectSinglePaymentMethod=="function"&&autoSelectSinglePaymentMethod()}else setTimeout(()=>{setLoading(!1)},200)})()},[paymentMethods,expressPayments]),useEffect(()=>(paymentMethods&&(paymentMethods.length===1&&autoSelectSinglePaymentMethod?paymentSource&&setTimeout(()=>{setLoading(!1)},200):setLoading(!1)),currentPaymentMethodId&&setPaymentSelected(currentPaymentMethodId),()=>{setLoading(!0)}),[paymentMethods,currentPaymentMethodId]);const components=paymentMethods?.filter(payment=>{if(Array.isArray(hide)){const source=payment?.payment_source_type;return!hide?.includes(source)}else if(typeof hide=="function")return hide(payment);return!0}).map((payment,k)=>{const isActive=currentPaymentMethodId===payment?.id,paymentMethodProps={payment,clickableContainer,paymentSelected,setPaymentSelected,expressPayments},paymentResource=payment?.payment_source_type,onClickable=clickableContainer?async e=>{e.stopPropagation(),setLoadingPlaceOrder({loading:!0}),setPaymentSelected(payment.id);const paymentMethodId=payment?.id,{order:order2}=await setPaymentMethod({paymentResource,paymentMethodId});onClick&&onClick({payment,order:order2}),setLoadingPlaceOrder({loading:!1})}:void 0;return _jsx("div",{"data-testid":paymentResource,className:`${className??""} ${isActive&&activeClass!=null?activeClass:""}`,onClick:onClickable,...p,children:_jsx(PaymentMethodChildrenContext.Provider,{value:paymentMethodProps,children})},k)});return loading?getLoaderComponent(loader):_jsx(_Fragment,{children:components})}export default PaymentMethod;