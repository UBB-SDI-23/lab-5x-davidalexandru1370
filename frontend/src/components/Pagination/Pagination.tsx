import { FC, useState } from "react";
import styles from "./Pagination.module.css";
interface IPaginationComponent {
  onChangePage: (pageNumber: number) => void;
  pageNumber: number;
  hasNext: boolean;
  hasPrevious: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Pagination: FC<IPaginationComponent> = ({
  onChangePage,
  pageNumber,
  hasNext,
  hasPrevious,
  className,
  style,
}) => {
  return (
    <div className={`${styles.content} ${className}`} style={style}>
      <button
        className={`${styles.paginationButton}`}
        disabled={hasPrevious === false}
        onClick={() => {
          onChangePage(pageNumber - 1);
        }}
      >
        Previous page
      </button>
      {pageNumber >= 3 && (
        <>
          <span
            className={`${styles.pageIndexCard} ${styles.cursorPointer}`}
            onClick={() => {
              onChangePage(1);
            }}
          >
            1
          </span>
          {pageNumber >= 4 && (
            <span className={`${styles.pageIndexCard}`}>...</span>
          )}
        </>
      )}
      {hasPrevious === true && pageNumber > 1 && (
        <>
          <span
            className={`${styles.pageIndexCard} ${styles.cursorPointer}`}
            onClick={() => {
              onChangePage(pageNumber - 1);
            }}
          >
            {pageNumber - 1}
          </span>
        </>
      )}
      <span
        className={`${styles.pageIndexCard} ${styles.cursorPointer} ${styles.selectedPageIndexCard}`}
      >
        {pageNumber}
      </span>

      {hasNext === true && (
        <>
          <span
            className={`${styles.pageIndexCard} ${styles.cursorPointer}`}
            onClick={() => {
              onChangePage(pageNumber + 1);
            }}
          >
            {pageNumber + 1}
          </span>
          <span className={`${styles.pageIndexCard}`}>...</span>
        </>
      )}
      <button
        className={`${styles.paginationButton}`}
        disabled={hasNext === false}
        onClick={() => {
          onChangePage(pageNumber + 1);
        }}
      >
        Next page
      </button>
    </div>
  );
};

export default Pagination;
