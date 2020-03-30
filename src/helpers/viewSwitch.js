import { LandingPage } from '../components/views/Landing';
import { MainAppView } from '../components/views/MainAppView';
import { CreateAccount } from '../components/views/CreateAccount';

export const viewSwitch = (currentView) => {
  switch (currentView) {
  case 'Landing':     
    return LandingPage;
  case 'CreateAccount':     
    return CreateAccount;
  case 'MainAppView': 
    return MainAppView;
  default:
    return 'none';
  } 
}