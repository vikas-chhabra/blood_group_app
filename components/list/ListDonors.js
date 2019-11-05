//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Alert, SafeAreaView, StatusBar, Text, RefreshControl } from 'react-native';
import { Container, Header, Content, List, ListItem, Icon, Left, Body, Right, Button, Title, Form, Picker, Item } from 'native-base';
import { Font } from 'expo';
import Helper from '../../helper/Helper'

// create a component
class ListDonors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      getListOfAllDonorsUrl: 'donors/donorBloodInfo',
      listOfAllDonors: { "aPositive": [{ 'donorName': '' }], "bPositive": [{ 'donorName': '' }], "aNegative": [{ 'donorName': '' }], "bNegative": [{ 'donorName': '' }], "abPositive": [{ 'donorName': '' }], "abNegative": [{ 'donorName': '' }], "oPositive": [{ 'donorName': '' }], "oNegative": [{ 'donorName': '' }] },
      selectedPickerValue: 'key0',
      refreshing: false
    }
  }
  getListOfAllDonors = () => {
    let res = Helper(this.state.getListOfAllDonorsUrl, 'GET');
    res.then((res) => {
    this.setState({refreshing: false});      
      if (res.success === true) {
        this.setState({ listOfAllDonors: res })
      }
    })
  }
  //handle picker value and set this value to a state
  handlePickerValue = (value) => {
    this.setState({
      selectedPickerValue: value
    })
  }
  handleDonorInformation = (e,value) =>{
    this.props.navigation.navigate('DetailView',{value})
  }
  goToHome=(e)=>{
    this.props.navigation.navigate('Home')
  }
  openDrawer=(e)=>{
    this.props.navigation.openDrawer();
  }
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getListOfAllDonors();
  }
  render() {
    if (this.state.fontLoaded) {
      return (
        <Container>
          <StatusBar backgroundColor="#8E0E00" barStyle="light-content" translucent={false} />
          <SafeAreaView>
            <Header style={{ backgroundColor: '#8E0E00' }} androidStatusBarColor="#8E0E00">
              <Left>
                <Button transparent onPress={(e)=>{this.openDrawer(e)}}>
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                <Title>List of Donors</Title>
              </Body>
              <Right>
                <Button transparent onPress={(e)=>{this.goToHome(e)}}>
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
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  placeholder="Select your SIM"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selectedPickerValue}
                  onValueChange={(value) => { this.handlePickerValue(value) }}
                >
                  <Picker.Item label="All" value="key0" />
                  <Picker.Item label="O+" value="key1" />
                  <Picker.Item label="O-" value="key2" />
                  <Picker.Item label="B+" value="key3" />
                  <Picker.Item label="B-" value="key4" />
                  <Picker.Item label="A+" value="key5" />
                  <Picker.Item label="A-" value="key6" />
                  <Picker.Item label="AB+" value="key7" />
                  <Picker.Item label="AB-" value="key8" />
                </Picker>
              </Item>
            </Form>
            {
              this.state.selectedPickerValue === 'key0' ? (
                <List>
                  <ListItem itemDivider>
                    <Text>A+</Text>
                  </ListItem>
                  {this.state.listOfAllDonors.aPositive.map((v, i) => {
                    return (
                      <ListItem key={i} onPress={(e)=>{this.handleDonorInformation(e,v)}}>
                        <Text>{v.donorName}</Text>
                      </ListItem>
                    )
                  })}
                  <ListItem itemDivider>
                    <Text>A-</Text>
                  </ListItem>
                  {this.state.listOfAllDonors.aNegative.map((v, i) => {
                    return (
                      <ListItem key={i} onPress={(e)=>{this.handleDonorInformation(e,v)}}>
                        <Text>{v.donorName}</Text>
                      </ListItem>
                    )
                  })}
                  <ListItem itemDivider>
                    <Text>B+</Text>
                  </ListItem>
                  {this.state.listOfAllDonors.bPositive.map((v, i) => {
                    return (
                      <ListItem key={i} onPress={(e)=>{this.handleDonorInformation(e,v)}}>
                        <Text>{v.donorName}</Text>
                      </ListItem>
                    )
                  })}
                  <ListItem itemDivider>
                    <Text>B-</Text>
                  </ListItem>
                  {this.state.listOfAllDonors.bNegative.map((v, i) => {
                    return (
                      <ListItem key={i} onPress={(e)=>{this.handleDonorInformation(e,v)}}>
                        <Text>{v.donorName}</Text>
                      </ListItem>
                    )
                  })}
                  <ListItem itemDivider>
                    <Text>O+</Text>
                  </ListItem>
                  {this.state.listOfAllDonors.oPositive.map((v, i) => {
                    return (
                      <ListItem key={i} onPress={(e)=>{this.handleDonorInformation(e,v)}}>
                        <Text>{v.donorName}</Text>
                      </ListItem>
                    )
                  })}
                  <ListItem itemDivider>
                    <Text>O-</Text>
                  </ListItem>
                  {this.state.listOfAllDonors.oNegative.map((v, i) => {
                    return (
                      <ListItem key={i} onPress={(e)=>{this.handleDonorInformation(e,v)}}>
                        <Text>{v.donorName}</Text>
                      </ListItem>
                    )
                  })}
                  <ListItem itemDivider>
                    <Text>AB+</Text>
                  </ListItem>
                  {this.state.listOfAllDonors.abPositive.map((v, i) => {
                    return (
                      <ListItem key={i} onPress={(e)=>{this.handleDonorInformation(e,v)}}>
                        <Text>{v.donorName}</Text>
                      </ListItem>
                    )
                  })}
                  <ListItem itemDivider>
                    <Text>AB-</Text>
                  </ListItem>
                  {this.state.listOfAllDonors.abNegative.map((v, i) => {
                    return (
                      <ListItem key={i} onPress={(e)=>{this.handleDonorInformation(e,v)}}>
                        <Text>{v.donorName}</Text>
                      </ListItem>
                    )
                  })}
                </List>
              ) : this.state.selectedPickerValue === 'key1' ? (
                <List>
                  <ListItem itemDivider>
                    <Text>O+ Donors</Text>
                  </ListItem>
                  {this.state.listOfAllDonors.oPositive.map((v, i) => {
                    return (
                      <ListItem key={i} onPress={(e)=>{this.handleDonorInformation(e,v)}}>
                        <Text>{v.donorName}</Text>
                      </ListItem>
                    )
                  })}</List>) : this.state.selectedPickerValue === 'key2' ? (
                    <List>
                      <ListItem itemDivider>
                        <Text>O- Donors</Text>
                      </ListItem>
                      {this.state.listOfAllDonors.oNegative.map((v, i) => {
                        return (
                          <ListItem key={i} onPress={(e)=>{this.handleDonorInformation(e,v)}}>
                            <Text>{v.donorName}</Text>
                          </ListItem>
                        )
                      })}</List>
                  ) : this.state.selectedPickerValue === 'key3' ? (
                    <List>
                      <ListItem itemDivider>
                        <Text>B+ Donors</Text>
                      </ListItem>
                      {this.state.listOfAllDonors.bPositive.map((v, i) => {
                        return (
                          <ListItem key={i} onPress={(e)=>{this.handleDonorInformation(e,v)}}>
                            <Text>{v.donorName}</Text>
                          </ListItem>
                        )
                      })}</List>
                  ) : this.state.selectedPickerValue === 'key4' ? (
                    <List>
                      <ListItem itemDivider>
                        <Text>B- Donors</Text>
                      </ListItem>
                      {this.state.listOfAllDonors.bNegative.map((v, i) => {
                        return (
                          <ListItem key={i} onPress={(e)=>{this.handleDonorInformation(e,v)}}>
                            <Text>{v.donorName}</Text>
                          </ListItem>
                        )
                      })}</List>
                  ) : this.state.selectedPickerValue === 'key5' ? (
                    <List>
                      <ListItem itemDivider>
                        <Text>A+ Donors</Text>
                      </ListItem>
                      {this.state.listOfAllDonors.aPositive.map((v, i) => {
                        return (
                          <ListItem key={i} onPress={(e)=>{this.handleDonorInformation(e,v)}}>
                            <Text>{v.donorName}</Text>
                          </ListItem>
                        )
                      })}</List>
                  ) : this.state.selectedPickerValue === 'key6' ? (
                    <List>
                      <ListItem itemDivider>
                        <Text>A- Donors</Text>
                      </ListItem>
                      {this.state.listOfAllDonors.aNegative.map((v, i) => {
                        return (
                          <ListItem key={i} onPress={(e)=>{this.handleDonorInformation(e,v)}}>
                            <Text>{v.donorName}</Text>
                          </ListItem>
                        )
                      })}</List>
                  ) : this.state.selectedPickerValue === 'key7' ? (
                    <List>
                      <ListItem itemDivider>
                        <Text>AB+ Donors</Text>
                      </ListItem>
                      {this.state.listOfAllDonors.abPositive.map((v, i) => {
                        return (
                          <ListItem key={i} onPress={(e)=>{this.handleDonorInformation(e,v)}}>
                            <Text>{v.donorName}</Text>
                          </ListItem>
                        )
                      })}</List>
                  ) : this.state.selectedPickerValue === 'key8' ? (
                    <List>
                      <ListItem itemDivider>
                        <Text>AB- Donors</Text>
                      </ListItem>
                      {this.state.listOfAllDonors.abNegative.map((v, i) => {
                        return (
                          <ListItem key={i} onPress={(e)=>{this.handleDonorInformation(e,v)}}>
                            <Text>{v.donorName}</Text>
                          </ListItem>
                        )
                      })}</List>
                  ) : (<Text>Something went Wrong Please try again later</Text>)
            }
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
    this.getListOfAllDonors();
    this.setState({ fontLoaded: true });
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default ListDonors;