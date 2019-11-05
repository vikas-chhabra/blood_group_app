//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Alert, SafeAreaView, StatusBar, Text, TextInput, TouchableNativeFeedback, ActivityIndicator,Dimensions, RefreshControl } from 'react-native';
import { Container, Header, Content, List, ListItem, Icon, Left, Body, Right, Button, Title, Form, Picker, Item, Label, Input } from 'native-base';
import { Font } from 'expo';
import Helper from '../../helper/Helper'

const { height: HEIGHT } = Dimensions.get('window');
const { width: WIDTH } = Dimensions.get('window');


// create a component
class ListDonors extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false,
      getListOfAllBloodBanks: 'bloodBanks',
      listOfAllBloodBanks: [{'name':"Loading."}],
      selectedPickerValue: 'key0',
      valueToSearch:'',
      getListOfSearchedBloodBanks:'bloodBanks/filter/',
      refreshing: false
    }
  }
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getListOfAllBloodBanks();
  }
  getListOfAllBloodBanks = () => {
    let res = Helper(this.state.getListOfAllBloodBanks, 'GET');
    res.then((res) => {
    this.setState({refreshing: false});
      if (res.success === true) {
        this.setState({ listOfAllBloodBanks: res.bloodBanks, activityIndicator:false })
      }
    })
  }
  searchText=(e)=>{
      this.setState({
        activityIndicator:true
      })
      if(this.state.valueToSearch!==''){
        let res = Helper(this.state.getListOfSearchedBloodBanks+this.state.valueToSearch,'GET');
        res.then((res)=>{
            this.setState({
                activityIndicator:false
            })
            if(res.success===true){
                this.setState({listOfAllBloodBanks:res.filteredBloodBanks})
            }
        })
      }
      else{
          this.getListOfAllBloodBanks()
      }
  }
  handleBloodBankInformation = (e,value) =>{
    this.props.navigation.navigate('DetailViewBloodBank',{value})
  }
  //handle picker value and set this value to a state
  handlePickerValue = (value) => {
    this.setState({
      selectedPickerValue: value
    })
  }
  render() {
    if (this.state.fontLoaded) {
      return (
        <Container>
           {
               this.state.activityIndicator===true?( <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="red" />
            </View>):(<View></View>)
           }
          <StatusBar backgroundColor="#8E0E00" barStyle="light-content" translucent={false} />
          <SafeAreaView>
            <Header style={{ backgroundColor: '#8E0E00' }} androidStatusBarColor="#8E0E00">
              <Left>
                <Button transparent onPress={(e)=>{this.props.navigation.openDrawer()}}>
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                <Title>Blood Banks</Title>
              </Body>
              <Right>
                <Button transparent onPress={(e)=>{this.props.navigation.navigate('Home')}}>
                  <Icon name='arrow-back' />
                </Button>
              </Right>
            </Header>
          </SafeAreaView>
          <Content refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh}
                        />
                      }>
          <Form>
            <Item floatingLabel>
              <Label>Enter a State to search</Label>
              <Input onChangeText={(text) => this.setState({valueToSearch:text})} value={this.state.valueToSearch}/>
            </Item>
            <TouchableNativeFeedback >
            <Button block light onPress={(e)=>{this.searchText(e)}}>
            <Text>Search Now</Text>
            </Button>
          </TouchableNativeFeedback>
          </Form>
            <List>
            {this.state.listOfAllBloodBanks.map((v,i)=>{
                return(
                    <ListItem key={i} onPress={(e)=>{this.handleBloodBankInformation(e,v)}}>
                        {v.name==='Loading.'?(<Text>Loading, Please wait..</Text>):(<Text>{v.name}, {v.country}, {v.state}</Text>)}
                    </ListItem>
                )
            })}
          </List>
          </Content>
        </Container>
      )
    }
    else {
      return (
        <View></View>
      )
    }
  }
  async componentWillMount() {
    await Font.loadAsync({
      'Roboto_medium': require('../../assets/fonts/Roboto-Medium.ttf'),
    });
    this.getListOfAllBloodBanks();
    this.setState({ fontLoaded: true });
  }
}

// define your styles
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

//make this component available to the app
export default ListDonors;