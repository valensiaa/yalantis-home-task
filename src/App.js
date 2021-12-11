import './App.css';
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";

import ProductsContainer from './Products/ProductsContainer'
import CartIcon from './Cart/CartIcon';
import Cart from './Cart/Cart';
import ProductInfo from './ProductInfo/ProductInfo';

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <header className="app-header">
          <CartIcon/>
        </header>
        <Switch>
          <Route path = '/'>
            <ProductsContainer/>
          </Route>
          <Route path = '/cart'>
            <Cart />
          </Route>
          <Route path = '/products/productId'>
            <ProductInfo />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
