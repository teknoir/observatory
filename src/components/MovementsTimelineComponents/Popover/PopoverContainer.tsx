import { useQueries } from '@tanstack/react-query';
import Popover from './Popover';
import { alertKey } from 'enums/queryKeys';
import { fetchAlert } from 'services/apiRequests';

interface PopoverContainerProps {
  anchorEl: SVGCircleElement | null;
  detectionId: string;
  handleClose: () => void;
}

const PopoverContainer = ({
  detectionId,
  anchorEl,
  handleClose,
}: PopoverContainerProps) => {
  const queryKey = [alertKey, detectionId];
  const [{ data }] = useQueries({
    queries: [
      {
        queryKey,
        queryFn: () => fetchAlert(detectionId),
        refetchOnWindowFocus: false,
      },
    ],
  });
  return (
    <Popover anchorEl={anchorEl} alertInfo={data} handleClose={handleClose} />
  );
};

export default PopoverContainer;
