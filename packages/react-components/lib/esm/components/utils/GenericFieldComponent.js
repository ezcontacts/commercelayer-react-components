import{jsx as _jsx}from"react/jsx-runtime";import Parent from"./Parent";import{useContext}from"react";import{defaultImgUrl}from"../../utils/placeholderImages";export default function GenericFieldComponent(props){const{children,tagElement,attribute,context,resource,...p}=props,resourceContext=useContext(context);let attributeValue="";const keysContext=Object.keys(resourceContext).filter(key=>key===resource);if(keysContext.length===1){const[keyResource]=keysContext;keyResource&&attribute&&(attributeValue=resourceContext[keyResource][attribute])}const Tag=tagElement||"span";if(Tag==="img"&&!children)return _jsx("img",{alt:"",src:attributeValue||defaultImgUrl,...p});const parentProps={attributeValue,tagElement,...p};return children?_jsx(Parent,{...parentProps,children}):_jsx(Tag,{"data-testid":attributeValue,...p,children:attributeValue},attributeValue)}