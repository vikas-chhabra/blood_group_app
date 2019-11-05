import React from 'react';
import Main from './components/dashboard/Main';
import ListDonors from './components/list/ListDonors';
import {createAppContainer, createDrawerNavigator, createStackNavigator, DrawerItems} from 'react-navigation';
import LoginPage from './components/loginPage/LoginPage';
import BloodBank from './components/bloodBank/BloodBank';
import DetailView from './components/detailView/DetailView';
import DetailViewBloodBank from './components/detailViewBloodBank/DetailViewBloodBank';
import {Container, Content, Header, Body}from 'native-base'
import {Image, StatusBar} from 'react-native';
import UsersAvailable from './components/usersAvailable/UsersAvailable';

export default class App extends React.Component {

  render() {
    return (
      <MyApp />
    );
  }

}
const customDrawerComponent = (props) => (
  <Container>
    <StatusBar backgroundColor="#8E0E00" barStyle="light-content" translucent={false} />
    <Header style={{ backgroundColor: '#8E0E00', height: 200 }} androidStatusBarColor="#8E0E00">
      <Body style={{justifyContent:'center', alignItems: 'center',}}>
        <Image style={{height:150, width:150, borderRadius:75}} source={require('./assets/drawer.jpg')}/>
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>
  </Container>
)

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: Main,
  },
  "List Of All Donors": {
    screen: ListDonors,
  },
  "Blood Banks":{
    screen: BloodBank
  },
  "Users Available":{
    screen:UsersAvailable
  }
},{
  initialRouteName:'Home',
  contentComponent:customDrawerComponent,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'
});

const MyStackNavigator = createStackNavigator({
  Login:{
    screen:LoginPage
  },
  Dashboard:{
    screen:MyDrawerNavigator
  },
  DetailView:{
    screen:DetailView
  },
  DetailViewBloodBank:{
    screen:DetailViewBloodBank
  }
},{initialRouteName: 'Login',headerMode: 'none',
navigationOptions: {
    headerVisible: false,
}}
)
const MyApp = createAppContainer(MyStackNavigator);