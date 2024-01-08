import {
  startTimeAccessor,
  peripheralNameAccessor,
} from 'components/ChartUtilities/accessors';
import { getFlattenDocuments } from 'utils/events';
import useFilters from 'components/MovementsTimelines/hooks/useFilters';
import { useAlertsByPeripheralId } from 'components/MovementsTimelines/hooks/useAlerts';
import { useMotionsByPeripheralId } from 'components/MovementsTimelines/hooks/useMotions';
import { MovementsTimeline } from './components/MovementsTimeline/MovementsTimeline';

interface Props {
  peripheralId?: string;
  peripheralName?: string;
}

function SingleContainer({
  peripheralId = '',
  peripheralName: peripheralNameFromDevice = '',
}: Props) {
  const {
    filter,
    period,
    fromDate,
    startTime,
    toDate,
    handleChangeFilterBy,
    handleChangePeriod,
  } = useFilters();

  const {
    data: dataMotionsByPeripheralId,
    isInitialLoading: isLoadingMotionsByPeripheralId,
  } = useMotionsByPeripheralId({
    fromDate,
    toDate,
    filter,
    period,
    peripheralId,
    enabled: !!peripheralId,
  });

  const {
    data: dataAlertsByPeripheralId,
    isInitialLoading: isLoadingAlertsByPeripheralId,
  } = useAlertsByPeripheralId({
    fromDate,
    toDate,
    filter,
    peripheralId,
    enabled: !!peripheralId,
  });

  const peripheralName = dataMotionsByPeripheralId
    ? peripheralNameAccessor(dataMotionsByPeripheralId[0] ?? '')
    : dataAlertsByPeripheralId
    ? peripheralNameAccessor(dataAlertsByPeripheralId[0] ?? '')
    : peripheralNameFromDevice ?? '';

  const dataMotionsByPeripheralIdFlatten = getFlattenDocuments(
    dataMotionsByPeripheralId
  );
  const dataAlertsByPeripheralIdFlatten = getFlattenDocuments(
    dataAlertsByPeripheralId
  );

  return (
    <MovementsTimeline
      startTime={startTime}
      dataMotions={dataMotionsByPeripheralIdFlatten}
      dataAlerts={dataAlertsByPeripheralIdFlatten}
      xAccessor={startTimeAccessor}
      yAccessor={peripheralNameAccessor}
      peripherals={[peripheralName]}
      ids={[peripheralId]}
      filter={filter}
      handleChangeFilter={handleChangeFilterBy}
      period={period}
      handleChangePeriod={handleChangePeriod}
      isLoading={
        isLoadingMotionsByPeripheralId || isLoadingAlertsByPeripheralId
      }
    />
  );
}

export default SingleContainer;
