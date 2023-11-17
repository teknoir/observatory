import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import styleVariables from 'enums/styleVariables.module.scss';
import styles from './Tab.module.scss';

interface StyledTabProps {
  label: string;
}

const TabComponent = styled((props: StyledTabProps) => (
  <Tab
    disableRipple
    {...props}
    label={
      <div className={styles.labelRoot}>
        <div className={styles.typographyContainer}>
          <Typography variant="LabelLarge">{props.label}</Typography>
        </div>
        <div id="box"></div>
      </div>
    }
  />
))(() => ({
  textTransform: 'none',
  '&.MuiButtonBase-root.MuiTab-root.Mui-selected': {
    border: `1px solid ${styleVariables.offWhite}`,
    background: styleVariables.deepSpaceBlack,
    color: styleVariables.offWhite,
  },

  '&.MuiButtonBase-root.MuiTab-root.Mui-selected #box': {
    width: '28px',
    height: '28px',
    borderWidth: '1px 1px 0 0',
    borderStyle: 'solid',
    borderColor: styleVariables.offWhite,
  },
}));

export default TabComponent;
