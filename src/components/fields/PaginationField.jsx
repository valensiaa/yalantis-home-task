import style from "./Fields.module.css";

const PaginationField = ({ pages, currentPage, onPageChanged, productsPerPage }) => {
  return (
    <nav
      className={style.paginationBlock}
      role="navigation"
      aria-label="pagination"
    >
      <button disabled={currentPage === 1 ? true : false}
        className={style.paginationPrevious}
        onClick={() => {
          onPageChanged(currentPage-1)
        }}
      >
        Previous
      </button>
      <ul className={style.paginationList}>
        {pages.map((p) => (
          <span
            key={p.id}
            onClick={() => onPageChanged(p)}
            className={
              currentPage === p ? style.selectedPage : style.pageNumber
            }
          >
            {p}
          </span>
        ))}
      </ul>
      <button disabled={currentPage === pages.length ? true : false}
        className={style.paginationNext}
        onClick={() => {
          onPageChanged(currentPage+1)
        }}
      >
        Next page
      </button>
    </nav>
  );
};

export default PaginationField;
