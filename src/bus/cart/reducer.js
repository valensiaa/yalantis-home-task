import {createSlice} from '@reduxjs/toolkit'
// import { normalize, schema } from 'normalizr'

// const countEntity = new schema.Entity('count')
// const productEntity = new schema.Entity('products', {
//    count: countEntity
// })



export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartProducts: []  
  },
  reducers: {
    addToCart: (state, action) => {
      action.payload = {...action.payload, quantity: 1}
      state.cartProducts = [...state.cartProducts, action.payload]
    },
    setCurrentCountForId: (state, action) => {
      state.cartProducts = state.cartProducts.map(item => {
        if(item.id === action.payload.id){
          item.quantity = action.payload.count;
        }
        return item;
      })
    },
    removeFromCart:(state, action) => {
      state.cartProducts = state.cartProducts.filter(obj => obj.id !== action.payload)
    }
  }
})

export const {addToCart, setCurrentCountForId, removeFromCart} = cartSlice.actions
export default cartSlice.reducer

