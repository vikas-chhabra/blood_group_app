import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,StatusBar,Dimensions} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import {Container,Content,Button,Form,Item,Label,Input} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {Font} from '../../util/Fonts'

export default class Login extends Component {
    static navigationOptions = {
        header: null
    }
    nextScreen=()=>{
      this.props.navigation.navigate('Pdf');
    }
  render(){
    firstHalf={
      height:250,
      width:Dimensions.get('window').width,
      backgroundColor:"#000"
    }
    secondHalf={
      borderColor:"#000",
      shadowOffset:{  width: 5,  height: 5,  },
      shadowColor: '#000',
      shadowOpacity: 0.3,
      borderRadius:10,
      height:Dimensions.get('window').height,
      width:Dimensions.get('window').width/1.2,
      position:'relative',
      marginTop:-60,
      marginBottom:120,
      alignSelf:'center',
      backgroundColor:'#fff',
    }
    return (
      <Container>
        <Container style={firstHalf}>
          <LinearGradient colors={['#4E69AE', '#4A62A0', '#845FD4']} style={styles.linearGradient}>
            <Content>
              <Button light style={styles.faIcon}>
                <FontAwesome style={styles.alignHome}>{Icons.home}</FontAwesome>
              </Button>
            </Content>
          </LinearGradient>
        </Container>
        <Container style={secondHalf}>
        <Content style={styles.loginContainer}>
          <Label style={styles.login}>LOGIN</Label>
          <Form>
            <Item floatingLabel>
              <Label style={styles.floatingLabel}>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel style={styles.floatingLabel}>
              <Label style={styles.floatingLabel}>Password</Label>
              <Input />
            </Item>
          </Form>
        </Content>
        </Container>
        <Button rounded primary style={styles.loginButton} onClick={(e)=>{this.nextScreen()}}>
            <Text style={styles.loginText}>LOGIN</Text>
          </Button>
        <StatusBar hidden/>
      </Container>
    );
  }
}

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  faIcon:{
    height:125,
    width:125,
    borderRadius:100,
    alignSelf:'center',
    marginTop:70,
  },
  alignHome:{
    marginLeft:23,
    fontSize:80,
    marginTop:-10,
    color:'#536CC1',
    alignSelf:'center',
    textAlign:'center'
  },
  login:{
    alignSelf:'center',
    fontSize:25,
    marginTop:15,
    fontFamily:Font.KaintMedium
  },
  loginContainer:{
    marginTop:20
  },
  loginButton:{
    width:Dimensions.get('window').width/1.8,
    alignSelf:'center',
    marginTop:Dimensions.get('window').height/1.28,
    position:'absolute',
    textAlign:'center',
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    backgroundColor:'#5F7FD4',
    shadowOffset:{  width: 5,  height: 5,  },
    shadowColor: '#4A62A0',
    shadowOpacity: 0.7,
  },
  loginText:{
    fontSize:15,
    textAlign:'center',
    color:'white',
    fontFamily:Font.KaintMedium

  },
  floatingLabel:{
    color:'#28579A',
    fontFamily:Font.Kaint

  }
});