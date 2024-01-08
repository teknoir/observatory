import {
  startTimeAccessor,
  peripheralNameAccessor,
} from 'components/ChartUtilities/accessors';
import useFilters from 'components/MovementsTimelines/hooks/useFilters';
import { useAlertsByPeripheralId } from 'components/MovementsTimelines/hooks/useAlerts';
import { useMotionsByPeripheralId } from 'components/MovementsTimelines/hooks/useMotions';
import DataFormatter from 'components/MovementsTimelines/services/DataFormatter';
import SingleStrategy from 'components/MovementsTimelines/services/SingleStrategy';
import { MovementsTimeline } from './components/MovementsTimeline/MovementsTimeline';

interface Props {
  peripheralId?: string;
  peripheralName?: string;
}

// TODO: This container isn't used. Remove in future!
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

  const Formatter = new DataFormatter();
  Formatter.setStrategy(new SingleStrategy());

  const [peripheralNames] = Formatter.peripheralsAndIds(
    dataMotionsByPeripheralId,
    dataAlertsByPeripheralId,
    peripheralNameFromDevice
  );
  const dataMotionsByPeripheralIdFlatten = Formatter.flatDocuments(
    dataMotionsByPeripheralId
  );
  const dataAlertsByPeripheralIdFlatten = Formatter.flatDocuments(
    dataAlertsByPeripheralId
  );

  return (
    <MovementsTimeline
      startTime={startTime}
      dataMotions={dataMotionsByPeripheralIdFlatten}
      dataAlerts={dataAlertsByPeripheralIdFlatten}
      xAccessor={startTimeAccessor}
      yAccessor={peripheralNameAccessor}
      peripherals={peripheralNames}
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
