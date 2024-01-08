import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import _flatten from 'lodash/flatten';
import _uniqBy from 'lodash/uniqBy';
import {
  startTimeAccessor,
  peripheralNameAccessor,
  peripheralIdAccessor,
} from 'components/ChartUtilities/accessors';
import { wsSources } from 'enums/queryKeys';
import { Source } from 'ts/types';
import { getFlattenDocuments } from 'utils/events';
import useFilters from 'components/MovementsTimelines/hooks/useFilters';
import { useAlerts } from 'components/MovementsTimelines/hooks/useAlerts';
import { useMotions } from 'components/MovementsTimelines/hooks/useMotions';
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

  const [peripherals, ids] = useMemo(() => {
    const flattenArr = [];
    for (let i = 0; i < dataAlerts?.length; i++) {
      flattenArr.push({
        peripheral_id: dataAlerts[i].peripheral_id,
        peripheral_name: dataAlerts[i].peripheral_name,
      });
    }
    for (let i = 0; i < dataMotions?.length; i++) {
      flattenArr.push({
        peripheral_id: dataMotions[i].peripheral_id,
        peripheral_name: dataMotions[i].peripheral_name,
      });
    }
    const uniqueArr = _uniqBy(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      _flatten([flattenArr, sourcesFromWS ?? []]),
      'peripheral_name'
    );
    return [
      uniqueArr.map(peripheralNameAccessor),
      uniqueArr.map(peripheralIdAccessor),
    ];
  }, [dataMotions, dataAlerts, sourcesFromWS]);

  let dataAlertsFlatten = getFlattenDocuments(dataAlerts);
  // TODO: temp solution for redundant data (only for Charts) - remove in future!
  if (dataAlertsFlatten?.length > 1000) {
    dataAlertsFlatten = dataAlertsFlatten.slice(-1000);
  }
  let dataMotionsFlatten = getFlattenDocuments(dataMotions);
  // TODO: temp solution for redundant data (only for Charts) - remove in future!
  if (dataMotionsFlatten?.length > 1000) {
    dataMotionsFlatten = dataMotionsFlatten.slice(-1000);
  }

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
