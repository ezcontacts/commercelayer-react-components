"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const react_1=require("react"),localStorage_1=require("../utils/localStorage"),initial={persistKey:"",clearWhenPlaced:!0,getLocalOrder:localStorage_1.getLocalOrder,setLocalOrder:localStorage_1.setLocalOrder,deleteLocalOrder:localStorage_1.deleteLocalOrder},OrderStorageContext=(0,react_1.createContext)(initial);exports.default=OrderStorageContext;