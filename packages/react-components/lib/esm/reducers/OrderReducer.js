import{setCustomerOrderParam}from"../utils/localStorage";import baseReducer from"../utils/baseReducer";import isEmpty from"lodash/isEmpty";import getSdk from"../utils/getSdk";import getErrors,{setErrors}from"../utils/getErrors";import getOrganizationSlug from"../utils/organization";const actionType=["setLoading","setOrderId","setOrder","setSingleQuantity","setCurrentSkuCodes","setCurrentSkuPrices","setErrors","setCurrentItem","setSaveAddressToCustomerAddressBook","setIncludesResource"];export const createOrder=async params=>{if(params){const{persistKey,state,dispatch,config,orderMetadata:metadata,orderAttributes={},setLocalOrder}=params;if(state?.orderId)return state.orderId;const sdk=getSdk(config);try{const o=await sdk?.orders.create({metadata,...orderAttributes});return dispatch&&dispatch({type:"setOrderId",payload:{orderId:o?.id}}),persistKey&&setLocalOrder&&setLocalOrder(persistKey,o.id),o.id}catch(error){const errors=getErrors({error,resource:"orders"});console.error("Create order",errors),dispatch&&setErrors({currentErrors:state?.errors,newErrors:errors,dispatch})}}return""},getApiOrder=async params=>{const{id,dispatch,config,clearWhenPlaced,persistKey,deleteLocalOrder,state}=params,sdk=getSdk(config);try{const options={};state?.include&&state.include.length>0&&(options.include=state.include);const order=await sdk.orders.retrieve(id,options);return clearWhenPlaced&&order.editable===!1?(persistKey&&deleteLocalOrder&&deleteLocalOrder(persistKey),dispatch&&dispatch({type:"setOrder",payload:{order:void 0,orderId:""}})):dispatch&&dispatch({type:"setOrder",payload:{order,orderId:order.id}}),order}catch(error){const errors=getErrors({error,resource:"orders"});console.error("Retrieve order",errors),dispatch&&setErrors({currentErrors:state?.errors,newErrors:errors,dispatch});return}};export async function updateOrder({id,attributes,dispatch,config,include,state}){const sdk=getSdk(config);try{const resource={...attributes,id};await sdk.orders.update(resource,{include});const order=await getApiOrder({id,config,dispatch,state});return dispatch&&order&&dispatch({type:"setOrder",payload:{order}}),{success:!0,order}}catch(error){const errors=getErrors({error,resource:"orders"});return dispatch&&(setOrderErrors({errors,dispatch}),dispatch({type:"setErrors",payload:{errors}})),{success:!1,error}}}export const setOrder=(order,dispatch)=>{dispatch&&dispatch({type:"setOrder",payload:{order}})};export function addResourceToInclude({resourcesIncluded=[],dispatch,newResource,newResourceLoaded,resourceIncludedLoaded}){const payload={include:void 0,includeLoaded:void 0};if(newResource){const resources=typeof newResource=="string"?[newResource]:newResource;payload.include=[...new Set([...resourcesIncluded,...resources])],resources.forEach(resource=>{const includeLoaded={...payload.includeLoaded,[resource]:!0};payload.includeLoaded=includeLoaded})}else delete payload.include;const payloadIncludeLoaded={...resourceIncludedLoaded,...newResourceLoaded,...payload.includeLoaded&&payload.includeLoaded};payload.includeLoaded=payloadIncludeLoaded,dispatch&&dispatch({type:"setIncludesResource",payload:{...payload,withoutIncludes:!1}})}export async function addToCart(params){const{skuCode,bundleCode,quantity,config,dispatch,lineItem,state,errors=[],buyNowMode,checkoutUrl,lineItemOption}=params;try{if(config){const sdk=getSdk(config),id=await createOrder(params);if(id){const order=sdk.orders.relationship(id),name=lineItem?.name,imageUrl=lineItem?.imageUrl,metadata=lineItem?.metadata,frequency=lineItem?.frequency,externalPrice=lineItem?.externalPrice;if(buyNowMode)if(state?.order?.line_items)await Promise.all(state?.order?.line_items.map(async lineItem2=>{await sdk.line_items.delete(lineItem2.id)}));else{const{line_items:lineItems}=await sdk.orders.retrieve(id,{fields:["line_items"],include:["line_items"]});lineItems&&lineItems?.length>0&&await Promise.all(lineItems.map(async lineItem2=>{await sdk.line_items.delete(lineItem2.id)}))}const attrs={order,sku_code:skuCode,name,image_url:imageUrl,quantity:quantity??1,_update_quantity:!0,bundle_code:bundleCode,metadata,frequency};externalPrice===!0&&(attrs._external_price=externalPrice);const newLineItem=await sdk.line_items.create(attrs);if(lineItemOption!=null){const{skuOptionId,options,quantity:quantity2}=lineItemOption,skuOption=sdk.sku_options.relationship(skuOptionId),lineItemRel=sdk.line_items.relationship(newLineItem.id),lineItemOptionsAttributes={quantity:quantity2??1,options,sku_option:skuOption,line_item:lineItemRel};await sdk.line_item_options.create(lineItemOptionsAttributes),await getApiOrder({id,...params})}else await getApiOrder({id,...params,state});if(!isEmpty(errors)&&dispatch&&dispatch({type:"setErrors",payload:{errors:[]}}),buyNowMode){const{organization}=getOrganizationSlug(config.endpoint??""),params2=`${id}?accessToken=${config.accessToken??""}`,redirectUrl=checkoutUrl?`${checkoutUrl}/${params2}`:`https://${organization}.checkout.commercelayer.app/${params2}`;location.href=redirectUrl}return{success:!0,orderId:id}}}return{success:!1}}catch(error){const errors2=getErrors({error,resource:"orders"});return console.error("Add to cart",errors2),dispatch&&setErrors({currentErrors:state?.errors,newErrors:errors2,dispatch}),{success:!1}}}export const unsetOrderState=dispatch=>{dispatch({type:"setOrderId",payload:{orderId:""}}),dispatch({type:"setOrder",payload:{order:void 0}})};export function setOrderErrors({dispatch,errors=[]}){return dispatch&&dispatch({type:"setErrors",payload:{errors}}),{success:!1}}export const saveAddressToCustomerAddressBook=({type,value,dispatch})=>{const k=`_save_${type}_to_customer_address_book`,v=`${value.toString()}`;setCustomerOrderParam(k,v),dispatch&&dispatch({type:"setSaveAddressToCustomerAddressBook",payload:{[k]:v}})};export async function setGiftCardOrCouponCode({code,codeType,dispatch,config,order,include,state}){try{if(config&&order&&code&&dispatch){const attributes={[codeType]:code},{success,order:currentOrder,error}=await updateOrder({id:order.id,attributes,config,include,dispatch,state});if(!success)throw error;return dispatch({type:"setErrors",payload:{errors:[]}}),{success,order:currentOrder}}return{success:!1}}catch(error){const errors=getErrors({error,resource:"orders",field:codeType});return dispatch&&setOrderErrors({errors,dispatch}),{success:!1}}}export async function removeGiftCardOrCouponCode({codeType,dispatch,config,order,include,state}){try{if(config&&order&&dispatch){const attributes={[codeType]:""},orderUpdated=await updateOrder({id:order.id,attributes,config,include,dispatch,state});return dispatch({type:"setErrors",payload:{errors:[]}}),{success:!0,order:orderUpdated?.order}}return{success:!1}}catch(error){const errors=getErrors({error,resource:"orders",field:codeType});return console.error("Remove gift card o coupon code",errors),dispatch&&setOrderErrors({errors,dispatch}),{success:!1}}}export const orderInitialState={loading:!0,orderId:"",order:void 0,errors:[],include:void 0,withoutIncludes:!0};const orderReducer=(state,reducer)=>baseReducer(state,reducer,actionType);export default orderReducer;