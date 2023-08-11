import{jsx as _jsx}from"react/jsx-runtime";import{useContext}from"react";import LineItemChildrenContext from"../../context/LineItemChildrenContext";import LineItemContext from"../../context/LineItemContext";import Parent from"../utils/Parent";export function LineItemQuantity(props){const{max=50,readonly=!1,...p}=props,{lineItem}=useContext(LineItemChildrenContext),{updateLineItem}=useContext(LineItemContext),options=[];for(let i=1;i<=max;i++)options.push(_jsx("option",{value:`${i}`,children:i},i));const handleChange=e=>{const quantity2=Number(e.target.value);updateLineItem&&lineItem&&updateLineItem(lineItem.id,quantity2)},quantity=lineItem?.quantity,parentProps={handleChange,quantity,...props};return props.children?_jsx(Parent,{...parentProps,children:props.children}):readonly?_jsx("span",{...p,children:quantity}):_jsx("select",{"data-testid":lineItem?.sku_code,title:lineItem?.name??"",value:quantity,onChange:handleChange,...p,children:options})}export default LineItemQuantity;