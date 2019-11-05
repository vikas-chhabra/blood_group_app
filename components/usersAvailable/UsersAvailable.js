import React, { Component } from 'react';
import { ListView, StatusBar, View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { Container, Header, Content, Button, Icon, List, ListItem, Text, Left, Body, Title, Subtitle, Right  } from 'native-base';
import {Font} from 'expo';
import Helper from '../../helper/Helper';

const { height: HEIGHT } = Dimensions.get('window');
const { width: WIDTH } = Dimensions.get('window');

export default class SwipeableListExample extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      activityIndicator:false,
      basic: true,
      listViewData: [{"email":'', 'active':''},],
      fontLoaded:false,
      baseUrl:'users/',
    };
  }
  fetchUsers=()=>{
    let res = Helper(this.state.baseUrl,'GET');
    res.then((res)=>{
        if(res.success===true){
            this.setState({
                listViewData:res.users
            })
        }
    })
  }
  toggleEntry=(id)=>{
    this.setState({
        activityIndicator:true
      })
    let res = Helper(this.state.baseUrl+id,'DELETE');
    res.then((res)=>{
        this.fetchUsers();
        this.setState({
            activityIndicator:false
          })
    })
}
  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    if(this.state.fontLoaded===true){
    return (
      <Container>
          {
               this.state.activityIndicator===true?( <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="red" />
            </View>):(<View></View>)
           }
       <StatusBar backgroundColor="#8E0E00" barStyle="light-content" translucent={false} />
        <Header style={{ backgroundColor: '#8E0E00' }} androidStatusBarColor="#8E0E00">
            <Left >
                <Button transparent>
                    <Icon name='arrow-back' onPress={(e)=>{this.props.navigation.navigate('Home')}}/>
                </Button>
            </Left>
            <Body>
                <Title>Users Available</Title>
                <Subtitle>Details</Subtitle>
            </Body>
            <Right />
        </Header>
        <Content>
          <List
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
                <ListItem>
                    <Text> {data.email}, {data.active===''?(''):data.active===false?('Inactive'):('Active')} </Text>
                  </ListItem>
                }
              
            renderLeftHiddenRow={data =>
              <Button full onPress={() => this.toggleEntry(data._id)}>
                <Icon active name="information-circle" />
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={_ => this.toggleEntry(data._id)}>
                <Icon active name="trash" />
              </Button>}
          />
        </Content>
      </Container>
    );}
    else{
        return(
            <View><Text>Loading Please Wait...</Text></View>
        )
    }
  }
  async componentDidMount() {
    this.fetchUsers();
    await Font.loadAsync({
        'Roboto_medium': require('../../assets/fonts/Roboto-Medium.ttf'),
    });
    this.setState({ fontLoaded: true });
}
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        position:'absolute',
        zIndex:10000,
        alignContent: 'center',
        alignItems: 'center',
        top: HEIGHT/2,
        left: WIDTH/2.4
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
      }
});