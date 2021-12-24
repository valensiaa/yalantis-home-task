import {configureStore} from '@reduxjs/toolkit'
import productsReducer from './bus/products/reducer'
import productInfoReducer from './bus/productInfo/reducer'


export default configureStore({
   reducer: {
      products: productsReducer,
      productInfo: productInfoReducer
   }
})