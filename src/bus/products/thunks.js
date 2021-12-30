import {fetchOrigin, fetchData, priceAPI, getProductsPerPage} from '../../services/api'
import {setProducts, setOrigins } from './reducer'

export const fetchOriginThunk = (dispatch) => {
   fetchData().then((data) => dispatch(setProducts(data.items)));
   fetchOrigin().then((data) => dispatch(setOrigins(data.items)));
}

export const fetchProductsThunk = (dispatch, a=null, b=null, c=null) => {
   priceAPI.fetchProducts(a, b, c).then(data => dispatch(setProducts(data.items)))
}

// export const fetchProductsPerPageThunk = (dispatch, value) => {
//    getProductsPerPage(value).then(data => dispatch(setProducts(data.items)))
// }