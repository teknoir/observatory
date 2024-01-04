import { useCallback, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import _debounce from 'lodash/debounce';
import {
  startTimeAccessor as xAccessor,
  peripheralNameAccessor as yAccessor,
} from 'components/ChartUtilities/accessors';
import {
  useChartDimensions,
  IDimensions,
} from 'components/ChartUtilities/utils';
import { CarouselArrowsOptions } from 'enums/timeline';
import { PopoverInfoProps } from 'ts/types';
import {
  formatDate as formatDateFunction,
  xScale as xScaleFunction,
  yScale as yScaleFunction,
} from '../components/MovementsTimeline/utils.ts';

const fallbackVideoUrl =
  'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4';

interface Props {
  peripherals: string[];
  period: number;
  startTime: Date;
  initialDimensions?: IDimensions;
}

const useMovementsTimelineDataVertical = ({
  startTime,
  peripherals,
  period,
  initialDimensions,
}: Props) => {
  const [ref, dimensions] = useChartDimensions(initialDimensions);
  const [defaultTranslate, setDefaultTranslate] = useState<number>(0);
  const scrollGroupRef = useRef<SVGGElement | null>(null);
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

  const handleCarouselArrows = (d: CarouselArrowsOptions) => {
    const scrollGroup = d3.select<SVGGElement, unknown>(
      scrollGroupRef.current!
    );
    onScroll(scrollGroup, d);
  };

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
  // const numberOfTicks = 24;

  const debounceResize = _debounce(
    () =>
      setDefaultTranslate(
        -dimensions.boundedScrollWidth + dimensions.boundedWidth
      ),
    200
  );

  const onScroll = useCallback(
    (
      scrollGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
      move: CarouselArrowsOptions | undefined = undefined
    ) => {
      const transformObj = d3.zoomTransform(scrollGroup.node() as SVGGElement);
      console.log(transformObj);
      // TODO: This approach is an alternative to not modify the resulting
      // d3.zoomTransform() object, but it needs some logic to work
      // const transformObj = { ...d3.zoomTransform(scrollGroup.node()) }

      let duration = 0;
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
      transformObj.y = Math.max(transformObj.y, maxStartTranslate);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      transformObj.y = Math.min(transformObj.y, maxEndTranslate);

      if (move === CarouselArrowsOptions.LEFT) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        transformObj.y =
          transformObj.y + dimensions.boundedWidth / 2 > maxEndTranslate
            ? maxEndTranslate
            : transformObj.y + dimensions.boundedWidth / 2;
        duration = 500;
      }

      if (move === CarouselArrowsOptions.RIGHT) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        transformObj.y =
          transformObj.y - dimensions.boundedWidth / 2 < maxStartTranslate
            ? maxStartTranslate
            : transformObj.y - dimensions.boundedWidth / 2;
        duration = 500;
      }

      const translateX = defaultTranslate + transformObj.x;
      scrollGroup
        .transition()
        .duration(duration)
        // .attr('transform', `0, translate(${translateX})`);
        .attr('transform', `translate(0, ${translateX})`);
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
    // scrollGroup.attr('transform', `translate(${defaultTranslate}, 0)`);
    scrollGroup.attr('transform', `translate(0, ${defaultTranslate})`);
  }, [defaultTranslate, ref, onScroll]);

  return {
    dimensions,
    ref,
    scrollGroupRef,
    xScale,
    yScale,
    xAccessorScaled,
    yAccessorScaled,
    formatDate,
    anchorEl,
    alertInfo,
    handlePopoverOpen,
    handlePopoverClose,
    handleCarouselArrows,
  };
};

export default useMovementsTimelineDataVertical;
