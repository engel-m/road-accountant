import React, { useContext } from 'react';
import { GlobalContext } from './context/GlobalState';
import { Navtop } from './components/Navtop';
import { LandingPage } from './components/LandingPage';
import { MainAppView } from './components/MainAppView';
import { Modals } from './components/Modals';

function App() {  
  const { renderStatus } = useContext(GlobalContext);
  return (     
    <>
    <Navtop />             
    {renderStatus.landingPage ? <LandingPage /> : <MainAppView />}           
    <Modals />
    </>
  );
}

export default App;
