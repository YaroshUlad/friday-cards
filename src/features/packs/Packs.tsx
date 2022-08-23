import React, { useCallback, useEffect } from 'react';

import { Pagination } from './components/Pagination/Pagination';

import { useAppDispatch, useAppSelector } from 'app/store';
import { TitleArea } from 'common/components/titleArea/TitleArea';
import useDebounce from 'common/hooks/useDebounce';
import { sortOne, sortZero } from 'common/utils/refetchPacks-utills';
import { FilterArea } from 'features/packs/components/FilterArea/FilterArea';
import { TableArea } from 'features/packs/components/TableArea/TableArea';
import {
  fetchCardPacks,
  setPageCountNumber,
  setPageNumber,
} from 'features/packs/packs-reducer';
import styles from 'features/packs/Packs.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Packs = React.memo((): ReturnComponentType => {
  const packs = useAppSelector(state => state.packs.cardPacks);
  const page = useAppSelector(state => state.packs.page);
  const pageCount = useAppSelector(state => state.packs.pageCount);
  const totalCount = useAppSelector(state => state.packs.cardPacksTotalCount);
  const sortFlag = useAppSelector(state => state.packs.sortFlag);
  const sortChoice = useAppSelector(state => state.packs.sortChoice);
  const myAll = useAppSelector(state => state.packs.isOnlyMyPacks);
  const id = useAppSelector(state => state.login.userInfo._id);
  const searchValue = useAppSelector(state => state.packs.searchValue);
  const min = useAppSelector(state => state.packs.min);
  const max = useAppSelector(state => state.packs.max);

  const dispatch = useAppDispatch();

  const delay = 1000;
  const debouncedValue = useDebounce<string | undefined>(searchValue, delay);

  // запрос по страницам с колодами, выполняется при взаимодействии с пагинацией
  useEffect(() => {
    const sortPacks = `${sortFlag ? sortOne : sortZero}${sortChoice}`;
    const userId = myAll ? id : '';
    dispatch(
      fetchCardPacks({
        page,
        pageCount,
        sortPacks,
        user_id: userId,
        packName: debouncedValue,
        min,
        max,
      }),
    );
  }, [page, pageCount, sortFlag, myAll, debouncedValue, min, max, sortChoice]);

  // _______________________ колбэки для пагинации ____________________
  const changePageCount = useCallback((value: number): void => {
    dispatch(setPageCountNumber(value));
  }, []);

  const changePage = useCallback((value: number): void => {
    dispatch(setPageNumber(value));
  }, []);

  return (
    <div className={styles.packsWrapper}>
      <TitleArea title="Packs list" />
      <FilterArea />
      <TableArea packs={packs} />
      <Pagination
        page={page}
        pageCount={pageCount}
        totalCount={totalCount}
        changePageCount={changePageCount}
        changePage={changePage}
      />
    </div>
  );
});
