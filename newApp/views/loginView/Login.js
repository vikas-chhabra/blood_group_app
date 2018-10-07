import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, Dimensions, AsyncStorage } from 'react-native';
import { Font } from '../../util/Fonts';
import { Container, Content, Button, Form, Item, Label, Input } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import API from '../../helper/Helper';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.loadStorage();
    this.state={
      username:'',
      password:'',
      resAPI:[]
    }
  }
  loadStorage=async()=>{
    try{
      let user_id = await AsyncStorage .getItem('user_id');
      let user_token = await AsyncStorage .getItem('user_token');      
      API.post(API.BASE_URL+'login-token-checker.php',{api_id:API.ID,member_id:user_id,token:user_token},(res)=>{
        if(res.response===true){
          this.props.navigation.navigate('DashBoard');
        }
      })
    }
    catch(err){
      console.log("err");
    }
  }
    static navigationOptions = {
        header: null
    }
    nextScreen=()=>{
      API.post(API.BASE_URL+'login.php',{api_id:API.ID,username:this.state.username,password:this.state.password},(res)=>{
        this.setState({
            resAPI:res
        });
        if(res.msg==='success'){
          this.props.navigation.navigate('DashBoard',{res});
          console.log(res);
          AsyncStorage.setItem('user_id',res.id);
          AsyncStorage.setItem('user_token',res.token);
        }
    })
    }
  render(){
    firstHalf={
      height:Dimensions.get('window').height/2.2,
      width:Dimensions.get('window').width,
      backgroundColor:"#000"
    }
    secondHalf={
      borderColor:"#000",
      elevation:2,
      shadowOffset:{  width: 5,  height: 5,  },
      shadowColor: '#000',
      shadowOpacity: 0.3,
      borderRadius:10,
      height:Dimensions.get('window').height/2.2,
      width:Dimensions.get('window').width/1.2,
      position:'relative',
      marginTop:-60,
      marginBottom:120,
      alignSelf:'center',
      backgroundColor:'#fff',
    }
    return (
      <Container>
        <Content>
        <View style={firstHalf}>
          <LinearGradient colors={['#870000', '#190A05']} style={styles.linearGradient}>
            <Content>
              <View light style={styles.faIcon}>
                <Image style={styles.alignHome} source={require('../../assets/images/stb.jpeg')}/>
              </View>
            </Content>
          </LinearGradient>
        </View>
        <View style={secondHalf}>
        <View style={styles.loginContainer}>
          <Label style={styles.login}>LOGIN</Label>
          <Form>
            <Item floatingLabel>
              <Label style={styles.floatingLabel}>Username</Label>
              <Input 
                autoCapitalize="none"
                onChangeText={(username) => this.setState({username})}
                
              />
            </Item>
            <Item floatingLabel style={styles.floatingLabel}>
              <Label style={styles.floatingLabel}>Password</Label>
              <Input 
                autoCapitalize="none"
                onChangeText={(password) => this.setState({password})}
                secureTextEntry
              />
            </Item>
          </Form>
        </View>
        </View>
        <Button rounded primary style={styles.loginButton} onPress={(e)=>{this.nextScreen()}}>
            <Text style={styles.loginText}>LOGIN</Text>
          </Button>
        <StatusBar hidden/>
        </Content>
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
    height:155,
    width:155,
    borderRadius:100,
    alignSelf:'center',
    marginTop:70,
    backgroundColor:'#fff'
  },
  alignHome:{
    height:70,
    width:125,
    marginTop:40,
    justifyContent:'center',
    alignSelf:'center'
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
    marginTop:Dimensions.get('window').height/1.27,
    position:'absolute',
    textAlign:'center',
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    backgroundColor:'#870000',
    shadowOffset:{  width: 5,  height: 5,  },
    shadowColor: '#990000',
    shadowOpacity: 0.7,
  },
  loginText:{
    fontSize:15,
    textAlign:'center',
    color:'white',
    fontFamily:Font.KaintMedium

  },
  floatingLabel:{
    color:'#000',
    fontFamily:Font.Kaint

  }
});