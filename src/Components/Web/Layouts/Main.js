import MainDesktop from './Components/MainDesktop';
import { isMobileOnly } from 'react-device-detect';
import MainMobile from './Components/MainMobile';

const Main = ({ children }) => {

  return (
    <>
      {!isMobileOnly ? (
        <MainDesktop>{children}</MainDesktop>
      ) : (
        <MainMobile>{children}</MainMobile>
      )}
    </>
  );
};

export default Main;

// OK