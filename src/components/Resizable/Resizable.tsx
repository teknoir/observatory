import { ReactNode } from 'react';
import { Resizable, ResizableProps } from 're-resizable';

interface Props {
  children: ReactNode;
  enable?: ResizableProps['enable'];
}

const handleStyles = {
  top: {
    cursor: `url("/images/icons/resize-vertical.svg") 16 16, auto`,
  },
  bottom: {
    cursor: `url("/images/icons/resize-vertical.svg") 16 16, auto`,
  },
  right: {
    cursor: `url("/images/icons/resize-horizontal.svg") 12 16, auto`,
  },
  left: {
    cursor: `url("/images/icons/resize-horizontal.svg") 16 16, auto`,
  },
};

const ResizableComponent = ({ enable, children }: Props) => {
  return (
    <Resizable enable={enable} handleStyles={handleStyles}>
      {children}
    </Resizable>
  );
};

export default ResizableComponent;
