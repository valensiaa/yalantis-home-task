import {fetchProduct} from '../../services/api'
import {setProduct} from './reducer'


export const fetchProductInfo = (productId,dispatch) => {
   fetchProduct(productId).then((data) => {
      dispatch(setProduct(data.data))
    })
   }