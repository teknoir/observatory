import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useQueries, useMutation, useQueryClient } from '@tanstack/react-query';
import Typography from '@mui/material/Typography';
import AlertComponentMUI from 'muiComponents/Alert/Alert';
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import {
  alertKey,
  alertsRing,
  alertsByIdRing,
  feedbackKey,
  alerts,
  countEvents,
} from 'enums/queryKeys';
import {
  fetchAlert,
  fetchData,
  fetchFeedback,
  sendFeedback,
  sendNotificationSeen,
} from 'services/apiRequests';
import ContentBar from 'components/ContentBar/ContentBar';
import MainContent from 'components/MainContent/MainContent';
import VideoPlayer from 'components/VideoPlayer/VideoPlayer';
import VideoPlayerStub from 'components/VideoPlayerStub/VideoPlayerStub';
import APP_URLS from 'enums/urls';
import { generatePath } from 'utils/router';
import { IAlertFormValues, EventStatus, TimestampedDetection } from 'ts/types';
import Form from './Form/Form';
import Info from './Info/Info';
import styles from './Alert.module.scss';
import AnnotationsVideoCanvas from 'components/AnnotationsCanvas/AnnotationsVideoCanvas.tsx';
import ReactPlayer from 'react-player';

const Alert = () => {
  const { detectionId = '' } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryKey = [alertKey, detectionId];
  const queryFeedbackKey = [feedbackKey, detectionId];
  const [showAlert, setShowAlert] = useState(false);
  const queryClient = useQueryClient();
  const [timestampedDetections, setTimestampedDetections] = useState<
    TimestampedDetection[]
  >([]);
  const [nearestDetections, setNearestDetections] = useState<
    TimestampedDetection[]
  >([]);
  const [startTimestamp, setStartTimestamp] = useState<Date>(new Date());
  const [endTimestamp, setEndTimestamp] = useState<Date>(new Date());
  const playerRef = useRef<ReactPlayer | null>(null);

  const [
    { data, isLoading, refetch },
    {
      data: dataFeedback,
      isLoading: isLoadingFeedback,
      refetch: refetchFeedback,
    },
  ] = useQueries({
    queries: [
      {
        queryKey,
        queryFn: () => fetchAlert(detectionId, searchParams.get('type')),
        refetchOnWindowFocus: false,
      },
      {
        queryKey: queryFeedbackKey,
        queryFn: () => fetchFeedback(detectionId),
        refetchOnWindowFocus: false,
      },
    ],
  });

  const refetchAll = () => {
    refetch();
    refetchFeedback();
  };

  const mutation = useMutation({
    mutationFn: sendFeedback,
    onSuccess: () => {
      queryClient.refetchQueries({
        predicate: (query) => {
          const queryKey = query.queryKey[0];
          return queryKey === alertsRing || queryKey === alertsByIdRing;
        },
      });
      refetchAll();
      setShowAlert(true);
      setTimeout(() => {
        mutation.reset();
        setShowAlert(false);
      }, 2000);
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    },
  });

  const mutationNotification = useMutation({
    mutationFn: sendNotificationSeen,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [countEvents, alerts, EventStatus.New],
      });
    },
  });

  const onSubmit = (values: IAlertFormValues) =>
    mutation.mutate({
      ...values,
      detection_id: detectionId,
      username: 'username',
    });

  const parseTimestamp = (timestamp: string): Date => {
    return new Date(timestamp);
  };

  // Finds nearest records based on the target timestamp and time offset. The timestampedDetections array is already
  // sorted by timestamp in ascending order. Time offset is in milliseconds.
  function findNearestRecords(
    targetTimestamp: Date,
    timeOffset: number
  ): TimestampedDetection[] {
    const filteredDetections = timestampedDetections.filter(
      (record) =>
        Math.abs(record.timestamp.getTime() - targetTimestamp.getTime()) <=
        timeOffset
    );

    // group filteredDetections by detection.id and then select the nearest detection to the target timestamp.
    // this prevents multiple detections of the same object in the same frame
    const groupedDetections = filteredDetections.reduce(
      (acc, detection) => {
        const { id } = detection.detection;
        if (!acc[id] || acc[id].timestamp > detection.timestamp) {
          acc[id] = detection;
        }
        return acc;
      },
      {} as Record<string, TimestampedDetection>
    );

    // return the values of the grouped detections
    return Object.values(groupedDetections);
  }

  const {
    type,
    severity,
    peripheral_id: peripheralId,
    peripheral_name: peripheralName,
    start_time,
    duration,
    status,
    video_url: videoUrl,
    video_snapshot: videoSnapshot,
    annotations_url: annotationsUrl,
  } = data || {};
  const isNew = status === EventStatus.New;
  const hasVideo = !!videoUrl;
  const resetAnnotationsData = () => {
    setTimestampedDetections([]);
    setStartTimestamp(new Date());
    setEndTimestamp(new Date());
  };

  useEffect(() => {
    if (isNew) {
      mutationNotification.mutate(detectionId);
    }
  }, [isNew]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (hasVideo && annotationsUrl) {
      fetchData(annotationsUrl)
        .then((data) => {
          // Step 1: Sort the array by timestamp in ascending order
          const sortedData = data.detections.sort(
            (a: { timestamp: string }, b: { timestamp: string }) => {
              return (
                parseTimestamp(a.timestamp).getTime() -
                parseTimestamp(b.timestamp).getTime()
              );
            }
          );

          // Step 2: Map the sorted array to more readable data structure for binary search
          const mappedData = sortedData.map(
            (detection: { detection: object; timestamp: string }) => {
              return {
                detection: detection.detection,
                timestamp: parseTimestamp(detection.timestamp),
              };
            }
          );

          // Step 3: Set the new array to timestampedDetections
          setTimestampedDetections(mappedData);

          setStartTimestamp(parseTimestamp(data.metadata.start_time));
          setEndTimestamp(parseTimestamp(data.metadata.end_time));
        })
        .catch(() => {
          resetAnnotationsData();
        });
    } else {
      // clear the annotations data if no annotations url is available
      resetAnnotationsData();
    }
  }, [hasVideo, annotationsUrl]);

  if (isLoading || isLoadingFeedback) return <CircularProgress />;

  const { ground_truth, username, comment, creation_time } = dataFeedback || {};
  const isVerified = status === EventStatus.Verified;
  const deviceUrl = generatePath(APP_URLS.devices, {
    peripheralId,
    peripheralName,
  });
  const onDuration = (duration: number) => {
    // start timestamp from the annotations data can still differ compared to computed start timestamp
    // compute start timestamp by subtracting the duration from the end timestamp
    // and subtract 5.6 seconds as the start timestamp is still in advanced of the actual video frame
    // todo (PRO-1979): improve by using the actual video frame timestamps in the annotations data
    // todo (PRO-1979): check if the start timestamp is still in advanced of the actual video frame on production
    const newStartTimestamp = new Date(
      endTimestamp.getTime() - duration * 1000 - 5.6 * 1000
    );
    setStartTimestamp(newStartTimestamp);
  };
  const onProgress = (progress: { playedSeconds: number }) => {
    const timestamp = new Date(
      startTimestamp.getTime() + progress.playedSeconds * 1000
    );
    setNearestDetections(findNearestRecords(timestamp, 500));
  };
  // todo (PRO-1979): remove after release to production
  const featureFlagAlertAnnotation = false;

  return (
    <>
      <ContentBar>
        <Typography variant="LabelMedium">{peripheralName}</Typography>
      </ContentBar>
      <MainContent className={styles.mainContent}>
        {hasVideo ? (
          <div className={styles.wrapper}>
            <VideoPlayer
              id={'videoPlayer'}
              playerRef={playerRef}
              url={videoUrl}
              posterUrl={videoSnapshot}
              autoPlay
              width="100%"
              height="100%"
              className={styles.videoPlayer}
              progressInterval={100} // detections interval is min around ~100ms
              onDuration={onDuration}
              onProgress={onProgress}
            />
            {featureFlagAlertAnnotation && (
              <AnnotationsVideoCanvas
                timestampedDetections={nearestDetections}
                video={playerRef.current}
                className={styles.overlay}
              />
            )}
          </div>
        ) : (
          <div className={styles.videoStub}>
            <img
              src={videoSnapshot}
              alt="img"
              className={styles.videoSnapshot}
            />
            <VideoPlayerStub deviceUrl={deviceUrl} onClick={refetchAll} />
          </div>
        )}
        {isVerified && !showAlert ? (
          <Info
            username={username}
            creation_time={creation_time}
            type={type}
            severity={severity}
            peripheral_name={peripheralName}
            start_time={start_time}
            duration={duration}
            comment={comment}
            ground_truth={ground_truth}
          />
        ) : (
          <Form onSubmit={onSubmit} typeDetected={ground_truth || type} />
        )}
        {showAlert && (
          <AlertComponentMUI severity="success">
            The alert has been verified
          </AlertComponentMUI>
        )}
      </MainContent>
    </>
  );
};

export default Alert;
