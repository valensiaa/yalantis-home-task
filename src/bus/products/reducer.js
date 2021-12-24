import {createSlice} from '@reduxjs/toolkit'


export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    cartProducts: []  
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
    },
    addToCart: (state, action) => {
      state.cartProducts = [...state.cartProducts, action.payload]
    }
  }
})

export const {setProducts, addToCart} = productsSlice.actions
export default productsSlice.reducer





// export const initialState = {
//   products: [],
//   cartProducts: [],
// };

// export const setProducts = (products) => ({
//   type: SET_PRODUCTS,
//   products,
// });
// export const addToCart = (product) => ({
//   type: ADD_TO_CART,
//   product,
// });

// export const reducer = (state, action) => {
//   switch (action.type) {
//     case SET_PRODUCTS: {
//       return {
//         ...state,
//         products: action.products,
//       };
//     }
//     case ADD_TO_CART: {
//       return {
//         ...state,
//         cartProducts: [...state.cartProducts, action.product],
//       };
//     }
//     default:
//       return state;
//   }
// };
