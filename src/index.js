import React from 'react';
import ReactDOM from 'react-dom';
import './styles/App.css';
import './styles/index.css';
import './styles/balloon.min.css';
import './styles/animate.min.css';

import App from './App';
import { GlobalProvider } from './context/GlobalState';

ReactDOM.render(<GlobalProvider><App /></GlobalProvider>, document.getElementById('root'));


