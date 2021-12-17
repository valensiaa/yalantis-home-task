import style from "./ProductCard.module.css";
import productImg from "../../assets/default-product.png";
import { Link } from "react-router-dom";

const ProductCard = ({ product, changeDate, addToCart }) => {

  return <div key={product.id} className={style.productItem}>
            <div className={style.productImg}>
              <Link to={"/products/" + product.id}>
                <img src={productImg} alt="product" />
              </Link>
            </div>
            <Link className={style.productImgTitle} to={"/products/" + product.id}>
              <h4>{product.name}</h4>
            </Link>
            <div className={style.productOrigin}>
              <span>{product.origin}</span> - {changeDate(product.createdAt)}
            </div>
            <div className={style.productPrice}>{product.price}$</div>
            <button className={style.productAddToCart} onClick={() => addToCart(product)}>
              add to cart
            </button>
          </div>
};

export default ProductCard;
