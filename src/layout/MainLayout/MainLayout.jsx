import ProductsContainer from "../../pages/Products/ProductsContainer";
import CartContainer from "../../pages/Cart/CartContainer";
import ProductInfoContainer from "../../pages/ProductInfo/ProductInfoContainer";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "../Header/Header";
import MyProductsContainer from "../../pages/MyProducts/MyProductsContainer";

const MainLayout = () => {
  return (
      <div className="app-wrapper">
        <Header />
        <Switch>
          <Route exact path="/" component={ProductsContainer} />
          <Route path="/cart" component={CartContainer} />
          <Route path="/products/:productId?" component={ProductInfoContainer} />
          <Route path="/myproducts" component={MyProductsContainer} />
          <Redirect to="/" />
        </Switch>
      </div>
  );
};

export default MainLayout;
