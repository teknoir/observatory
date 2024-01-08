import _uniqBy from 'lodash/uniqBy';
import _flatten from 'lodash/flatten';
import { IEventDocumentWithPeripheral, Source } from 'ts/types';
import {
  peripheralNameAccessor,
  peripheralIdAccessor,
} from 'components/ChartUtilities/accessors';

class MultipleStrategy {
  peripheralsAndIds(
    dataMotions: IEventDocumentWithPeripheral[],
    dataAlerts: IEventDocumentWithPeripheral[],
    sourcesFromWS: Source[]
  ) {
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
  }
}

export default MultipleStrategy;
