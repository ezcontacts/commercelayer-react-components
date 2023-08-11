import{jsx as _jsx}from"react/jsx-runtime";import{useContext,useEffect,useState}from"react";import BaseInput from"../utils/BaseInput";import{useRapidForm}from"rapid-form";import CustomerContext from"../../context/CustomerContext";export function CustomerInput(props){const{name="customer_email",placeholder="",required=!0,saveOnBlur=!1,type="email",value,onBlur,className,errorClassName,...p}=props,{validation,values,errors}=useRapidForm({fieldEvent:"blur"}),{saveCustomerUser,setCustomerErrors,setCustomerEmail}=useContext(CustomerContext),[hasError,setHasError]=useState(!1),handleOnBlur=async()=>{saveOnBlur&&Object.keys(errors).length===0&&Object.keys(values).length>0&&saveCustomerUser!=null&&(await saveCustomerUser(values[name].value),onBlur&&onBlur(values[name].value))};useEffect(()=>{if(Object.keys(errors).length>0){const formErrors=[];for(const fieldName in errors){const code=errors[fieldName]?.code,message=errors[fieldName]?.message;formErrors.push({code,message:message||"",resource:"orders",field:fieldName})}formErrors.length>0&&(setHasError(!0),setCustomerErrors&&setCustomerErrors(formErrors))}else Object.keys(values).length>0&&(setCustomerErrors&&setCustomerErrors([]),setCustomerEmail&&setCustomerEmail(values[name].value),setHasError(!1));return()=>{setHasError(!1)}},[errors]);const classNameComputed=`${className??""} ${hasError&&errorClassName?errorClassName:""}`;return _jsx(BaseInput,{name,type,ref:validation,required,placeholder,defaultValue:value,onBlur:()=>{handleOnBlur()},className:classNameComputed,...p})}export default CustomerInput;