"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.defaultPlaceOrderContext=void 0;const react_1=require("react"),PlaceOrderReducer_1=require("../reducers/PlaceOrderReducer");exports.defaultPlaceOrderContext={setPlaceOrderErrors:PlaceOrderReducer_1.setPlaceOrderErrors};const PlaceOrderContext=(0,react_1.createContext)(exports.defaultPlaceOrderContext);exports.default=PlaceOrderContext;