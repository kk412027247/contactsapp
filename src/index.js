import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ContactsAppContainer from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ContactsAppContainer/>, document.getElementById('root'));
registerServiceWorker();
