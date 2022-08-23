import React from 'react';

import styles from './Pagination.module.css';

import { ItemsNumberSelect } from 'features/packs/components/Pagination/components/ItemsNumberSelect';
import { PageSwitcher } from 'features/packs/components/Pagination/components/PageSwitcher';

type PaginationPropsType = {
  page: number;
  pageCount: number;
  totalCount: number;
  changePage: (value: number) => void;
  changePageCount: (value: number) => void;
};

export const Pagination = React.memo((props: PaginationPropsType): React.ReactElement => {
  const { page, pageCount, totalCount, changePage, changePageCount } = props;
  return (
    <div className={styles.paginationWrapper}>
      <ItemsNumberSelect pageCount={pageCount} changePageCount={changePageCount} />
      <PageSwitcher
        page={page}
        pageCount={pageCount}
        totalCount={totalCount}
        changePage={changePage}
      />
    </div>
  );
});
