import{createContext}from"react";import{setShipmentErrors}from"../reducers/ShipmentReducer";export const defaultShipmentContext={setShipmentErrors};const ShipmentContext=createContext(defaultShipmentContext);export default ShipmentContext;