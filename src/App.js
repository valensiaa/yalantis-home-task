import "./App.css";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import ProductsContainer from "./Products/ProductsContainer";
import CartIcon from "./Cart/CartIcon";
import CartContainer from "./Cart/CartContainer";
import ProductInfoContainer from "./ProductInfo/ProductInfoContainer";

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <header className="app-header">
          <CartIcon />
        </header>
        <Switch>
          <Route exact path="/" component={ProductsContainer} />
          <Route path="/cart" component={CartContainer} />
          <Route
            path="/products/:productId?"
            component={ProductInfoContainer}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
