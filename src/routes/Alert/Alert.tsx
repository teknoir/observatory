import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQueries, useMutation } from '@tanstack/react-query';
import Typography from '@mui/material/Typography';
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import { alertKey, feedbackKey } from 'enums/queryKeys';
import {
  fetchAlert,
  fetchFeedback,
  sendFeedback,
  sendNotificationSeen,
} from 'services/apiRequests';
import ContentBar from 'components/ContentBar/ContentBar';
import MainContent from 'components/MainContent/MainContent';
import VideoPlayer from 'components/VideoPlayer/VideoPlayer';
import { IAlertFormValues, EventStatus } from 'ts/types';
import Form from './Form/Form';
import Info from './Info/Info';
import styles from './Alert.module.scss';

const Alert = () => {
  const { detectionId = '' } = useParams();
  const queryKey = [alertKey, detectionId];
  const queryFeedbackKey = [feedbackKey, detectionId];

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
        queryFn: () => fetchAlert(detectionId),
        refetchOnWindowFocus: false,
      },
      {
        queryKey: queryFeedbackKey,
        queryFn: () => fetchFeedback(detectionId),
        refetchOnWindowFocus: false,
      },
    ],
  });

  const mutation = useMutation({
    mutationFn: sendFeedback,
    onSuccess: () => {
      refetch();
      refetchFeedback();
    },
  });

  const mutationNotification = useMutation({
    mutationFn: sendNotificationSeen,
  });

  useEffect(() => {
    mutationNotification.mutate(detectionId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (values: IAlertFormValues) =>
    mutation.mutate({
      ...values,
      detection_id: detectionId,
      username: 'username',
    });

  if (isLoading || isLoadingFeedback) return <CircularProgress />;
  const {
    type,
    severity,
    peripheral_name,
    start_time,
    duration,
    status,
    video_url: videoUrl,
    video_snapshot: videoSnapshot,
  } = data;
  const { ground_truth, username, comment, creation_time } = dataFeedback || {};
  const isVerified = status === EventStatus.Verified;

  return (
    <>
      <ContentBar>
        <Typography variant="LabelMedium">{data.peripheral_name}</Typography>
      </ContentBar>
      <MainContent className={styles.mainContent}>
        <div className={styles.videoPlayerWrapper}>
          <VideoPlayer
            url={videoUrl}
            posterUrl={videoSnapshot}
            autoPlay
            width="100%"
            height="100%"
          />
        </div>
        {isVerified ? (
          <Info
            username={username}
            creation_time={creation_time}
            type={type}
            severity={severity}
            peripheral_name={peripheral_name}
            start_time={start_time}
            duration={duration}
            comment={comment}
            ground_truth={ground_truth}
          />
        ) : (
          <Form onSubmit={onSubmit} />
        )}
      </MainContent>
    </>
  );
};

export default Alert;
