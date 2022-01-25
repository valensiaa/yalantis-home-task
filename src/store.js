import {configureStore} from '@reduxjs/toolkit'
import productsReducer from './bus/products/reducer'
import productInfoReducer from './bus/productInfo/reducer'
import cartReducer from './bus/cart/reducer'
import myAccountReducer from './bus/myAccount/reducer'
import originsReducer from './bus/origins/reducer'


export default configureStore({
   reducer: {
      products: productsReducer,
      productInfo: productInfoReducer,
      cart: cartReducer,
      myAccount: myAccountReducer,
      origins: originsReducer
   }
})