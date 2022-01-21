import CartIcon from "../../components/cartIcon/CartIcon";
import Logo from "../../components/logo/Logo";
import MyAccount from "../../components/myAccount/MyAccount";

const Header = () => {
  return (
    <header className="app-header">
      <Logo />
      <MyAccount />
      <CartIcon />
    </header>
  );
};

export default Header;
