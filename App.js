import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/MainComponent';

export default class App extends React.Component {
  render() {
    return (
      <Main />
    );
  }
}