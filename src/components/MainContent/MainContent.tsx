import { ReactNode } from "react";
import Main from 'layouts/TestLayout/components/Main';
import { useMainLayoutContext } from "context/mainLayoutContext";

interface Props {
  children: ReactNode;
}

const MainContent = ({ children }: Props) => {
  const { isOpenedLeft, isOpenedRight } = useMainLayoutContext();
  return (
    <Main open={isOpenedLeft} openRight={isOpenedRight}>
      {children}
    </Main>
  )
}

export default MainContent;
