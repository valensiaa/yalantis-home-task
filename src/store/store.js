import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "../bus/products/reducer";
import productInfoReducer from "../bus/productInfo/reducer";
import cartReducer from "../bus/cart/reducer";
import myAccountReducer from "../bus/myAccount/reducer";
import originsReducer from "../bus/origins/reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  products: productsReducer,
  productInfo: productInfoReducer,
  cart: cartReducer,
  myAccount: myAccountReducer,
  origins: originsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export default store;
