import ProductsContainer from "../../pages/Products/ProductsContainer";
import CartContainer from "../../pages/Cart/CartContainer";
import ProductInfoContainer from "../../pages/ProductInfo/ProductInfoContainer";
import { Route, Switch, Redirect } from "react-router-dom";

const Main = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={ProductsContainer} />
        <Route path="/cart" component={CartContainer} />
        <Route path="/products/:productId?" component={ProductInfoContainer} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default Main;
