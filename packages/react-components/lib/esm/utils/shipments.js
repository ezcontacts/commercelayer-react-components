import compact from"lodash/compact";import isEmpty from"lodash/isEmpty";export function shipmentsFilled(shipments){const filled=compact(shipments.filter(shipment=>!isEmpty(shipment.shipping_method)));return!isEmpty(filled)}export function isDoNotShip(lineItems){const itemDoNotShip=[],items=lineItems?lineItems.filter(({item_type})=>item_type==="skus").map(lineItem=>(lineItem.item&&lineItem?.item?.do_not_ship&&itemDoNotShip.push(!0),lineItem)):[];return itemDoNotShip.length>0&&itemDoNotShip.length===items.length}