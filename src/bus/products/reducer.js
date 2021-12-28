import {createSlice} from '@reduxjs/toolkit'


export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    origins: []
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
    },
    setOrigins: (state, action) => {
      state.origins = action.payload.map(o => ({
        value: o.value,
        label: o.displayName
      }))
    }
  }
})

export const {setProducts, setOrigins} = productsSlice.actions
export default productsSlice.reducer

