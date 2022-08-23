import React from 'react';

import { School } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'app/store';
import { DeletePackModal } from 'common/components/modal/deletePackModal/DeletePackModal';
import { UpdatePackNameModal } from 'common/components/modal/updatePack/UpdatePackNameModal';
import { RoutePath } from 'common/enums/route-path';

type ActionsPropsType = {
  packId: string;
  userId: string;
  packName: string;
  cover: string | null;
  cardsCount: number;
};

export const Actions = (props: ActionsPropsType): React.ReactElement => {
  const navigate = useNavigate();
  const { userId, packId, packName, cover, cardsCount } = props;

  const currentUserId = useAppSelector(state => state.login.userInfo._id);

  const canUserChangingPack = userId === currentUserId;

  const handleClickLearnCard = (): void => {
    navigate(`${RoutePath.Packs}/${packId}/cards/learn`);
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* eslint-disable-next-line no-magic-numbers,@typescript-eslint/no-magic-numbers */}
      <IconButton disabled={cardsCount === 0} onClick={handleClickLearnCard}>
        <School />
      </IconButton>
      {canUserChangingPack && (
        <UpdatePackNameModal packName={packName} packId={packId} cover={cover} />
      )}
      {canUserChangingPack && (
        <DeletePackModal packName={packName} packId={packId} cover={cover} />
      )}
    </div>
  );
};
