import {createSlice} from '@reduxjs/toolkit'

export const productInfoSlice = createSlice({
  name: 'productInfo',
  initialState: {
    product: {}  
  },
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload
    }
  }
})

export const {setProduct} = productInfoSlice.actions
export default productInfoSlice.reducer
