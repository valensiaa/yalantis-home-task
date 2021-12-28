import {configureStore} from '@reduxjs/toolkit'
import productsReducer from './bus/products/reducer'
import productInfoReducer from './bus/productInfo/reducer'
import cartReducer from './bus/cart/reducer'


export default configureStore({
   reducer: {
      products: productsReducer,
      productInfo: productInfoReducer,
      cart: cartReducer
   }
})