import ProductsContainer from "../../pages/Products/ProductsContainer";
import CartContainer from "../../pages/Cart/CartContainer";
import ProductInfoContainer from "../../pages/ProductInfo/ProductInfoContainer";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "../Header/Header";

const MainLayout = ({children}) => {
  return (
      <div className="app-wrapper">
        <Header />
        {children}    
        <Switch>
          <Route exact path="/" component={ProductsContainer} />
          <Route path="/cart" component={CartContainer} />
          <Route path="/products/:productId?" component={ProductInfoContainer} />
          <Redirect to="/" />
        </Switch>
      </div>
  );
};

export default MainLayout;
