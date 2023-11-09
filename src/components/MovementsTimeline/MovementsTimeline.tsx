import {
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import * as d3 from 'd3';
import _debounce from 'lodash/debounce';
import moment from 'moment/moment';

import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Select from 'muiComponents/Select/Select';
import { Axis, Chart, Circles, GridLines } from 'components/ChartUtilities';
import { detectionIdAccessor } from 'components/ChartUtilities/accessors';
import { peripheralIdAccessor } from 'components/ChartUtilities/accessors';
import { useChartDimensions } from 'components/ChartUtilities/utils';
import { mainImageCarouselContext } from 'context/HomeContext/mainImageCarouselContext';
import APP_URLS from 'enums/urls';
import {
  IAlertEvent,
  MainImageCarouselContextProps,
  PopoverInfoProps,
} from 'ts/types';
import AxisVerticalLeft from './AxisVerticalLeft/AxisVerticalLeft';
import AxisVerticalRight from './AxisVerticalRight/AxisVerticalRight';
import Popover from './Popover/Popover';
import { MovementsTimelinePeriod, TimelineFilterBy } from './enums';
import styles from './MovementsTimeline.module.scss';

const formatDateByDay = d3.timeFormat('%-b %-d');
const formatDateByTime = d3.timeFormat('%-I:%M %p');

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

const timelineOptions = [
  { value: TimelineFilterBy.MOTIONS_ALERTS, label: 'All' },
  { value: TimelineFilterBy.MOTIONS, label: 'Motions' },
  { value: TimelineFilterBy.ALERTS, label: 'Alerts' },
];

const periodOptions = [
  { value: MovementsTimelinePeriod.DAYS_1, label: 'Today' },
  { value: MovementsTimelinePeriod.DAYS_7, label: 'Last 7 days' },
  { value: MovementsTimelinePeriod.DAYS_30, label: 'Last 30 days' },
];

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
  const { setMainImageCarousel } =
    (useContext(mainImageCarouselContext) as MainImageCarouselContextProps) ||
    '';
  const [anchorEl, setAnchorEl] = useState<SVGCircleElement | null>(null);
  const [alertInfo, setAlertInfo] = useState<PopoverInfoProps>({
    detection_id: '',
    duration: 0,
    peripheral_id: '',
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

  const xScale = d3
    .scaleTime()
    .domain([startTime, moment().toDate()])
    .range([0, dimensions.boundedWidth * 6]);

  const yScale = d3
    .scalePoint()
    .domain(peripherals)
    .range([dimensions.boundedHeight, 0])
    .padding(1);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const xAccessorScaled = (d: object) => xScale(xAccessor(d));
  const yAccessorScaled = (d: object) => yScale(yAccessor(d));

  const debounceResize = _debounce(
    () =>
      setDefaultTranslate(
        -dimensions.boundedScrollWidth + dimensions.boundedWidth
      ),
    200
  );

  const formatDate =
    period === MovementsTimelinePeriod.DAYS_1
      ? formatDateByTime
      : formatDateByDay;

  const onScroll = useCallback(
    (scrollGroup: d3.Selection<SVGGElement, unknown, null, undefined>) => {
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
    <div className={styles.container}>
      <nav className={styles.menuLayout}>
        <div className={styles.menuItem}>
          <Typography variant="h5" gutterBottom>
            Motions & Alerts
          </Typography>
        </div>
        <div className={styles.menuItem}>
          <InputLabel id="timelineFilterByLabel" className={styles.inputLabel}>
            Filter by:{' '}
          </InputLabel>
          <Select
            labelId="timelineFilterByLabel"
            value={filter}
            options={timelineOptions}
            onChange={handleChangeFilter}
            disableUnderline
          />
          <Select
            labelId="movementsTimelinePeriodLabel"
            value={period}
            options={periodOptions}
            onChange={handleChangePeriod}
            disableUnderline
          />
          <Link
            component={RouterLink}
            to={APP_URLS.motionsAlerts}
            color="inherit"
          >
            View all
          </Link>
        </div>
      </nav>
      <Divider variant="middle" />
      <div
        className={styles.timeline}
        ref={ref}
        style={{
          height: peripherals.length * 64 + 200,
        }}
      >
        <Chart dimensions={dimensions}>
          <GridLines dimension="y" scale={yScale} />
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
