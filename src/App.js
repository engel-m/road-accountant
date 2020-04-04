import React, { useContext } from 'react';
import { GlobalContext } from './context/GlobalState';
import { Navtop } from './components/Navtop';
import { ModalTemplate } from './components/modals/ModalTemplate';
import { viewSwitch } from './helpers/viewSwitch';

function App() {  
  const { renderStatus } = useContext(GlobalContext);
  const View = viewSwitch(renderStatus.currentView);

  return (     
    <>
    <Navtop />             
    <View />
    {renderStatus.modalView !== false && <ModalTemplate />} 
    </>
  );
}

export default App;
