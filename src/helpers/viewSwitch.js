import { LandingPage } from '../components/LandingPage';
import { MainAppView } from '../components/MainAppView';
import { CreateAccount } from '../components/CreateAccount';

export const viewSwitch = (currentView) => {
  switch (currentView) {
  case 'LandingPage':     
    return LandingPage;
  case 'CreateAccount':     
    return CreateAccount;
  case 'MainAppView': 
    return MainAppView;
  default:
    return 'none';
  } 
}