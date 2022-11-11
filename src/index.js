import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Bootstrap
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";


import { Provider } from 'react-redux';
import store, { persistor} from "./store/index";
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import  LoadingBar  from 'react-redux-loading-bar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}> 
      <div className="position-absolute w-100" style={{ zIndex: 100}}>
          <LoadingBar updateTime={100} className="bg-white" style={{ height: "2px" }}/>
      </div>
      <ToastContainer theme="colored"/>
      <App />
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
