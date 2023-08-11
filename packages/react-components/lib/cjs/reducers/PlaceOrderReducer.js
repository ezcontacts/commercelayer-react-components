"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.setPlaceOrder=exports.placeOrderPermitted=exports.setPlaceOrderErrors=exports.placeOrderInitialState=exports.setButtonRef=void 0;const tslib_1=require("tslib"),baseReducer_1=tslib_1.__importDefault(require("../utils/baseReducer")),isEmpty_1=tslib_1.__importDefault(require("lodash/isEmpty")),shipments_1=require("../utils/shipments"),customerOrderOptions_1=require("../utils/customerOrderOptions"),getSdk_1=tslib_1.__importDefault(require("../utils/getSdk")),getErrors_1=tslib_1.__importDefault(require("../utils/getErrors")),hasSubscriptions_1=require("../utils/hasSubscriptions");function setButtonRef(ref,dispatch){ref?.current!=null&&dispatch({type:"setButtonRef",payload:{placeOrderButtonRef:ref}})}exports.setButtonRef=setButtonRef,exports.placeOrderInitialState={errors:[],isPermitted:!1};function setPlaceOrderErrors(errors,dispatch){dispatch&&dispatch({type:"setErrors",payload:{errors}})}exports.setPlaceOrderErrors=setPlaceOrderErrors;function placeOrderPermitted({config,order,dispatch,options}){var _a;if(order&&config){let isPermitted=!0;order.privacy_url&&order.terms_url&&(isPermitted=localStorage.getItem("privacy-terms")==="true");const billingAddress=order.billing_address,shippingAddress=order.shipping_address,doNotShip=(0,shipments_1.isDoNotShip)(order.line_items),shipments=order.shipments,shipment=shipments&&(0,shipments_1.shipmentsFilled)(shipments),paymentMethod=order.payment_method,paymentSource=order.payment_source;order.total_amount_with_taxes_cents!==0&&(0,isEmpty_1.default)(paymentMethod?.id)&&(isPermitted=!1),(0,isEmpty_1.default)(billingAddress)&&(isPermitted=!1),(0,isEmpty_1.default)(shippingAddress)&&!doNotShip&&(isPermitted=!1),!(0,isEmpty_1.default)(shipments)&&!shipment&&(isPermitted=!1),paymentSource?.mismatched_amounts&&(isPermitted=!1),dispatch({type:"setPlaceOrderPermitted",payload:{isPermitted,paymentType:paymentMethod?.payment_source_type,paymentSecret:paymentSource?.client_secret,paymentId:(_a=paymentSource?.options)===null||_a===void 0?void 0:_a.id,paymentSource,options}})}}exports.placeOrderPermitted=placeOrderPermitted;function setPlaceOrder({state,order,config,setOrderErrors,paymentSource,setOrder,include}){var _a,_b,_c,_d;return tslib_1.__awaiter(this,void 0,void 0,function*(){const response={placed:!1};if(state&&config&&order){const sdk=(0,getSdk_1.default)(config),{options,paymentType}=state;try{if(paymentType==="paypal_payments"&&paymentSource?.type==="paypal_payments"){if(!options?.paypalPayerId&&paymentSource?.approval_url)return window.location.href=paymentSource?.approval_url,response;yield sdk[paymentType].update({id:paymentSource.id,paypal_payer_id:options?.paypalPayerId})}if(paymentType==="checkout_com_payments"&&paymentSource&&!((_a=options?.checkoutCom)===null||_a===void 0)&&_a.session_id){const payment=yield sdk[paymentType].update({id:paymentSource.id,_details:!0,session_id:(_b=options?.checkoutCom)===null||_b===void 0?void 0:_b.session_id});if(((_c=payment?.payment_response)===null||_c===void 0?void 0:_c.status)!=="Authorized"){const[action]=((_d=payment?.payment_response)===null||_d===void 0?void 0:_d.actions)||[""];throw{errors:[{code:"PAYMENT_NOT_APPROVED_FOR_EXECUTION",message:action?.response_summary,resource:"orders",field:"checkout_com_payments"}]}}}const updateAttributes={id:order.id,_place:!0};switch((0,customerOrderOptions_1.saveBillingAddress)()&&(yield sdk.orders.update({id:order.id,_save_billing_address_to_customer_address_book:!0})),(0,customerOrderOptions_1.saveShippingAddress)()&&(yield sdk.orders.update({id:order.id,_save_shipping_address_to_customer_address_book:!0})),paymentType){case"braintree_payments":{(0,customerOrderOptions_1.saveToWallet)()&&(yield sdk.orders.update({id:order.id,_save_payment_source_to_customer_wallet:!0}));const orderUpdated=yield sdk.orders.update(updateAttributes,{include});return setOrder&&setOrder(orderUpdated),setOrderErrors&&setOrderErrors([]),(0,hasSubscriptions_1.hasSubscriptions)(orderUpdated)&&(yield sdk.orders.update({id:order.id,_create_subscriptions:!0})),{placed:!0,order:orderUpdated}}default:{const orderUpdated=yield sdk.orders.update(updateAttributes,{include});return setOrder&&setOrder(orderUpdated),(0,customerOrderOptions_1.saveToWallet)()&&(yield sdk.orders.update({id:order.id,_save_payment_source_to_customer_wallet:!0})),setOrderErrors&&setOrderErrors([]),(0,hasSubscriptions_1.hasSubscriptions)(orderUpdated)&&(yield sdk.orders.update({id:order.id,_create_subscriptions:!0})),{placed:!0,order:orderUpdated}}}}catch(error){const errors=(0,getErrors_1.default)({error,resource:"orders",field:paymentType});return setOrderErrors&&setOrderErrors(errors),Object.assign(Object.assign({},response),{errors})}}return response})}exports.setPlaceOrder=setPlaceOrder;const type=["setErrors","setPlaceOrderPermitted","setButtonRef"],placeOrderReducer=(state,reducer)=>(0,baseReducer_1.default)(state,reducer,type);exports.default=placeOrderReducer;