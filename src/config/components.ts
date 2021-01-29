import PropTypes from 'prop-types'
import childrenTypes from '#utils/childrenTypes'
import {
  TimeFormat,
  BaseInputType,
  GiftCardInputName,
  baseOrderComponentPricePropTypes,
  LineItemType,
  BasePriceType,
  BaseFormatPrice,
  PTLoader,
  BMObject,
  BaseSelectorType,
  AddressInputName,
  AddressCountrySelectName,
} from '#typings'
import { ErrorPropTypes } from '#typings/errors'
import { BaseInputComponentPropTypes } from '#typings/index'

const components = {
  Address: {
    permittedChildren: ['AddressField', 'ReactNode'],
    displayName: 'Address',
    propTypes: {
      children: childrenTypes.isRequired,
    },
  },
  AddressCountrySelector: {
    displayName: 'AddressCountrySelector',
    propTypes: {
      children: PropTypes.func,
      placeholder: PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
      }),
      value: PropTypes.string,
      name: PropTypes.oneOf<AddressCountrySelectName>([
        'billing_address_country_code',
        'shipping_address_country_code',
      ]).isRequired,
      required: PropTypes.bool,
    },
    defaultProps: {
      required: true,
    },
  },
  AddressField: {
    displayName: 'AddressField',
    propTypes: {
      children: PropTypes.func,
    },
  },
  AddressInput: {
    displayName: 'AddressInput',
    propTypes: {
      children: PropTypes.func,
      name: PropTypes.oneOf<AddressInputName>([
        'billing_address_city',
        'billing_address_company',
        'billing_address_email',
        'billing_address_first_name',
        'billing_address_last_name',
        'billing_address_line_1',
        'billing_address_line_2',
        'billing_address_phone',
        'billing_address_state_code',
        'billing_address_zip_code',
        'billing_address_save_to_customer_book',
        'shipping_address_city',
        'shipping_address_company',
        'shipping_address_email',
        'shipping_address_first_name',
        'shipping_address_last_name',
        'shipping_address_line_1',
        'shipping_address_line_2',
        'shipping_address_phone',
        'shipping_address_state_code',
        'shipping_address_zip_code',
        'shipping_address_save_to_customer_book',
      ]).isRequired,
      type: PropTypes.oneOf<BaseInputType>([
        'checkbox',
        'date',
        'email',
        'number',
        'tel',
        'text',
        'textarea',
      ]).isRequired,
      placeholder: PropTypes.string,
      disabled: PropTypes.bool,
      required: PropTypes.bool,
    },
    defaultProps: {
      required: true,
    },
  },
  AddToCartButton: {
    displayName: 'AddToCartButton',
    propTypes: {
      children: PropTypes.func,
      label: PropTypes.string,
      skuCode: PropTypes.string,
      disabled: PropTypes.bool,
      lineItem: PropTypes.shape({
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
      }),
    },
    defaultProps: {
      label: 'Add to cart',
    },
  },
  AddressesContainer: {
    displayName: 'AddressesContainer',
    permittedChildren: [
      'BillingAddressForm',
      'BillingAddressContainer',
      'ShippingAddressForm',
      'ShippingAddressContainer',
      'SaveAddressesButton',
      'ReactNode',
    ],
    propTypes: {
      children: childrenTypes.isRequired,
      shipToDifferentAddress: PropTypes.bool,
    },
  },
  AvailabilityContainer: {
    displayName: 'AvailabilityContainer',
    permittedChildren: ['AvailabilityTemplate', 'ReactNode'],
    propTypes: {
      children: childrenTypes.isRequired,
      skuCode: PropTypes.string,
    },
  },
  AvailabilityTemplate: {
    displayName: 'AvailabilityTemplate',
    propTypes: {
      timeFormat: PropTypes.oneOf<TimeFormat>(['days', 'hours']),
      showShippingMethodName: PropTypes.bool,
      children: PropTypes.func,
    },
    defaultProps: {
      timeFormat: 'days',
      showShippingMethodName: false,
    },
  },
  BillingAddressContainer: {
    permittedChildren: ['Address', 'ReactNode'],
    propTypes: {
      children: childrenTypes.isRequired,
    },
  },
  BillingAddressForm: {
    permittedChildren: ['AddressInput', 'ReactNode'],
    propTypes: {
      children: childrenTypes.isRequired,
    },
  },
  CheckoutLink: {
    displayName: 'CheckoutLink',
    propTypes: {
      children: PropTypes.func,
      label: PropTypes.string,
    },
    defaultProps: {
      label: 'Checkout',
    },
  },
  CommerceLayer: {
    permittedChildren: [
      'OrderContainer',
      'PricesContainer',
      'GiftCardContainer',
      'ReactNode',
    ],
    propTypes: {
      children: childrenTypes.isRequired,
      accessToken: PropTypes.string.isRequired,
      endpoint: PropTypes.string.isRequired,
    },
  },
  CustomerContainer: {
    displayName: 'CustomerContainer',
    permittedChildren: [
      'CustomerInput',
      'SaveCustomerButton',
      'AddressesContainer',
      'ReactNode',
    ],
    propTypes: {
      children: childrenTypes.isRequired,
      isGuest: PropTypes.bool,
    },
  },
  CustomerInput: {
    displayName: 'CustomerInput',
    propTypes: {
      children: PropTypes.func,
      name: PropTypes.oneOf(['customerEmail']),
      type: PropTypes.oneOf(['email']),
      placeholder: PropTypes.string,
      disabled: PropTypes.bool,
      required: PropTypes.bool,
      saveOnBlur: PropTypes.bool,
    },
    defaultProps: {
      required: true,
    },
  },
  DiscountAmount: {
    displayName: 'DiscountAmount',
    propTypes: baseOrderComponentPricePropTypes,
    defaultProps: {
      format: 'formatted' as BaseFormatPrice,
    },
  },
  Errors: {
    displayName: 'Errors',
    propTypes: ErrorPropTypes,
    defaultProps: {
      messages: [],
      field: 'base',
    },
  },
  ExternalFunction: {
    displayName: 'ExternalFunction',
    permittedChildren: ['AddToCartButton', 'ReactNode'],
    propTypes: {
      children: childrenTypes.isRequired,
      url: PropTypes.string.isRequired,
    },
  },
  GiftCard: {
    permittedChildren: [
      'GiftCardCurrencySelector',
      'GiftCardInput',
      'Errors',
      'MetadataInput',
      'SubmitButton',
      'ReactNode',
    ],
    displayName: 'GiftCard',
    propTypes: {
      children: childrenTypes.isRequired,
      onSubmit: PropTypes.func,
    },
    defaultProps: {
      onSubmit: undefined,
    },
  },
  GiftCardAmount: {
    displayName: 'GiftCardAmount',
    propTypes: baseOrderComponentPricePropTypes,
  },
  GiftCardContainer: {
    permittedChildren: ['GiftCard', 'Errors', 'ReactNode'],
    displayName: 'GiftCardContainer',
    propTypes: {
      children: childrenTypes.isRequired,
    },
  },
  GiftCardCurrencySelector: {
    displayName: 'GiftCardCurrencySelector',
    propTypes: {
      children: PropTypes.func,
      placeholder: PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        label: PropTypes.string.isRequired,
      }),
      value: PropTypes.string,
      required: PropTypes.bool,
    },
    defaultProps: {
      required: true,
    },
  },
  GiftCardInput: {
    displayName: 'GiftCardInput',
    propTypes: {
      type: PropTypes.oneOf<BaseInputType>([
        'text',
        'email',
        'number',
        'date',
        'checkbox',
      ]).isRequired,
      name: PropTypes.oneOf<GiftCardInputName>([
        'balanceCents',
        'balanceMaxCents',
        'singleUse',
        'rechargeable',
        'imageUrl',
        'expiresAt',
        'referenceOrigin',
        'email',
        'firstName',
        'lastName',
        'reference',
      ]).isRequired,
      children: PropTypes.func,
      placeholder: PropTypes.string,
    },
  },
  ItemContainer: {
    permittedChildren: [
      'PricesContainer',
      'VariantsContainer',
      'SkuOptionContainer',
      'QuantitySelector',
      'AddToCartButton',
      'AvailabilityContainer',
      'SkuListsContainer',
      'ReactNode',
    ],
    displayName: 'ItemContainer',
    propTypes: {
      children: childrenTypes.isRequired,
      skuCode: PropTypes.string,
      lineItem: PropTypes.shape({
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
      }),
    },
  },
  LineItem: {
    permittedChildren: [
      'LineItemImage',
      'LineItemName',
      'LineItemOptions',
      'LineItemQuantity',
      'LineItemAmount',
      'LineItemRemoveLink',
      'Errors',
      'ReactNode',
      'StockTransfer',
    ],
    displayName: 'LineItem',
    propTypes: {
      children: childrenTypes.isRequired,
      type: PropTypes.oneOf<LineItemType>([
        'skus',
        'gift_cards',
        'shipments',
        'paymentMethods',
        'promotions',
      ]),
    },
    defaultProps: {
      type: 'skus',
    },
  },
  LineItemAmount: {
    displayName: 'LineItemAmount',
    propTypes: {
      ...baseOrderComponentPricePropTypes,
      type: PropTypes.oneOf<BasePriceType>(['total', 'unit', 'option']),
    },
    defaultProps: {
      format: 'formatted',
      type: 'total',
    },
  },
  LineItemImage: {
    displayName: 'LineItemImage',
    propTypes: {
      width: PropTypes.number,
      children: PropTypes.func,
    },
  },
  LineItemName: {
    displayName: 'LineItemName',
    propTypes: {
      children: PropTypes.func,
    },
  },
  LineItemOption: {
    displayName: 'LineItemOption',
    propTypes: {
      name: PropTypes.string.isRequired,
      children: PropTypes.func,
      valueClassName: PropTypes.string,
      keyClassName: PropTypes.string,
      keyId: PropTypes.string,
      keyStyle: PropTypes.object,
    },
  },
  LineItemOptions: {
    permittedChildren: ['LineItemOption', 'ReactNode'],
    displayName: 'LineItemOptions',
    propTypes: {
      children: childrenTypes.isRequired,
      title: PropTypes.string,
      showName: PropTypes.bool,
      skuOptionId: PropTypes.string.isRequired,
    },
    defaultProps: {
      showName: true,
    },
  },
  LineItemQuantity: {
    displayName: 'LineItemQuantity',
    propTypes: {
      children: PropTypes.func,
      max: PropTypes.number,
      disabled: PropTypes.bool,
      readonly: PropTypes.bool,
    },
    defaultProps: {
      max: 50,
    },
  },
  LineItemRemoveLink: {
    displayName: 'LineItemRemoveLink',
    propTypes: {
      children: PropTypes.func,
      label: PropTypes.string,
    },
    defaultProps: {
      label: 'Remove',
    },
  },
  LineItemsContainer: {
    permittedChildren: ['LineItemsCount', 'LineItem', 'ReactNode'],
    displayName: 'LineItemsContainer',
    propTypes: {
      children: childrenTypes.isRequired,
      filters: PropTypes.object,
      loader: PTLoader,
    },
    defaultProps: {
      filters: {},
      loader: 'Loading...',
    },
  },
  LineItemsCount: {
    displayName: 'LineItemsCount',
    propTypes: {
      children: PropTypes.func,
      id: PropTypes.string,
      className: PropTypes.string,
      name: PropTypes.string,
      style: PropTypes.object,
    },
  },
  MetadataInput: {
    displayName: 'MetadataInput',
    propTypes: BaseInputComponentPropTypes,
  },
  OrderContainer: {
    permittedChildren: [
      'AddressesContainer',
      'CustomerContainer',
      'ItemContainer',
      'LineItemsContainer',
      'SubTotalAmount',
      'DiscountAmount',
      'ShippingAmount',
      'TaxesAmount',
      'GiftCardAmount',
      'TotalAmount',
      'CheckoutLink',
      'GiftCardContainer',
      'ShipmentsContainer',
      'ReactNode',
    ],
    displayName: 'OrderContainer',
    propTypes: {
      children: childrenTypes.isRequired,
      orderId: PropTypes.string,
      metadata: BMObject,
      attributes: PropTypes.object,
    },
    defaultProps: {
      metadata: {},
    },
  },
  OrderStorage: {
    permittedChildren: ['OrderContainer', 'ReactNode'],
    displayName: 'OrderStorage',
    propTypes: {
      children: childrenTypes.isRequired,
      clearWhenPlaced: PropTypes.bool,
      persistKey: PropTypes.string.isRequired,
    },
  },
  Price: {
    displayName: 'Price',
    propTypes: {
      children: PropTypes.func,
      compareClassName: PropTypes.string,
      skuCode: PropTypes.string,
      showCompare: PropTypes.bool,
    },
    defaultProps: {
      skuCode: '',
    },
  },
  PricesContainer: {
    permittedChildren: ['Price', 'ReactNode'],
    displayName: 'PricesContainer',
    propTypes: {
      children: childrenTypes.isRequired,
      skuCode: PropTypes.string,
      loader: PTLoader,
      perPage: PropTypes.number,
      filters: PropTypes.object,
    },
    defaultProps: {
      perPage: 10,
      filters: {},
      loader: 'Loading...',
      skuCode: '',
    },
  },
  QuantitySelector: {
    displayName: 'QuantitySelector',
    propTypes: {
      children: PropTypes.func,
      min: PropTypes.number,
      max: PropTypes.number,
      value: PropTypes.string,
      skuCode: PropTypes.string,
      disabled: PropTypes.bool,
    },
    defaultProps: {
      min: 1,
    },
  },
  SaveAddressesButton: {
    displayName: 'SaveAddressesButton',
    propTypes: {
      children: PropTypes.func,
      label: PropTypes.string,
      onClick: PropTypes.func,
      disabled: PropTypes.bool,
    },
    defaultProps: {
      label: 'Continue to delivery',
    },
  },
  Shipment: {
    permittedChildren: [
      'LineItemsContainer',
      'LineItem',
      'ShippingMethod',
      'ReactNode',
    ],
    displayName: 'Shipment',
    propTypes: {
      children: childrenTypes.isRequired,
    },
  },
  ShipmentsContainer: {
    displayName: 'ShipmentsContainer',
    permittedChildren: ['Shipment', 'ReactNode'],
    propTypes: {
      children: childrenTypes.isRequired,
    },
  },
  ShippingAddressContainer: {
    permittedChildren: ['Address', 'ReactNode'],
    propTypes: {
      children: childrenTypes.isRequired,
    },
  },
  SaveCustomerButton: {
    displayName: 'SaveCustomerButton',
    propTypes: {
      children: PropTypes.func,
      label: PropTypes.string,
      onClick: PropTypes.func,
    },
    defaultProps: {
      label: 'Save',
    },
  },
  ShippingAddressForm: {
    permittedChildren: ['AddressInput', 'ReactNode'],
    propTypes: {
      children: childrenTypes.isRequired,
    },
  },
  ShippingAmount: {
    displayName: 'ShippingAmount',
    propTypes: baseOrderComponentPricePropTypes,
  },
  ShippingMethod: {
    permittedChildren: [
      'ShippingMethodName',
      'ShippingMethodPrice',
      'ShippingMethodRadioButton',
      'ReactNode',
    ],
    displayName: 'ShippingMethod',
    propTypes: {
      children: childrenTypes.isRequired,
    },
  },
  ShippingMethodName: {
    displayName: 'ShippingMethodName',
    propTypes: {
      children: PropTypes.func,
    },
  },
  ShippingMethodRadioButton: {
    displayName: 'ShippingMethodRadioButton',
    propTypes: {
      children: PropTypes.func,
    },
  },
  ShippingMethodPrice: {
    displayName: 'ShippingMethodPrice',
    propTypes: {
      ...baseOrderComponentPricePropTypes,
      type: PropTypes.oneOf<'amount'>(['amount']),
    },
    defaultProps: {
      format: 'formatted',
      type: 'amount',
    },
  },
  SkuList: {
    permittedChildren: ['AddToCartButton', 'QuantitySelector', 'ReactNode'],
    displayName: 'SkuList',
    propTypes: {
      children: childrenTypes.isRequired,
      id: PropTypes.string.isRequired,
    },
  },
  SkuListsContainer: {
    permittedChildren: ['SkuList', 'ReactNode'],
    displayName: 'SkuListsContainer',
    propTypes: {
      children: childrenTypes.isRequired,
    },
  },
  SkuOption: {
    permittedChildren: ['SkuOptionInput', 'ReactNode'],
    displayName: 'SkuOption',
    propTypes: {
      children: childrenTypes.isRequired,
      id: PropTypes.string.isRequired,
    },
  },
  SkuOptionInput: {
    displayName: 'SkuOptionInput',
    propTypes: BaseInputComponentPropTypes,
  },
  SkuOptionsContainer: {
    permittedChildren: ['SkuOption', 'ReactNode'],
    displayName: 'SkuOptionsContainer',
    propTypes: {
      children: childrenTypes.isRequired,
      skuCode: PropTypes.string,
    },
  },
  StockTransfer: {
    permittedChildren: ['StockTransferField', 'ReactNode'],
    displayName: 'StockTransfer',
    propTypes: {
      children: childrenTypes.isRequired,
    },
  },
  StockTransferField: {
    displayName: 'StockTransferField',
    propTypes: {
      children: PropTypes.func,
    },
  },
  SubmitButton: {
    displayName: 'SubmitButton',
    propTypes: {
      children: PropTypes.func,
      label: PropTypes.string,
    },
    defaultProps: {
      label: 'Submit',
    },
  },
  SubTotalAmount: {
    displayName: 'SubTotalAmount',
    propTypes: baseOrderComponentPricePropTypes,
    defaultProps: {
      format: 'formatted' as BaseFormatPrice,
    },
  },
  TaxesAmount: {
    displayName: 'TaxesAmount',
    propTypes: baseOrderComponentPricePropTypes,
    defaultProps: {
      format: 'formatted' as BaseFormatPrice,
    },
  },
  TotalAmount: {
    displayName: 'TotalAmount',
    propTypes: baseOrderComponentPricePropTypes,
    defaultProps: {
      format: 'formatted' as BaseFormatPrice,
    },
  },
  VariantsContainer: {
    permittedChildren: ['VariantSelector', 'ReactNode'],
    displayName: 'VariantsContainer',
    propTypes: {
      children: childrenTypes.isRequired,
      skuCode: PropTypes.string,
      filters: PropTypes.object,
    },
    defaultProps: {
      skuCode: '',
      filters: {},
    },
  },
  VariantSelector: {
    displayName: 'VariantSelector',
    propTypes: {
      options: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          code: PropTypes.string.isRequired,
          lineItem: PropTypes.shape({
            name: PropTypes.string.isRequired,
            imageUrl: PropTypes.string,
          }),
        }).isRequired
      ).isRequired,
      name: PropTypes.string,
      children: PropTypes.func,
      type: PropTypes.oneOf<BaseSelectorType>(['select', 'radio']),
      loader: PropTypes.element,
      placeholder: PropTypes.string,
      skuCode: PropTypes.string,
    },
    defaultProps: {
      placeholder: 'Select a variant',
      type: 'select' as BaseSelectorType,
    },
  },
}

export default components
