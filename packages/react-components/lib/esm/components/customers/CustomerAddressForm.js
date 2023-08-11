import{jsx as _jsx}from"react/jsx-runtime";import AddressesContext from"../../context/AddressContext";import{useRapidForm}from"rapid-form";import{useContext,useEffect,useRef}from"react";import CustomerAddressFormContext from"../../context/CustomerAddressFormContext";import OrderContext from"../../context/OrderContext";import isEmptyStates from"../../utils/isEmptyStates";export function CustomerAddressForm(props){const{children,errorClassName,autoComplete="on",reset=!1,...p}=props,{validation,values,errors,reset:resetForm}=useRapidForm(),{setAddressErrors,setAddress}=useContext(AddressesContext),{order}=useContext(OrderContext),ref=useRef(null);useEffect(()=>{if(Object.keys(errors).length>0){const formErrors=[];for(const fieldName in errors){const code=errors[fieldName]?.code,message=errors[fieldName]?.message||"";fieldName==="billing_address_state_code"?values.state_code?delete errors[fieldName]:formErrors.push({code,message,resource:"billing_address",field:fieldName}):formErrors.push({code,message,resource:"billing_address",field:fieldName})}setAddressErrors(formErrors,"billing_address")}else if(Object.keys(values).length>0){setAddressErrors([],"billing_address");for(const name in values){const field=values[name];if(field?.value&&(values[name.replace("billing_address_","")]=field.value,delete values[name]),["billing_address_state_code"].includes(name)){const countryCode=values.billing_address_country_code?.value||values.country_code;!isEmptyStates(countryCode)&&!field.value&&delete values.billing_address_state_code}}setAddress({values,resource:"billing_address"})}reset&&(Object.keys(values).length>0||Object.keys(errors).length>0)&&ref&&(ref.current?.reset(),resetForm({target:ref.current}),setAddressErrors([],"billing_address"),setAddress({values:{},resource:"billing_address"}))},[errors,values,reset]);const providerValues={values,validation,setValue:(name,value)=>{const field={[name.replace("billing_address_","")]:value};setAddress({values:{...values,...field},resource:"billing_address"})},errorClassName,requiresBillingInfo:order?.requires_billing_info||!1,errors,resetField:name=>{resetForm({currentTarget:ref.current},name)}};return _jsx(CustomerAddressFormContext.Provider,{value:providerValues,children:_jsx("form",{ref,autoComplete,...p,children})})}export default CustomerAddressForm;