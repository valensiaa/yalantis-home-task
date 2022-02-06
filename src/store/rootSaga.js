import { all } from "@redux-saga/core/effects";
import { getOrdersWatcher, postOrderWatcher } from "../bus/cart/saga";
export default function* rootSaga() {
   yield all([postOrderWatcher(), getOrdersWatcher()])
}
