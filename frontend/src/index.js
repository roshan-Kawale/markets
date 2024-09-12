import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'jotai';
import App from './App';
import { Toaster } from "../src/components/ui/toaster"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider>
      <App />
      <Toaster />
    </Provider>
  </React.StrictMode>
);