import ProductsContainer from "../../pages/Products/ProductsContainer";
import CartContainer from "../../pages/Cart/CartContainer";
import ProductInfoContainer from "../../pages/ProductInfo/ProductInfoContainer";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import MyProductsContainer from "../../pages/MyProducts/MyProductsContainer";
import OrdersContainer from "../../pages/Orders/OrdersContainer";

const MainLayout = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <Routes>
        <Route exact path="/" element={<ProductsContainer />} />
        <Route path="/cart" element={<CartContainer />} />
        <Route path="/products/:productId" element={<ProductInfoContainer />} />
        <Route path="/myproducts" element={<MyProductsContainer />} />
        <Route path="/orders" element={<OrdersContainer />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default MainLayout;
