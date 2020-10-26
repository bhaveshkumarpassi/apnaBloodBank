import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/MainComponent';
import * as SplashScreen from 'expo-splash-screen';

export default class App extends React.Component {

  render() {

    return (
      <Main />
    );
  }
}