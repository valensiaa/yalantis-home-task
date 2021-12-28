import {fetchOrigin, fetchData} from '../../services/api'
import {setProducts, setOrigins} from './reducer'

export const fetchOriginThunk = (dispatch) => {
   fetchData().then((data) => dispatch(setProducts(data.items)));
   fetchOrigin().then((data) => dispatch(setOrigins(data.items)));
}