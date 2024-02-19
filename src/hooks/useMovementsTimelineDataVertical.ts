import { useCallback, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import _debounce from 'lodash/debounce';
import { startTimeAccessor as yAccessor } from 'components/ChartUtilities/accessors';
import {
  useChartDimensions,
  IDimensions,
} from 'components/ChartUtilities/utils';
import { PopoverInfoProps } from 'ts/types';
import { yScale as yScaleFunction } from '../components/MovementsTimelineVertical/utils.ts';

const fallbackVideoUrl =
  'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4';

interface Props {
  peripherals: string[];
  period: number;
  startTime: Date;
  initialDimensions?: IDimensions;
  scrollLengthMultiplier?: number;
}

const useMovementsTimelineDataVertical = ({
  startTime,
  period,
  initialDimensions,
  scrollLengthMultiplier = period * 10,
}: Props) => {
  const [ref, dimensions] = useChartDimensions(
    initialDimensions,
    scrollLengthMultiplier
  );
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

  const yScale = yScaleFunction(startTime, dimensions);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const yAccessorScaled = (d: object) => yScale(yAccessor(d));

  const debounceResize = _debounce(
    () =>
      setDefaultTranslate(
        -dimensions.boundedScrollHeight + dimensions.boundedHeight
      ),
    200
  );

  const onScroll = useCallback(
    (scrollGroup: d3.Selection<SVGGElement, unknown, null, undefined>) => {
      const transformObj = d3.zoomTransform(scrollGroup.node() as SVGGElement);
      // TODO: This approach is an alternative to not modify the resulting
      // d3.zoomTransform() object, but it needs some logic to work
      // const transformObj = { ...d3.zoomTransform(scrollGroup.node()) }

      const maxStartTranslate = 0;
      const maxEndTranslate =
        dimensions.boundedScrollHeight - dimensions.boundedHeight;

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

      const translateY = defaultTranslate + transformObj.y;
      scrollGroup
        .transition()
        .duration(0)
        .attr('transform', `translate(0, ${translateY})`);
    },
    [defaultTranslate, dimensions.boundedScrollHeight, dimensions.boundedHeight]
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
    scrollGroup.attr('transform', `translate(0, ${defaultTranslate})`);
  }, [defaultTranslate, ref, onScroll]);

  return {
    dimensions,
    ref,
    scrollGroupRef,
    yScale,
    yAccessorScaled,
    anchorEl,
    alertInfo,
    handlePopoverOpen,
    handlePopoverClose,
  };
};

export default useMovementsTimelineDataVertical;
