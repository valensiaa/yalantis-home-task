import CartIcon from "../../components/cartIcon/CartIcon";
import Logo from "../../components/logo/Logo";

const Header = () => {
  return (
    <header className="app-header">
      <Logo/>
      <CartIcon />
    </header>
  );
};

export default Header;
