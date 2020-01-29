import _ from 'lodash'
import { SkuCollection } from '@commercelayer/js-sdk'

const getPrices = (prices: SkuCollection[]): object => {
  const obj = {}
  prices.map(sku => {
    const price = _.first(sku.prices().toArray())
    obj[sku.code] = price
  })
  return obj
}

export default getPrices
