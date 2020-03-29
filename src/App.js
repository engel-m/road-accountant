import React, { useContext } from 'react';
import { GlobalContext } from './context/GlobalState';
import { Navtop } from './components/Navtop';
// import { LandingPage } from './components/LandingPage';
// import { MainAppView } from './components/MainAppView';
import { ModalTemplate } from './components/ModalTemplate';
import { viewSwitch } from './helpers/viewSwitch';

function App() {  
  const { renderStatus } = useContext(GlobalContext);
  let View = viewSwitch(renderStatus.currentView);

  return (     
    <>
    <Navtop />             
    <View />
    {renderStatus.modalView && <ModalTemplate />} 
    </>
  );
}

export default App;
