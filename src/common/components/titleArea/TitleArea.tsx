import React from 'react';

import { AddNewPackModal } from 'common/components/modal/addNewPackModal/AddNewPackModal';
import styles from 'common/components/titleArea/TitleArea.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

type TitleAreaPropsType = {
  title: string;
};

export const TitleArea = React.memo((props: TitleAreaPropsType): ReturnComponentType => {
  const { title } = props;

  return (
    <div className={styles.titleArea}>
      <div>{title}</div>
      <AddNewPackModal />
    </div>
  );
});
