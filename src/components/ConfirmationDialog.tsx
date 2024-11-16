import { useState } from 'react';
import { FC } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message?: string;
  showReasonField?: boolean;
  onConfirm: (reason?: string) => void;
  onClose: () => void;
}

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  open,
  title,
  message,
  showReasonField = false,
  onConfirm,
  onClose,
}) => {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    onConfirm(reason);
    setReason('');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <p>{message}</p>
        {showReasonField && (
          <TextField
            label="Reason"
            fullWidth
            value={reason}
            onChange={e => setReason(e.target.value)}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
