import { ReactNode } from 'react';
import { Resizable, ResizableProps } from 're-resizable';

interface Props {
  children: ReactNode;
}

const basename = import.meta.env.VITE_APP_BASENAME || '/';

const handleStyles = {
  top: {
    cursor: `url("${basename}images/icons/resize-vertical.svg") 16 16, auto`,
  },
  bottom: {
    cursor: `url("${basename}images/icons/resize-vertical.svg") 16 16, auto`,
  },
  right: {
    cursor: `url("${basename}images/icons/resize-horizontal.svg") 12 16, auto`,
  },
  left: {
    cursor: `url("${basename}images/icons/resize-horizontal.svg") 16 16, auto`,
  },
};

const ResizableComponent = ({ children, ...rest }: ResizableProps & Props) => {
  return (
    <Resizable {...rest} handleStyles={handleStyles}>
      {children}
    </Resizable>
  );
};

export default ResizableComponent;
