import { FC, useState } from "react";
import styles from "./Pagination.module.css";
import { usePagination } from "@/hooks/usePagination";
import { DOTS } from "@/utilities/utilities";
interface IPaginationComponent {
  onChangePage: (pageNumber: number) => void;
  pageNumber: number;
  totalNumberOfElements: number;
  neighbourhood?: number;
  take: number;
  className?: string;
  style?: React.CSSProperties;
}

const range = (start: number, end: number) => {
  let length = end - start + 1;

  return Array.from({ length }, (_, index) => index + start);
};

const Pagination: FC<IPaginationComponent> = ({
  onChangePage,
  pageNumber,
  totalNumberOfElements,
  neighbourhood = 4,
  take,
  className,
  style,
}) => {
  const [skip, setSkip] = useState<number>(0);
  const paginationRange = usePagination({
    currentPage: pageNumber,
    pageSize: take,
    siblingCount: neighbourhood,
    totalCount: totalNumberOfElements,
  });

  return (
    <div className={`${styles.content} ${className}`} style={style}>
      {paginationRange?.map((pageCount) => {
        if (pageCount === DOTS) {
          return <div className={`${styles.pageIndexCard}`}>{DOTS}</div>;
        }
        return (
          <div
            className={`${styles.pageIndexCard} ${styles.cursorPointer}`}
            onClick={() => {
              if (pageCount !== pageNumber) {
                //@ts-ignore
                onChangePage(pageCount);
              }
            }}
          >
            {pageCount}
          </div>
        );
      })}
    </div>
  );
};

export default Pagination;
