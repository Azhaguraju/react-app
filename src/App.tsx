import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import RouterPage from '../src/routes'

function App() {
  return (
    <Provider store={store}>
      <div className="App main-container">
        <p className="employee-onboard">Employee Onboarding System</p>
        <RouterPage></RouterPage>
      </div>
    </Provider>
  );
}

export default App;
