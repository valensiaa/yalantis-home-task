import { useEffect } from 'react'
import {getUsers} from './actions'
import Products from './Products'

const ProductsContainer = () => {

  let productsList = []

  useEffect(() => {
    if(productsList.length === 0) {
      getUsers().then((data) => {
        data.items.forEach((p) => {
          productsList.push(p);
        })
        console.log(productsList)
      })
    }

  })

    return (
        <Products products = {productsList}/>
    )
}

export default ProductsContainer