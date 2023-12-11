import { useCallback, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import moment from 'moment/moment';
import _debounce from 'lodash/debounce';
import { Chart, Circles } from 'components/ChartUtilities';
import {
  detectionIdAccessor,
  startTimeAccessor as xAccessor,
  peripheralNameAccessor as yAccessor,
} from 'components/ChartUtilities/accessors';
import { useChartDimensions } from 'components/ChartUtilities/utils';
import { IAlertEvent } from 'ts/types';
import styles from './MovementsTimeline.module.scss';

// TODO: Temporal impors
import GridLines from 'components/MovementsTimeline/GridLines/GridLines';
import {
  formatDate as formatDateFunction,
  xScale as xScaleFunction,
  yScale as yScaleFunction,
} from 'components/MovementsTimeline/utils';
import AxisHorizontalScroll from 'components/MovementsTimeline/AxisHorizontalScroll/AxisHorizontalScroll';

interface MovementsTimelineProps {
  dataMotions: IAlertEvent[];
  dataAlerts: IAlertEvent[];
}
const MovementsTimeline = ({
  dataMotions,
  dataAlerts,
}: MovementsTimelineProps) => {
  const [ref, dimensions] = useChartDimensions({
    marginTop: 110,
    marginLeft: 180,
    marginRight: 160,
  });
  const [defaultTranslate, setDefaultTranslate] = useState<number>(0);
  const scrollGroupRef = useRef<SVGGElement | null>(null);

  const peripherals = ['test'];
  const period = 1;

  const startTime = moment().subtract(period, 'days').toDate();
  const xScale = xScaleFunction(startTime, dimensions);
  const yScale = yScaleFunction(peripherals, dimensions);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const xAccessorScaled = (d: object) => xScale(xAccessor(d));
  const yAccessorScaled = (d: object) => yScale(yAccessor(d));
  const formatDate = formatDateFunction(period);
  const numberOfTicks = 24;

  const debounceResize = _debounce(
    () =>
      setDefaultTranslate(
        -dimensions.boundedScrollWidth + dimensions.boundedWidth
      ),
    200
  );

  const onScroll = useCallback(
    (
      scrollGroup: d3.Selection<SVGGElement, unknown, null, undefined>
      // move: CarouselArrowsOptions | undefined = undefined
    ) => {
      const transformObj = d3.zoomTransform(scrollGroup.node() as SVGGElement);
      // TODO: This approach is an alternative to not modify the resulting
      // d3.zoomTransform() object, but it needs some logic to work
      // const transformObj = { ...d3.zoomTransform(scrollGroup.node()) }

      // let duration = 0;
      const maxStartTranslate = 0;
      const maxEndTranslate =
        dimensions.boundedScrollWidth - dimensions.boundedWidth;

      // TODO: Replace these @ts-ignore comments for a different logic where is
      // no necessary to replace the x property of transformObj (which comes from
      // d3.zoomTransform). These properties of the object are read-only by definition
      // and should not be modified as I'm currently doing right now:
      //
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      transformObj.x = Math.max(transformObj.x, maxStartTranslate);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      transformObj.x = Math.min(transformObj.x, maxEndTranslate);

      // if (move === CarouselArrowsOptions.LEFT) {
      //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //   // @ts-ignore
      //   transformObj.x =
      //     transformObj.x + dimensions.boundedWidth / 2 > maxEndTranslate
      //       ? maxEndTranslate
      //       : transformObj.x + dimensions.boundedWidth / 2;
      //   duration = 500;
      // }

      // if (move === CarouselArrowsOptions.RIGHT) {
      //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //   // @ts-ignore
      //   transformObj.x =
      //     transformObj.x - dimensions.boundedWidth / 2 < maxStartTranslate
      //       ? maxStartTranslate
      //       : transformObj.x - dimensions.boundedWidth / 2;
      //   duration = 500;
      // }

      const translateX = defaultTranslate + transformObj.x;
      scrollGroup
        .transition()
        // .duration(duration)
        .attr('transform', `translate(${translateX}, 0)`);
    },
    [defaultTranslate, dimensions.boundedScrollWidth, dimensions.boundedWidth]
  );

  useEffect(() => {
    debounceResize();
  }, [dimensions, debounceResize]);

  useEffect(() => {
    const scrollGroup = d3.select<SVGGElement, unknown>(
      scrollGroupRef.current!
    );
    const timelineContainer = d3.select<HTMLElement, unknown>(ref.current!);
    const d3Zoom = d3
      .zoom<HTMLElement, unknown>()
      .scaleExtent([1, 1])
      .on('zoom', () =>
        onScroll(
          scrollGroup as d3.Selection<SVGGElement, unknown, null, undefined>
        )
      );
    timelineContainer.call(d3Zoom);
    timelineContainer.call(d3Zoom.transform, d3.zoomIdentity);
    scrollGroup.attr('transform', `translate(${defaultTranslate}, 0)`);
  }, [defaultTranslate, ref, onScroll]);

  return (
    <div
      className={styles.timeline}
      ref={ref}
      style={{
        height: peripherals.length * 64 + 200,
      }}
    >
      <Chart dimensions={dimensions}>
        <GridLines scale={yScale} />
        <g ref={scrollGroupRef}>
          <AxisHorizontalScroll
            scale={xScale}
            formatTick={formatDate}
            numberOfTicks={numberOfTicks}
          />
          <Circles
            data={dataMotions}
            keyAccessor={detectionIdAccessor}
            xAccessor={xAccessorScaled}
            yAccessor={yAccessorScaled}
            // onCircleClick={setMainImageCarousel}
            // onClickAccessor={peripheralIdAccessor}
            className={styles.circleMotion}
          />
          <Circles
            data={dataAlerts}
            keyAccessor={detectionIdAccessor}
            xAccessor={xAccessorScaled}
            yAccessor={yAccessorScaled}
            // onCircleClick={setMainImageCarousel}
            // onClickAccessor={peripheralIdAccessor}
            className={styles.circleAlert}
            // onCircleHover={handlePopoverOpen}
          />
        </g>
      </Chart>
    </div>
  );
};

export default MovementsTimeline;
