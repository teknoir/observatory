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
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import VideoPlayer from 'components/VideoPlayer/VideoPlayer';
import { IAlertFormValues } from 'ts/types';
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
      },
      {
        queryKey: queryFeedbackKey,
        queryFn: () => fetchFeedback(detectionId),
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
    is_verified: isVerified = false,
    type,
    severity,
    peripheral_name,
    start_time,
    duration,
  } = data;
  const { ground_truth, username, comment, creation_time } = dataFeedback || {};

  return (
    <>
      <AppBar>
        <Typography variant="LabelMedium">{data.peripheral_name}</Typography>
      </AppBar>
      <MainContent className={styles.mainContent}>
        <VideoPlayer
          url={data.video_url}
          width="100%"
          className={styles.videoPlayer}
        />
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
