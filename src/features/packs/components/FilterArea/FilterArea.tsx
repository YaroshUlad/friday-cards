import React from 'react';

import { MyAllPacksArea } from 'features/packs/components/FilterArea/components/MyAllPacksArea';
import { NumberOfCardsFilterArea } from 'features/packs/components/FilterArea/components/NumberOfCardsFilterArea';
import { SearchArea } from 'features/packs/components/FilterArea/components/SearchArea';
import styles from 'features/packs/Packs.module.css';

export const FilterArea = (): React.ReactElement => (
  <div className={styles.filterArea}>
    <SearchArea />

    <MyAllPacksArea />

    <NumberOfCardsFilterArea />
  </div>
);
