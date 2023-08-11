import{jsx as _jsx}from"react/jsx-runtime";import CommerceLayerContext from"../../context/CommerceLayerContext";import OrderContext from"../../context/OrderContext";import PaymentMethodContext from"../../context/PaymentMethodContext";import{getAvailableExpressPayments,getExpressShippingMethods,setExpressFakeAddress,setExpressPlaceOrder,setExpressShippingMethod,expressRedirectUrl}from"../../utils/expressPaymentHelper";import{isEmpty}from"../../utils/isEmpty";import{PaymentRequestButtonElement,useStripe}from"@stripe/react-stripe-js";import{useContext,useEffect,useState}from"react";export function StripeExpressPayment({clientSecret}){const stripe=useStripe(),[paymentRequest,setPaymentRequest]=useState(null),{accessToken,endpoint}=useContext(CommerceLayerContext),{order}=useContext(OrderContext),{paymentMethods,paymentSource}=useContext(PaymentMethodContext);return useEffect(()=>{if(stripe==null||order==null)return;const pr=stripe.paymentRequest({country:order?.country_code??"US",currency:order?.currency_code?.toLowerCase()??"",total:{label:`#${order?.number??""}`,amount:order?.total_amount_with_taxes_cents??0},requestPayerName:!0,requestPayerEmail:!0,requestPayerPhone:!0,requestShipping:!0});pr.canMakePayment().then(result=>{console.log("available payment:",result),result&&setPaymentRequest(pr)}).catch(err=>{console.error("Can make payment:",err)})},[isEmpty(stripe),isEmpty(order)]),paymentRequest!=null&&stripe!=null?(paymentRequest.on("shippingaddresschange",async ev=>{if(order!=null&&accessToken!=null&&endpoint!=null){const requiresBillingInfo=order?.requires_billing_info??!1,orderWithShipments=await setExpressFakeAddress({orderId:order.id,config:{accessToken,endpoint},address:{first_name:"Fake name",last_name:"Fake lastname",country_code:ev.shippingAddress.country??"",line_1:"Fake street 123",city:ev.shippingAddress.city??"Fake city",zip_code:ev.shippingAddress.postalCode??"12345",state_code:ev.shippingAddress.region??"Fake state",phone:"1234567890",billing_info:requiresBillingInfo?"Fake billing info":void 0}}),shippingOptions=getExpressShippingMethods(orderWithShipments);shippingOptions!=null&&!isEmpty(shippingOptions)?ev.updateWith({status:"success",shippingOptions,total:{label:`#${orderWithShipments?.number??""}`,amount:orderWithShipments?.total_amount_with_taxes_cents??0}}):ev.updateWith({status:"invalid_shipping_address"})}else ev.updateWith({status:"fail"})}),paymentRequest.on("shippingoptionchange",async ev=>{if(order!=null&&accessToken!=null&&endpoint!=null){const updatedOrder=await setExpressShippingMethod({orderId:order.id,config:{accessToken,endpoint},selectFirst:!1,selectedShippingMethodId:ev.shippingOption.id,params:{include:["shipments.available_shipping_methods"]}});ev.updateWith({status:"success",total:{label:`#${updatedOrder?.number??""}`,amount:updatedOrder?.total_amount_with_taxes_cents??0}})}else ev.updateWith({status:"fail"})}),paymentRequest.on("paymentmethod",async ev=>{if(order?.id==null)throw new Error("Order is null");if(paymentMethods==null)throw new Error("Payment methods are null");const[paymentMethod]=getAvailableExpressPayments(paymentMethods);if(paymentMethod==null)throw new Error("Payment method is null");if(paymentSource==null)throw new Error("Payment source is null");const requiresBillingInfo=order?.requires_billing_info??!1,paymentResource=paymentMethod?.payment_source_type;if(accessToken!=null&&endpoint!=null){const[firstName,lastName]=ev.payerName?.split(" ")??[],[line]=ev.shippingAddress?.addressLine??"",email=ev.payerEmail??"";await setExpressFakeAddress({orderId:order.id,config:{accessToken,endpoint},address:{first_name:firstName??"Fake name",last_name:lastName??"Fake lastname",country_code:ev?.shippingAddress?.country??"",line_1:line??"Fake street 123",city:ev?.shippingAddress?.city??"Fake city",zip_code:ev?.shippingAddress?.postalCode??"12345",state_code:ev?.shippingAddress?.region??"Fake state",phone:ev?.payerPhone??"1234567890",billing_info:requiresBillingInfo?"Fake billing info":void 0},email}),await setExpressShippingMethod({orderId:order.id,config:{accessToken,endpoint},selectFirst:!1,selectedShippingMethodId:ev?.shippingOption?.id,params:{include:["shipments.available_shipping_methods"]}});const placeOrderParams={config:{accessToken,endpoint},orderId:order?.id,paymentResource,paymentSourceId:paymentSource?.id};await setExpressPlaceOrder(placeOrderParams);const{paymentIntent,error:confirmError}=await stripe.confirmCardPayment(clientSecret,{payment_method:ev.paymentMethod.id},{handleActions:!1});if(confirmError)ev.complete("fail"),console.error("Confirm card payment:",confirmError);else if(ev.complete("success"),paymentIntent.status==="requires_action"){const{error}=await stripe.confirmCardPayment(clientSecret);if(error)console.error("Confirm card payment:",error);else{const placeOrderParams2={config:{accessToken,endpoint},orderId:order?.id,placeTheOrder:!0};try{const order2=await setExpressPlaceOrder(placeOrderParams2);ev.complete("success"),expressRedirectUrl({order:order2,config:{accessToken,endpoint}})}catch(err){console.error("Place order:",err),ev.complete("fail")}}}else{const placeOrderParams2={config:{accessToken,endpoint},orderId:order?.id,placeTheOrder:!0};try{const order2=await setExpressPlaceOrder(placeOrderParams2);ev.complete("success"),expressRedirectUrl({order:order2,config:{accessToken,endpoint}})}catch(err){console.error("Place order:",err),ev.complete("fail")}}}}),_jsx(PaymentRequestButtonElement,{className:"",options:{paymentRequest}})):null}