import { call, put, takeEvery } from "@redux-saga/core/effects";
import { checkoutOrder, fetchOrders } from "../../services/api";
import { checkoutActions, getOrdersActions } from "./constants";

const createCheckoutRequestWorker = (actions) => {
  return function* worker({ payload }) {
    const { start, success, error } = actions;
    yield put(start());

    try {
      const response = yield call(checkoutOrder, payload.body);
      const { id } = response.data;

      yield put(
        success(
          { stringRedirect: {url: `/orders`, orderId: id }})
      );
    } catch (e) {
      yield put(error(e));
    }
  };
};
const createGetOrdersWorker = (actions) => {
  return function* worker() {
    const { success, start, error } = actions;
    yield put(start());

    try {
      const dataOrders = yield call(fetchOrders);
      const items = dataOrders.data.items;
      yield put(success(items));
    } catch (e) {
      yield put(error(e));
    }
  };
};

const createCheckoutRequestWatcher = (actions) => {
  const { init } = actions;
  return function* watcher() {
    yield takeEvery(init, createCheckoutRequestWorker(actions));
  };
};

const createGetOrdersWatcher = (actions) => {
  const { init } = actions;
  return function* watcher() {
    yield takeEvery(init, createGetOrdersWorker(actions));
  };
};

export const postOrderWatcher = createCheckoutRequestWatcher(checkoutActions);
export const getOrdersWatcher = createGetOrdersWatcher(getOrdersActions);
