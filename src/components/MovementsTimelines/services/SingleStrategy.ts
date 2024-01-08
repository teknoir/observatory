import { IEventDocumentWithPeripheral } from 'ts/types';
import { peripheralNameAccessor } from 'components/ChartUtilities/accessors';

class SingleStrategy {
  peripheralsAndIds(
    dataMotions: IEventDocumentWithPeripheral[],
    dataAlerts: IEventDocumentWithPeripheral[],
    peripheralName: string
  ) {
    const peripheral = dataMotions
      ? peripheralNameAccessor(dataMotions[0] ?? '')
      : dataAlerts
      ? peripheralNameAccessor(dataAlerts[0] ?? '')
      : peripheralName ?? '';
    return [[peripheral]];
  }
}

export default SingleStrategy;
