import * as d3 from 'd3';
import movements_lines from 'datasets/movements_script.json';
import {
  dateAccessor,
  countAccessor,
  eventAccessor,
} from 'components/ChartUtilities/accessors';
import { LineChart } from 'components/LineChart';
import styles from './LineCharts.module.scss';

function LineCharts() {
  const dataByEvent = Array.from(
    d3.group(movements_lines, eventAccessor),
    ([key, value]) => ({ event_name: key, data: value })
  );
  return (
    <section>
      {dataByEvent.map((eventData) => (
        <div
          key={eventData.event_name}
          style={{ position: 'relative', marginTop: '4em' }}
        >
          <LineChart
            data={eventData.data}
            xAccessor={dateAccessor}
            yAccessor={countAccessor}
          />
          <center>
            <h1
              style={{
                marginTop: '0',
                position: 'absolute',
                top: '0',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              <span className={styles.title}>
                {eventData.event_name} Detections
              </span>
            </h1>
          </center>
        </div>
      ))}
    </section>
  );
}

export default LineCharts;
