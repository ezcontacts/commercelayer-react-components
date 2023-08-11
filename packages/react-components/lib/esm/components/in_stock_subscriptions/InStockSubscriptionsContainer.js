import{jsx as _jsx}from"react/jsx-runtime";import CommerceLayerContext from"../../context/CommerceLayerContext";import InStockSubscriptionContext from"../../context/InStockSubscriptionContext";import inStockSubscriptionReducer,{inStockSubscriptionInitialState,setInStockSubscription}from"../../reducers/InStockSubscriptionReducer";import useCustomContext from"../../utils/hooks/useCustomContext";import{useReducer}from"react";export function InStockSubscriptionsContainer({children}){const config=useCustomContext({context:CommerceLayerContext,contextComponentName:"CommerceLayer",currentComponentName:"InStockSubscriptionsContainer",key:"accessToken"}),[state,dispatch]=useReducer(inStockSubscriptionReducer,inStockSubscriptionInitialState),value={...state,setInStockSubscription:async({customerEmail,skuCode})=>await setInStockSubscription({customerEmail,skuCode,config,dispatch})};return _jsx(InStockSubscriptionContext.Provider,{value,children})}export default InStockSubscriptionsContainer;