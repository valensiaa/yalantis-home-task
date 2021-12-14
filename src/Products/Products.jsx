import style from './Products.module.css'
import productImg from './../assets/default-product.png'
import { Link} from 'react-router-dom';

const Products = (props) => {

    return ( <>
      <div className={style.productsBlock}>
        <h1>Products</h1>
        <div className={style.productsItems}>
          {props.products.map((p) => (
          <div key={p.id} className={style.productItem}>
            <div className={style.productImg}>
              <Link to={'/products/' + p.id}>
                <img src={productImg} alt="product" />
              </Link>
            </div>
            <Link className={style.productImgTitle} to={'/products/' + p.id}>
              <h4 >
                {p.name}
              </h4>
            </Link>
            <div className={style.productOrigin}>
              <span>{p.origin}</span> - {props.changeDate(p.createdAt)}
            </div>
            <div className={style.productPrice}>{p.price}$</div>
            <button 
              className={style.productAddToCart} 
              onClick={()=> props.dispatch(props.addToCart(p))}>add to cart
            </button>
          </div>
        ))}
        </div>
        
      </div>
      </>
    );
}

export default Products