import * as yup from 'yup'
import { ProductForm } from '../../Products/Products'

export const ProductSchema = yup.object().shape({
    name: yup.string().required().label('Name'),
    qty: yup.number().required().label('Qty'),
    price: yup.number().required().label('Price'),
    categoryID: yup.string().required().label('Category'),
    productSKU: yup.string().required().label('Product SKU'),
  })
  
  export const initialProductFormdata: ProductForm = {
    action: 'Add',
    id: '',
    name: '',
    notes: '',
    qty: 0,
    price: 0,
    categoryID: '',
    productSKU: '',
    fileName: '',
    fileData: '',
    variantOptionID: '',
    isSelected: '',
    productVariantOptionID: '',
  }