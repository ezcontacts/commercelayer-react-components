import{jsx as _jsx}from"react/jsx-runtime";import LineItemChildrenContext from"../../context/LineItemChildrenContext";import GenericFieldComponent from"../utils/GenericFieldComponent";export function LineItemField(props){const{attribute,tagElement="span",children,...p}=props;return _jsx(GenericFieldComponent,{resource:"lineItem",attribute,tagElement,context:LineItemChildrenContext,...p,children})}export default LineItemField;