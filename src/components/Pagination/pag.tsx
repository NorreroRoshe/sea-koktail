"use client"
import { useMemo, useEffect, useState } from 'react';
import cls from './pagination.module.scss';
import { COUNT_PER_PAGE, renderPageNumbers } from './pagination-lib';
import { useSearchParams } from "next/navigation";

interface ITablePagination {
  count: number;
  changePage: (n: number) => void;
  isLoading: boolean;
}

export const Pagination = (props: ITablePagination) => {
  const { count, changePage, isLoading } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(count / COUNT_PER_PAGE);
  const searchParams = useSearchParams();

  const hangleChangePage = (page: number) => {
    //Если в диапазоне
    if (!(page >= 1 && page <= totalPages)) return;
    //От повторных кликов
    if (page === currentPage) return;
    changePage(page);
    setCurrentPage(page);
  };

  const buttons = useMemo(
    () => renderPageNumbers(currentPage, count, totalPages),
    [currentPage, count],
  );

  console.log(currentPage,'currentPage')
  useEffect(() => {
  //@ts-ignore
    setCurrentPage(searchParams.get(`Page`) !== null ? +searchParams.get(`Page`)+1 : 1 )
  }, []);

  return (
    <div className={cls.paginationWrapper}>
      <div className={cls.pagination}>
        <button
          className={cls.pagination_dprev}
          disabled={currentPage === 1 || isLoading}
          onClick={() => hangleChangePage(1)}>
          Начало
        </button>
        <button
          disabled={currentPage === 1 || isLoading}
          onClick={() => hangleChangePage(currentPage)}>
          |
        </button>
        <button
          className={cls.pagination_oprev}
          disabled={currentPage === 1 || isLoading}
          onClick={() => hangleChangePage(currentPage - 1)}>
          {'<'}
        </button>
        <button
          disabled={currentPage === 1 || isLoading}
          onClick={() => hangleChangePage(currentPage)}>
          |
        </button>
        {buttons.map((item, index) => (
          <button
            key={`pagination-button-${item}-${index}`}
            onClick={() => typeof item === 'number' && hangleChangePage(item)}
            // style={{ color: item === currentPage ? 'red' : 'green' }}
            className={`${cls.pagination_numbers} ${
              item === currentPage ? cls.pag_select_active : 'green'
            }`}
            // className={clsx({ [cls.active]: item === currentPage })}
          >
            {item}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages || isLoading}
          onClick={() => hangleChangePage(currentPage)}>
          |
        </button>
        <button
          disabled={currentPage === totalPages || isLoading}
          onClick={() => hangleChangePage(currentPage + 1)}
          className={cls.pagination_onext}>
          {'>'}
        </button>
        <button
          disabled={currentPage === totalPages || isLoading}
          onClick={() => hangleChangePage(currentPage)}>
          |
        </button>
        <button
          disabled={currentPage === totalPages || isLoading}
          onClick={() => hangleChangePage(totalPages)}
          className={cls.pagination_dnext}>
          Конец
        </button>
      </div>
    </div>
  );
};
