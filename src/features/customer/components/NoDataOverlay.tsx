import { Button } from '@mui/material';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

type NoDataOverlayProps = {
  handleOpen: () => void;
  buttonLabel?: string;
};

const NoDataOverlay = ({
  handleOpen,
  buttonLabel = 'Müştəri əlavə edin',
}: NoDataOverlayProps) => {
  return (
    <div className="flex flex-col h-full justify-center items-center">
      <CancelPresentationIcon sx={{ fontSize: '120px', color: '#e0e0e0' }} />
      <Button variant="contained" onClick={handleOpen}>
        {buttonLabel}
      </Button>
    </div>
  );
};

export default NoDataOverlay;
