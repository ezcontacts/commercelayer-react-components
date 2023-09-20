"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.isDoNotShip=exports.shipmentsFilled=void 0;const tslib_1=require("tslib"),compact_1=tslib_1.__importDefault(require("lodash/compact")),isEmpty_1=tslib_1.__importDefault(require("lodash/isEmpty"));function shipmentsFilled(shipments){const filled=(0,compact_1.default)(shipments.filter(shipment=>!(0,isEmpty_1.default)(shipment.shipping_method)));return!(0,isEmpty_1.default)(filled)}exports.shipmentsFilled=shipmentsFilled;function isDoNotShip(lineItems){const itemDoNotShip=[],items=lineItems?lineItems.filter(({item_type})=>item_type==="skus").map(lineItem=>{var _a;return lineItem.item&&(!((_a=lineItem?.item)===null||_a===void 0)&&_a.do_not_ship)&&itemDoNotShip.push(!0),lineItem}):[];return itemDoNotShip.length>0&&itemDoNotShip.length===items.length}exports.isDoNotShip=isDoNotShip;