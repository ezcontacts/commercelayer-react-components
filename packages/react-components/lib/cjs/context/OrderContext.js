"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.defaultOrderContext=void 0;const tslib_1=require("tslib"),react_1=require("react"),OrderReducer_1=require("../reducers/OrderReducer");exports.defaultOrderContext={createOrder:OrderReducer_1.createOrder,setOrderErrors:()=>{},setOrder:()=>{},setGiftCardOrCouponCode:OrderReducer_1.setGiftCardOrCouponCode,removeGiftCardOrCouponCode:OrderReducer_1.removeGiftCardOrCouponCode,saveAddressToCustomerAddressBook:OrderReducer_1.saveAddressToCustomerAddressBook,addResourceToInclude:OrderReducer_1.addResourceToInclude,getOrder:()=>tslib_1.__awaiter(void 0,void 0,void 0,function*(){}),updateOrder:OrderReducer_1.updateOrder};const OrderContext=(0,react_1.createContext)(exports.defaultOrderContext);exports.default=OrderContext;