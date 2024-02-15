import { useEffect, useState } from 'react';
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
} from 'enums/queryKeys';
import {
  fetchAlert,
  fetchFeedback,
  sendFeedback,
  sendNotificationSeen,
} from 'services/apiRequests';
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import VideoPlayer from 'components/VideoPlayer/VideoPlayer';
import VideoPlayerStub from 'components/VideoPlayerStub/VideoPlayerStub';
import APP_URLS from 'enums/urls';
import { generatePath } from 'utils/router';
import { IAlertFormValues, EventStatus } from 'ts/types';
import Form from './Form/Form';
import Info from './Info/Info';
import styles from './Alert.module.scss';

const Alert = () => {
  const { detectionId = '' } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryKey = [alertKey, detectionId];
  const queryFeedbackKey = [feedbackKey, detectionId];
  const [showAlert, setShowAlert] = useState(false);
  const queryClient = useQueryClient();

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
  });

  const onSubmit = (values: IAlertFormValues) =>
    mutation.mutate({
      ...values,
      detection_id: detectionId,
      username: 'username',
    });

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
  } = data || {};
  const isNew = status === EventStatus.New;

  useEffect(() => {
    if (isNew) {
      mutationNotification.mutate(detectionId);
    }
  }, [isNew]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading || isLoadingFeedback) return <CircularProgress />;

  const { ground_truth, username, comment, creation_time } = dataFeedback || {};
  const isVerified = status === EventStatus.Verified;
  const hasVideo = !!videoUrl;
  const deviceUrl = generatePath(APP_URLS.devices, {
    peripheralId,
    peripheralName,
  });

  return (
    <>
      <AppBar>
        <Typography variant="LabelMedium">{peripheralName}</Typography>
      </AppBar>
      <MainContent className={styles.mainContent}>
        {hasVideo ? (
          <VideoPlayer
            url={videoUrl}
            posterUrl={videoSnapshot}
            autoPlay
            width="100%"
            className={styles.videoPlayer}
          />
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
