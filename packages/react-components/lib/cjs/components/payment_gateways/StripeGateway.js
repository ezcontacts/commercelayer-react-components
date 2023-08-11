"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.StripeGateway=void 0;const tslib_1=require("tslib"),jsx_runtime_1=require("react/jsx-runtime"),StripePayment_1=tslib_1.__importDefault(require("../payment_source/StripePayment")),CustomerContext_1=tslib_1.__importDefault(require("../../context/CustomerContext")),OrderContext_1=tslib_1.__importDefault(require("../../context/OrderContext")),PaymentMethodChildrenContext_1=tslib_1.__importDefault(require("../../context/PaymentMethodChildrenContext")),PaymentMethodContext_1=tslib_1.__importDefault(require("../../context/PaymentMethodContext")),PaymentSourceContext_1=tslib_1.__importDefault(require("../../context/PaymentSourceContext")),PaymentMethodReducer_1=require("../../reducers/PaymentMethodReducer"),getCardDetails_1=tslib_1.__importDefault(require("../../utils/getCardDetails")),isEmpty_1=tslib_1.__importDefault(require("lodash/isEmpty")),react_1=tslib_1.__importDefault(require("react")),PaymentCardsTemplate_1=tslib_1.__importDefault(require("../utils/PaymentCardsTemplate"));function StripeGateway(props){var _a;const{readonly,showCard,handleEditClick,children,templateCustomerCards,show,loading,loaderComponent,templateCustomerSaveToWallet}=props,p=tslib_1.__rest(props,["readonly","showCard","handleEditClick","children","templateCustomerCards","show","loading","loaderComponent","templateCustomerSaveToWallet"]),{order}=react_1.default.useContext(OrderContext_1.default),{payment,expressPayments}=react_1.default.useContext(PaymentMethodChildrenContext_1.default),{payments,isGuest}=react_1.default.useContext(CustomerContext_1.default),{currentPaymentMethodId,config,paymentSource}=react_1.default.useContext(PaymentMethodContext_1.default),paymentResource="stripe_payments",locale=order?.language_code;if(!readonly&&payment?.id!==currentPaymentMethodId)return null;const publishableKey=paymentSource?.publishable_key,clientSecret=paymentSource?.client_secret,paymentSourceId=((_a=order?.payment_source)===null||_a===void 0?void 0:_a.id)||paymentSource?.id,stripeConfig=config?(0,PaymentMethodReducer_1.getPaymentConfig)(paymentResource,config).stripePayment:{};console.log("stripeConfig",stripeConfig);const customerPayments=!(0,isEmpty_1.default)(payments)&&payments?payments.filter(customerPayment=>{var _a2;return((_a2=customerPayment.payment_source)===null||_a2===void 0?void 0:_a2.type)===paymentResource}):[];if(readonly||showCard){const card=(0,getCardDetails_1.default)({customerPayment:{payment_source:paymentSource},paymentType:paymentResource}),value=Object.assign(Object.assign({},card),{showCard,handleEditClick,readonly});return(0,isEmpty_1.default)(card)?null:(0,jsx_runtime_1.jsx)(PaymentSourceContext_1.default.Provider,{value,children})}return!isGuest&&templateCustomerCards?(0,jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment,{children:[(0,isEmpty_1.default)(customerPayments)?null:(0,jsx_runtime_1.jsx)("div",{className:p.className,children:(0,jsx_runtime_1.jsx)(PaymentCardsTemplate_1.default,{paymentResource,customerPayments,children:templateCustomerCards})}),(0,jsx_runtime_1.jsx)(StripePayment_1.default,Object.assign({show,templateCustomerSaveToWallet,publishableKey,clientSecret,expressPayments,locale},stripeConfig))]}):publishableKey&&!loading&&paymentSourceId?(0,jsx_runtime_1.jsx)(StripePayment_1.default,Object.assign({show,publishableKey,clientSecret,locale,expressPayments},stripeConfig)):loaderComponent}exports.StripeGateway=StripeGateway,exports.default=StripeGateway;