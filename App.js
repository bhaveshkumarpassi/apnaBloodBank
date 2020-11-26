import React, { useState } from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react'
import {Loading} from './components/LoadingComponent';

const {persistor, store }= ConfigureStore();

export default class App extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      fontsLoaded: false
    }
  }

  render() {
    
      return (
        <Provider store={store} >
        <PersistGate
          loading={<Loading/>}
          persistor={persistor}
        >
        <Main />
        </PersistGate>
      </Provider>
      );
  }    
}