import{jsx as _jsx}from"react/jsx-runtime";import{useContext}from"react";import LineItemChildrenContext from"../../context/LineItemChildrenContext";import Parent from"../utils/Parent";export function LineItemCode({type="sku_code",children,...p}){const{lineItem}=useContext(LineItemChildrenContext),labelName=lineItem?.[type],parentProps={lineItem,skuCode:labelName,...p};return children?_jsx(Parent,{...parentProps,children}):_jsx("p",{...p,children:labelName})}export default LineItemCode;