import React from 'react';

import { Badge } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';

import styles from './Row.module.css';

import { useAppSelector } from 'app/store';
import defaultCover from 'assets/images/defaultCover.jpg';
import { UpdatePackCoverModal } from 'common/components/modal/updatePack/UpdatePackCoverModal';
import { RoutePath } from 'common/enums/route-path';
import { Actions } from 'features/packs/components/TableArea/components/Actions';
import { CardPackType } from 'features/packs/packs-api';

type RowPropsType = {
  item: CardPackType;
};

export const Row = React.memo((props: RowPropsType) => {
  const currentUserId = useAppSelector(state => state.login.userInfo._id);

  const { item } = props;
  const navigate = useNavigate();
  const { _id, name, cardsCount, updated, deckCover } = item;
  const canUserChangingPack = item.user_id === currentUserId;

  const startSlice = 0;
  const endSlice = 20;

  const onClickQuestionCardHandler = (): void => {
    if (canUserChangingPack || cardsCount > startSlice)
      navigate(`${RoutePath.Packs}/${_id}/cards`);
  };

  return (
    <TableRow key={_id} className={styles.row}>
      <TableCell>
        {canUserChangingPack ? (
          <UpdatePackCoverModal packId={_id} packName={name} deckCover={deckCover} />
        ) : (
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Avatar
              alt="User"
              src={deckCover || defaultCover}
              sx={{ width: 50, height: 50 }}
            />
          </Badge>
        )}
      </TableCell>
      <TableCell onClick={onClickQuestionCardHandler} className={styles.name}>
        <p>{name}</p>
      </TableCell>
      <TableCell>{cardsCount}</TableCell>
      <TableCell>{updated.split('T').join('  ').slice(startSlice, endSlice)}</TableCell>
      <TableCell>{item.user_name}</TableCell>
      <TableCell>
        <Actions
          userId={item.user_id}
          packId={_id}
          packName={name}
          cover={deckCover}
          cardsCount={cardsCount}
        />
      </TableCell>
    </TableRow>
  );
});
