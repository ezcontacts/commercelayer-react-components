import{jsx as _jsx}from"react/jsx-runtime";import{useContext,useEffect,useReducer,useMemo}from"react";import customerReducer,{customerInitialState,getCustomerAddresses,getCustomerOrders,getCustomerPaymentSources,setCustomerEmail,setCustomerErrors,deleteCustomerAddress,createCustomerAddress,saveCustomerUser,getCustomerPayments,getCustomerSubscriptions}from"../../reducers/CustomerReducer";import OrderContext from"../../context/OrderContext";import CommerceLayerContext from"../../context/CommerceLayerContext";import CustomerContext from"../../context/CustomerContext";export function CustomerContainer(props){const{children,isGuest=!1}=props,[state,dispatch]=useReducer(customerReducer,customerInitialState),{order,addResourceToInclude,include,updateOrder,includeLoaded,withoutIncludes}=useContext(OrderContext),config=useContext(CommerceLayerContext);useEffect(()=>{!include?.includes("available_customer_payment_sources.payment_source")&&!isGuest?addResourceToInclude({newResource:"available_customer_payment_sources.payment_source"}):!includeLoaded?.["available_customer_payment_sources.payment_source"]&&!isGuest&&addResourceToInclude({newResourceLoaded:{"available_customer_payment_sources.payment_source":!0}})},[include?.length,Object.keys(includeLoaded??{}).length]),useEffect(()=>{if(config.accessToken&&state.addresses==null&&!isGuest&&getCustomerAddresses({config,dispatch,isOrderAvailable:withoutIncludes!=null}),order?.available_customer_payment_sources&&!isGuest&&getCustomerPaymentSources({dispatch,order}),config.accessToken&&order==null&&include==null&&includeLoaded==null&&!isGuest){async function getCustomerData(){await getCustomerOrders({config,dispatch}),await getCustomerSubscriptions({config,dispatch}),await getCustomerPayments({config,dispatch})}getCustomerData()}},[config.accessToken,order,isGuest]);const contextValue=useMemo(()=>({isGuest,...state,saveCustomerUser:async customerEmail=>{await saveCustomerUser({config,customerEmail,dispatch,updateOrder,order})},setCustomerErrors:errors=>{setCustomerErrors(errors,dispatch)},setCustomerEmail:customerEmail=>{setCustomerEmail(customerEmail,dispatch)},getCustomerPaymentSources:()=>{getCustomerPaymentSources({dispatch,order})},deleteCustomerAddress:async({customerAddressId})=>{await deleteCustomerAddress({customerAddressId,dispatch,config,addresses:state.addresses})},createCustomerAddress:async address=>{await createCustomerAddress({address,config,dispatch,state})},getCustomerOrders:async({pageNumber,pageSize})=>{await getCustomerOrders({config,dispatch,pageNumber,pageSize})}}),[state,isGuest]);return _jsx(CustomerContext.Provider,{value:contextValue,children})}export default CustomerContainer;