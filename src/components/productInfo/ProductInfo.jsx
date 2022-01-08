import style from "./ProductInfo.module.css";
import productImg from "./../../assets/default-product.png";

const ProductInfo = ({ addToCart, changeDate, productInfo, isInArray }) => {
  console.log(isInArray)

  return (
    <div className={style.productInfoBlock}>
      <div className={style.productInfoDesc}>
        <div className={style.productInfoTitle}>
          <h1>{productInfo.name}</h1>
        </div>
        <div className={style.productInfoCreated}>
          <p>
            Product have published{" "}
            <span>{changeDate(productInfo.createdAt)}</span>
          </p>
        </div>
        <div className={style.productInfoImg}>
          <img src={productImg} alt="product" />
        </div>
      </div>
      <div className={style.productInfoSidebar}>
        <div className={style.productInfoOrigin}>
          <p>
            Origin: <span>{productInfo.origin}</span>
          </p>
          <div className={style.productInfoPrice}>
            Price: {productInfo.price}$
          </div>
        </div>
        <button disabled={isInArray} className={style.productInfoAddToCart} onClick={addToCart}>
          {isInArray ? 'product added' : 'add to cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
