import style from "./ProductCard.module.css";

const ProductCardButton = ({
  product,
  title,
  inCart,
  onClickHandler
}) => {
  return (
      <button
         disabled={inCart}
         className={style.productAddToCart}
         onClick={()=>onClickHandler(product)}
      >
         {title}
      </button>
  );
};

export default ProductCardButton;
