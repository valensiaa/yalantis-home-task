import { ButtonStyled } from "../button/ButtonStyled";
import style from "./Fields.module.css";
import { PaginationButtonStyled } from "./PaginationButtonStyled";

const PaginationField = ({
  pages,
  currentPage,
  onPageChanged,
  primaryButton,
}) => {
  return (
    <nav className={style.paginationBlock}>
      <ButtonStyled
        primary={primaryButton}
        disabled={currentPage === 1 ? true : false}
        className={style.paginationPrevious}
        onClick={() => {
          onPageChanged(currentPage - 1);
        }}
      >
        Previous
      </ButtonStyled>
      <ul className={style.paginationList}>
        {pages.map((p) => (
          <PaginationButtonStyled
            key={p.id}
            primary={primaryButton}
            onClick={() => onPageChanged(p)}
            className={
              currentPage === p && style.selectedPage
            }
          >
            {p}
          </PaginationButtonStyled>
        ))}
      </ul>
      <ButtonStyled
        primary={primaryButton}
        disabled={currentPage === pages.length ? true : false}
        className={style.paginationNext}
        onClick={() => {
          onPageChanged(currentPage + 1);
        }}
      >
        Next page
      </ButtonStyled>
    </nav>
  );
};

export default PaginationField;
