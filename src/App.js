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
        <Navtop />             
        <View />
        {renderStatus.modalView !== false && <ModalTemplate />} 
      </GroupListenerProvider>
    </AuthProvider>
    </>
  );
}

export default App;
