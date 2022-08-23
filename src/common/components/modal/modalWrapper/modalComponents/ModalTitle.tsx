import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';

import { ReturnComponentType } from 'types/ReturnComponentType';

export const ModalTitle = (props: ModalTitleProps): ReturnComponentType => {
  const { onClose, title } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }}>
      <p>{title}</p>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          float: 'right',
          position: 'absolute',
          right: 8,
          top: 8,
          // margin: 2,
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          color: theme => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
};

type ModalTitleProps = {
  title: string;
  onClose: () => void;
};
