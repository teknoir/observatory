import { useNavigate } from 'react-router-dom';
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';
import styles from './GoBackButton.module.scss';

const GoBackButton = () => {
  const navigate = useNavigate();
  return (
    <IconButton className={styles.root} onClick={() => navigate(-1)}>
      <ArrowBackIosNew className={styles.icon} />
    </IconButton>
  );
};

export default GoBackButton;
