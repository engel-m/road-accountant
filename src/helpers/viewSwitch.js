import { LandingPage } from '../components/views/Landing';
import { CreateAccount } from '../components/views/CreateAccount';
import { MainAppView } from '../components/views/MainAppView';
import { GroupSelect } from '../components/views/GroupSelect';
import { ForgotPassword } from '../components/views/ForgotPassword';

export const viewSwitch = (currentView) => {
  switch (currentView) {
  case 'Landing':     
    return LandingPage;
  case 'CreateAccount':     
    return CreateAccount;
  case 'MainAppView': 
    return MainAppView;
  case 'GroupSelect': 
    return GroupSelect;
  case 'ForgotPassword':
    return ForgotPassword;
  default:
    return 'none';
  } 
}