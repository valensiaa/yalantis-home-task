export const SET_PRODUCTS = "SET_PRODUCTS";
export const ADD_TO_CART = "ADD_TO_CART";

export const initialState = {
  products: [],
  cartProducts: [],
};

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
});
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  product,
});

export const productsReducer = (state, action) => {
  switch (action.type) {
    case SET_PRODUCTS: {
      return {
        ...state,
        products: action.products,
      };
    }
    case ADD_TO_CART: {
      return {
        ...state,
        cartProducts: [...state.cartProducts, action.product],
      };
    }
    default:
      return state;
  }
};
