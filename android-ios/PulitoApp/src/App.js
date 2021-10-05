import * as React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { View, Text } from 'react-native';
import Login from './pages/login.js';



function App() {
  return (
    <View>     
    <View><Login/></View>
    </View>
  );
}

export default App;