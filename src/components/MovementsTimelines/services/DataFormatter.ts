import { IEventDocumentWithPeripheral, RetrieveEventsResponse } from 'ts/types';
import { getFlattenDocuments } from 'utils/events';
import SingleStrategy from './SingleStrategy';
import MultipleStrategy from './MultipleStrategy';

const MAX_ITEMS = 1000;

type Strategy = null | SingleStrategy | MultipleStrategy;

class DataFormatter {
  private strategy: Strategy = null;

  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  flatDocuments(data: RetrieveEventsResponse) {
    return getFlattenDocuments(data);
  }

  sliceFlattedData(data: IEventDocumentWithPeripheral[]) {
    if (data.length <= MAX_ITEMS) return data;
    return data.slice(-MAX_ITEMS);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  peripheralsAndIds(...args) {
    if (!this.strategy) return [];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.strategy.peripheralsAndIds(...args);
  }
}

export default DataFormatter;
