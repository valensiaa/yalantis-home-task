import style from './Products.module.css'
import productImg from './../assets/default-product.png'
import { Link, useHistory} from 'react-router-dom';
//import ProductInfo from './../ProductInfo/ProductInfo';



const Products = (props) => {
    console.log(props.products)

        const history = useHistory();     
        function handleClick() {
            console.log('hundle')
          history.push("/products/productId");
        }

    return (
      <div className={style.productsBlock}>
        {props.products.map((p) => (
          <div key={p.id} className={style.productItem}>
            <div className={style.productImg} onClick={handleClick}>
              <img src={productImg} alt="product" />
            </div>
            <h4 onClick={handleClick}>
                {p.name}
            </h4>
            <div className={style.productOrigin}>
              <span>{p.origin}</span> - Today 06:15
            </div>
            <div className={style.productPrice}>{p.price}$</div>
            <Link className={style.productAddToCart} to='#'>               
                   add to cart
            </Link>
          </div>
        ))}
        {/* <Switch>
            <Route path={`${path}/productId`} element={<ProductInfo />}>
            </Route>
        </Switch> */}
      </div>
    );
}

export default Products