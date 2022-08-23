import React from 'react';

import Pagination from '@mui/material/Pagination';

type PageSwitcherPropsType = {
  page: number;
  pageCount: number;
  totalCount: number;
  changePage: (page: number) => void;
};

export const PageSwitcher = React.memo(
  (props: PageSwitcherPropsType): React.ReactElement => {
    const { page, changePage, pageCount, totalCount } = props;

    const countOfPages = Math.ceil(totalCount / pageCount);

    const pageChange = (event: React.ChangeEvent<unknown>, value: number): void => {
      changePage(value);
    };

    return (
      <Pagination
        variant="outlined"
        size="medium"
        shape="rounded"
        page={page}
        onChange={pageChange}
        count={countOfPages}
      />
    );
  },
);
