import React,{ Component } from 'react';
import {View} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Login from './views/loginView/Login';
import Pdf from './views/pdf/Pdf';
import Youtube from './views/youtube/Youtube';

class App extends Component{
  render(){
    return(
      <Navigator/>
    );
  }
}
const Navigator = StackNavigator({
  InitialScreen: {
      screen: Youtube
  },
  Login: {
      screen: Login
  },
  Pdf: {
      screen: Pdf
  },
  Youtube:{
    screen:Youtube
  }
}, {initialRouteName: 'Pdf'});
export default App;