import { ButtonStyled } from "./ButtonStyled";

const Button = ({
  product,
  title,
  inCart,
  onClickHandler,
  primaryButton
}) => {
  return (
    <ButtonStyled
      primary={primaryButton}
      disabled={inCart}
      onClick={() => onClickHandler(product)}
    >
      {title}
    </ButtonStyled>
  );
};

export default Button;
