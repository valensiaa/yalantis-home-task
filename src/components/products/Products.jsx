import style from "./Products.module.css";
import ProductCard from "../productCard/ProductCard";

const Products = ({ products, changeDate, addToCart }) => {
  return (
    <div className={style.productsBlock}>
      <h1>Products</h1>
      <div className={style.productsItems}>
        {products.map(p => <ProductCard product ={p} changeDate={changeDate} addToCart={addToCart}/>)}
      </div>
    </div>
  );
};

export default Products;
