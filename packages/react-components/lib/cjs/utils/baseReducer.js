"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const baseReducer=(state,action,actionTypes)=>{if(actionTypes.includes(action.type)){const data=action.payload;state=Object.assign(Object.assign({},state),data)}return state};exports.default=baseReducer;