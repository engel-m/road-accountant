import React, { useContext } from 'react';
import { GlobalContext } from './context/GlobalState';
import { AuthProvider } from './context/AuthContext';
import { GroupListenerProvider } from './context/GroupListener';
import { Navtop } from './components/Navtop';
import { ModalTemplate } from './components/modals/ModalTemplate';
import { viewSwitch } from './helpers/viewSwitch';

function App() {  
  const { renderStatus } = useContext(GlobalContext);
  const View = viewSwitch(renderStatus.currentView);

  return (     
    <>
    <AuthProvider>
      <GroupListenerProvider>
        <img src="./img/car-driving.png" alt="car-driving" className="w-1/6 hidden md:block absolute left-0 bottom-0 ml-8 mb-12 -z-10 "/>
        <Navtop /> 
        <View />      
        {renderStatus.modalView !== false && <ModalTemplate />} 
      </GroupListenerProvider>
    </AuthProvider>
    </>
  );
}

export default App;
