// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Typography from '@mui/material/Typography';
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import { alertKey } from 'enums/queryKeys';
import { fetchAlert, verifyAlert } from 'services/apiRequests';
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import VideoPlayer from 'components/VideoPlayer/VideoPlayer';
import { IAlertEvent, IAlertFormValues } from 'ts/types';
import Form from './Form/Form';
import Info from './Info/Info';
import styles from './Alert.module.scss';

const Alert = () => {
  const { detectionId = '' } = useParams();
  const queryClient = useQueryClient();
  const queryKey = [alertKey, detectionId];

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => fetchAlert(detectionId),
  });

  const mutation = useMutation({
    mutationFn: verifyAlert,
    onSuccess: (data: IAlertFormValues) => {
      queryClient.setQueryData(queryKey, (oldData: IAlertEvent) => ({
        ...oldData,
        ...data,
        is_verified: true,
      }));
    },
  });

  const onSubmit = (values: IAlertFormValues) =>
    mutation.mutate({ detectionId, values });

  if (isLoading) return <CircularProgress />;

  const { type, severity, peripheral_name, start_time, end_time } = data;

  // TODO: it's temporary solution, we need to use real data here
  let {
    name = '',
    date = '',
    is_verified: isVerified = false,
    has_theft: hasTheft = false,
    comment = '',
  } = data;
  if (detectionId.slice(-1).match(/[a-z]/i)) {
    name = 'John';
    date = '2021-10-10';
    isVerified = true;
    hasTheft = true;
    comment =
      'TEST: We double check this and was actually a theft, called the police at 15:42.';
  }

  return (
    <>
      <AppBar>
        <Typography variant="LabelMedium">{data.peripheral_name}</Typography>
      </AppBar>
      <MainContent className={styles.mainContent}>
        <VideoPlayer
          className={styles.videoPlayer}
          url={data.video_url}
          width="100%"
        />
        {isVerified ? (
          <Info
            name={name}
            date={date}
            type={type}
            severity={severity}
            peripheralName={peripheral_name}
            startTime={start_time}
            endTime={end_time}
            comment={comment}
            hasTheft={hasTheft}
          />
        ) : (
          <Form onSubmit={onSubmit} />
        )}
      </MainContent>
    </>
  );
};

export default Alert;
