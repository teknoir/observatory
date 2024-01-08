import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  startTimeAccessor,
  peripheralNameAccessor,
} from 'components/ChartUtilities/accessors';
import { wsSources } from 'enums/queryKeys';
import { Source } from 'ts/types';
import useFilters from 'components/MovementsTimelines/hooks/useFilters';
import { useAlerts } from 'components/MovementsTimelines/hooks/useAlerts';
import { useMotions } from 'components/MovementsTimelines/hooks/useMotions';
import DataFormatter from 'components/MovementsTimelines/services/DataFormatter';
import MultipleStrategy from 'components/MovementsTimelines/services/MultipleStrategy';
import { MovementsTimeline } from './components/MovementsTimeline/MovementsTimeline';

function MultipleContainer() {
  const queryClient = useQueryClient();
  const sources: { [p: string]: Source } = queryClient.getQueryData([
    wsSources,
  ])!;
  const sourcesArray = Object.values(sources ?? []);
  const sourcesFromWS = sourcesArray.map((item) => {
    return {
      ...item,
      peripheral_name: item.peripheralName,
      peripheral_id: item.peripheralId,
    };
  });

  const {
    filter,
    period,
    fromDate,
    startTime,
    toDate,
    handleChangeFilterBy,
    handleChangePeriod,
  } = useFilters();

  const { data: dataMotions, isInitialLoading: isLoadingMotions } = useMotions({
    fromDate,
    toDate,
    filter,
    period,
  });

  const { data: dataAlerts, isInitialLoading: isLoadingAlerts } = useAlerts({
    fromDate,
    toDate,
    filter,
  });

  const Formatter = new DataFormatter();
  Formatter.setStrategy(new MultipleStrategy());

  const [peripherals, ids] = useMemo(
    () => Formatter.peripheralsAndIds(dataMotions, dataAlerts, sourcesFromWS),
    [dataMotions, dataAlerts, sourcesFromWS]
  );

  let dataAlertsFlatten = Formatter.flatDocuments(dataAlerts);
  let dataMotionsFlatten = Formatter.flatDocuments(dataMotions);
  // TODO: temp solution for redundant data (only for Charts) - remove in future!
  dataAlertsFlatten = Formatter.sliceFlattedData(dataAlertsFlatten);
  dataMotionsFlatten = Formatter.sliceFlattedData(dataMotionsFlatten);

  return (
    <MovementsTimeline
      startTime={startTime}
      dataMotions={dataMotionsFlatten}
      dataAlerts={dataAlertsFlatten}
      xAccessor={startTimeAccessor}
      yAccessor={peripheralNameAccessor}
      peripherals={peripherals}
      ids={ids}
      filter={filter}
      handleChangeFilter={handleChangeFilterBy}
      period={period}
      handleChangePeriod={handleChangePeriod}
      isLoading={isLoadingMotions || isLoadingAlerts}
    />
  );
}

export default MultipleContainer;
