import {
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as d3 from 'd3';
import _debounce from 'lodash/debounce';
import Divider from '@mui/material/Divider';
import { SelectChangeEvent } from '@mui/material/Select';
import { Axis, Chart, Circles } from 'components/ChartUtilities';
import { detectionIdAccessor } from 'components/ChartUtilities/accessors';
import { peripheralIdAccessor } from 'components/ChartUtilities/accessors';
import { useChartDimensions } from 'components/ChartUtilities/utils';
import { HomeContext } from 'context/HomeContext/HomeContext';
import { IAlertEvent, PopoverInfoProps } from 'ts/types';
import AxisVerticalLeft from './AxisVerticalLeft/AxisVerticalLeft';
import AxisVerticalRight from './AxisVerticalRight/AxisVerticalRight';
import GridLines from './GridLines/GridLines';
import Popover from './Popover/Popover';
import ToolBar from './ToolBar/ToolBar';
import {
  formatDate as formatDateFunction,
  xScale as xScaleFunction,
  yScale as yScaleFunction,
} from './utils';
import { MovementsTimelinePeriod } from './enums';
import styles from './MovementsTimeline.module.scss';

interface MovementsTimeLineParams {
  startTime: Date;
  dataMotions: IAlertEvent[];
  dataAlerts: IAlertEvent[];
  xAccessor: (d: IAlertEvent) => Date | null;
  yAccessor: (d: object) => string;
  peripherals: Array<string>;
  ids: Array<string>;
  filter: string;
  handleChangeFilter: (e: SelectChangeEvent<unknown>) => void;
  period: MovementsTimelinePeriod;
  handleChangePeriod: (e: SelectChangeEvent<unknown>) => void;
}

// TODO: Temporal, remove this fallback when data returns video_url
const fallbackVideoUrl =
  'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4';

export const MovementsTimeline = ({
  startTime,
  dataMotions,
  dataAlerts,
  xAccessor,
  yAccessor,
  peripherals,
  ids,
  filter,
  handleChangeFilter,
  period,
  handleChangePeriod,
}: MovementsTimeLineParams) => {
  const [ref, dimensions] = useChartDimensions({
    marginLeft: 180,
    marginRight: 160,
  });
  const [defaultTranslate, setDefaultTranslate] = useState<number>(0);
  const scrollGroupRef = useRef<SVGGElement | null>(null);
  const { setMainImageCarousel } = useContext(HomeContext);
  const [anchorEl, setAnchorEl] = useState<SVGCircleElement | null>(null);
  const [alertInfo, setAlertInfo] = useState<PopoverInfoProps>({
    detection_id: '',
    duration: 0,
    peripheral_id: '',
    peripheral_name: '',
    severity: '',
    start_time: '',
    type: '',
    video_url: fallbackVideoUrl,
  });

  // FIX: fix the info parameter type
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  function handlePopoverOpen(event: MouseEvent<SVGCircleElement>, info) {
    setAnchorEl(event.currentTarget);
    setAlertInfo((prevAlertInfo) => ({
      ...info,
      peripheral_id: info!.peripheral_id ?? prevAlertInfo.peripheral_id,
      video_url: info!.video_url ?? prevAlertInfo.video_url,
    }));
  }

  function handlePopoverClose() {
    setAnchorEl(null);
  }

  const xScale = xScaleFunction(startTime, dimensions);
  const yScale = yScaleFunction(peripherals, dimensions);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const xAccessorScaled = (d: object) => xScale(xAccessor(d));
  const yAccessorScaled = (d: object) => yScale(yAccessor(d));
  const formatDate = formatDateFunction(period);

  const debounceResize = _debounce(
    () =>
      setDefaultTranslate(
        -dimensions.boundedScrollWidth + dimensions.boundedWidth
      ),
    200
  );

  const handleLeft = () => {
    const scrollGroup = d3.select<SVGGElement, unknown>(
      scrollGroupRef.current!
    );
    onScroll(scrollGroup, 'left');
  };

  const handleRight = () => {
    const scrollGroup = d3.select<SVGGElement, unknown>(
      scrollGroupRef.current!
    );
    onScroll(scrollGroup, 'right');
  };

  const onScroll = useCallback(
    (
      scrollGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
      move: 'left' | 'right' | undefined = undefined
    ) => {
      const transformObj = d3.zoomTransform(scrollGroup.node() as SVGGElement);
      // TODO: This approach is an alternative to not modify the resulting
      // d3.zoomTransform() object, but it needs some logic to work
      // const transformObj = { ...d3.zoomTransform(scrollGroup.node()) }

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

      if (move === 'left') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        transformObj.x = maxEndTranslate;
      }

      if (move === 'right') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        transformObj.x = maxStartTranslate;
      }

      const translateX = defaultTranslate + transformObj.x;
      scrollGroup.attr('transform', `translate(${translateX}, 0)`);
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
    <div className={styles.root}>
      <ToolBar
        filter={filter}
        handleChangeFilter={handleChangeFilter}
        period={period}
        handleChangePeriod={handleChangePeriod}
      />
      <Divider variant="middle" />
      <div
        className={styles.timeline}
        ref={ref}
        style={{
          height: peripherals.length * 64 + 200,
        }}
      >
        <div
          // TODO: Remove this inline styles and use a proper CSS class
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {/* TODO: Replace these buttons for proper design */}
          <button onClick={handleLeft}>Move to Left</button>
          <button onClick={handleRight}>Move to Right</button>
        </div>
        <Chart dimensions={dimensions}>
          <GridLines scale={yScale} />
          <g ref={scrollGroupRef}>
            <Axis
              dimension="xScroll"
              scale={xScale}
              formatTick={formatDate}
              numberOfTicks={
                period === MovementsTimelinePeriod.DAYS_1 ? 24 : period
              }
            />
            <Circles
              data={dataMotions}
              keyAccessor={detectionIdAccessor}
              xAccessor={xAccessorScaled}
              yAccessor={yAccessorScaled}
              onCircleClick={setMainImageCarousel}
              onClickAccessor={peripheralIdAccessor}
              className={styles.circleMotion}
            />
            <Circles
              data={dataAlerts}
              keyAccessor={detectionIdAccessor}
              xAccessor={xAccessorScaled}
              yAccessor={yAccessorScaled}
              onCircleClick={setMainImageCarousel}
              onClickAccessor={peripheralIdAccessor}
              className={styles.circleAlert}
              onCircleHover={handlePopoverOpen}
            />
            <Popover
              anchorEl={anchorEl}
              alertInfo={alertInfo}
              handleClose={handlePopoverClose}
            />
          </g>
          <AxisVerticalLeft scale={yScale} />
          <AxisVerticalRight scale={yScale} ids={ids} />
        </Chart>
      </div>
    </div>
  );
};
