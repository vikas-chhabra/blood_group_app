import React,{ Component } from 'react';
import { AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './views/loginView/Login';
import DashBoard from './views/dashBoard/DashBoard';
import Details from './views/userDetails/Details';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      loggedin: false
    }
  }
  componentWillMount() {
    // AsyncStorage.removeItem('user_token');
    // AsyncStorage.removeItem('user_id');
    this.routeName();
  }

  routeName = async () => {
    let user_token = await AsyncStorage .getItem('user_token');    
    if (user_token !== null) {
      this.setState({
        loggedin: true
      })
    } else {
      this.setState({
        loggedin: false
      })
    }
  }

  render(){
    if(this.state.loggedin === true ) {
      return <DashBoardNavigator />
    } else {
      return <LoginNavigator />
    }
    
  }
}

const LoginNavigator = StackNavigator({
  Login: {
      screen: Login
  },
  DashBoard: {
      screen: DashBoard
  },
  Details:{
    screen: Details
  }
}, {initialRouteName: 'Login'});

const DashBoardNavigator = StackNavigator({
  Login: {
      screen: Login
  },
  DashBoard: {
      screen: DashBoard
  },
  Details:{
    screen: Details
  }
}, {initialRouteName: 'DashBoard'});
export default App;