import { take, put, call, fork, select, takeEvery, all } from 'redux-saga/effects'
import * as actions from '../actions'
import { getCart } from '../reducers'
import { api } from '../services'

export function* getAllProducts() {
  const products = yield call(api.getProducts)
  yield put(actions.receiveProducts(products))
}

export function* checkout() {
  try {
    const cart = yield select(getCart)
    yield call(api.buyProducts, cart)
    yield put(actions.checkoutSuccess(cart))
  } catch (error) {
    yield put(actions.checkoutFailure(error))
  }
}

export function* watchGetProducts() {
  
  yield takeEvery(actions.GET_ALL_PRODUCTS, getAllProducts)
}

export function* watchCheckout() {
  while (true) {
    yield take(actions.CHECKOUT_REQUEST)
    
    yield call(checkout)
  }
}

export default function* root() {
  yield all([fork(getAllProducts), fork(watchGetProducts), fork(watchCheckout)])
}