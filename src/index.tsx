import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';
import './index.less';
import '!style-loader!css-loader!react-toastify/dist/ReactToastify.css';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    <HashRouter basename="/">
      <App />
      <ToastContainer />
    </HashRouter>
  </Provider>,
);
