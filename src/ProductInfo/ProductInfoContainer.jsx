import { useEffect, useState, useContext } from 'react'
import ProductInfo from './ProductInfo'
import * as axios from 'axios'
import {Store} from './../context/createContext'
import { useParams } from 'react-router'
import {changeDate} from './actions'
import { addToCart} from "../context/products-reducer";

const ProductInfoContainer = () => {
  const {dispatch} = useContext(Store);
 
  const [data, setData] = useState({})
   let { productId } = useParams()
  useEffect(() => {
    const fetchData = async() => {
      const result = await axios(
         `https://yalantis-react-school-api.yalantis.com/api/v1/products/${productId}`
      )
      setData(result.data)
    }
      fetchData()
    }, [])

    return (
        <ProductInfo productInfo = {data}
                    changeDate={changeDate}
                    addToCart={addToCart}
                    dispatch={dispatch}
        />
    )
}

export default ProductInfoContainer