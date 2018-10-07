import React, { Component } from 'react';
import { View, TextInput, StyleSheet, StatusBar, AsyncStorage } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body,Button,Item,Input, Right, Left, Icon, Title, List, ListItem } from "native-base";
import API from '../../helper/Helper';

export default class Details extends Component {
    constructor(props){
        super(props);
        this.state={
            customer_name:'',
            customer_number:'',
            order_details:this.props.navigation.state.params.obj,
            total_price:null,
            resSubmission:[]
        }
    }
    componentWillMount(){
        let total_price = 0;
        Object.keys(this.state.order_details).map((id,index)=>{
            total_price = total_price+this.state.order_details[id].price
        })
        total_price=parseFloat(total_price);
        this.setState({
            total_price:total_price
        })
    }
    getMemberId=async()=>{
        try{
            let member_id = await AsyncStorage.getItem('user_id');
            this.submitTransaction(member_id);
        }
        catch(err){
            console.log("error while fetching member id "+err)
        }
    }
    submitTransaction=(member_id)=>{
        API.post(API.BASE_URL+'orders.php',{api_id:API.ID,items_data:this.state.order_details,customer_name:this.state.customer_name,customer_mobile_number:this.state.customer_number,total_price:this.state.total_price,member_id:member_id},(res)=>{
            this.setState({
                resSubmission:res
            });
            console.log(res);
        })
    }
  render() {
    return (
      <Container>
        <Header noLeft style={styles.header}>
            <Left>
                <Button transparent>
                <Icon name="arrow-back" />
                </Button>
            </Left>
            <Body>
                <Title>Sholay-The-BBQ</Title>
            </Body>
            <Right>
                <Button transparent>
                <Text>Order Now</Text>
                </Button>
            </Right>
        </Header>
        <StatusBar
            backgroundColor="#FF4E50"
            barStyle="light-content"
            hidden={false}
        />
        <Content padder>
          <Card>
            <CardItem  bordered>
                <View style={styles.header}>
                    <Text style={{fontSize:23,color:'orange',fontWeight:'bold',}}>Customer's Details</Text>
                </View>
            </CardItem>
            <CardItem bordered>
                <View style={{flex:1,flexDirection:'column',justifyContent:'flex-start',}}>
                    <View style={styles.content}>
                        <View style={{flex:1,flexDirection:'column',justifyContent:'center'}}>
                            <Text style={{fontSize:17}}>Customer name:</Text>
                        </View>
                        <View style={{flex:1,flexDirection:'column',justifyContent:'center'}}>
                            <Item rounded>
                                <TextInput placeholder='Enter customer name..' style={{fontSize:14,paddingLeft:6}} onChangeText={(customer_name) => this.setState({customer_name})}/>
                            </Item>  
                        </View> 
                    </View>
                    <View style={{ flex:1,flexDirection:'row',justifyContent:'flex-start',paddingTop:7}}>
                        <View style={{flex:1,flexDirection:'column',justifyContent:'center'}}>
                            <Text style={{fontSize:17}}>Mobile Number:</Text>
                        </View>
                        <View style={{flex:1,flexDirection:'column',justifyContent:'center'}}>
                            <Item rounded>
                                <TextInput keyboardType='numeric' placeholder='Enter mobile number..' style={{fontSize:14,paddingLeft:6}} maxLength={10} onChangeText={(customer_number) => this.setState({customer_number})}/>
                            </Item>  
                        </View> 
                    </View>
                </View>
            </CardItem>
            <CardItem  bordered>
                <View style={styles.header}>
                    <Text style={{fontSize:23,color:'orange',fontWeight:'bold',}}>Order Summary</Text>
                </View>
            </CardItem>
            <CardItem bordered>
            <View style={{flex:1,flexDirection:'column',justifyContent:'space-around'}}>
                    <List style={{paddingTop:10}}>
                        <ListItem noIndent>
                                <View style={{flex:1,flexDirection:'column',justifyContent:'center' }}>
                                    <Text style={{fontSize:17,fontWeight:'bold',textAlign:'center'}}>Item name</Text>
                                </View>
                                <View style={{flex:1,flexDirection:'column',justifyContent:'center',}}>
                                    <Text style={{fontSize:17,fontWeight:'bold',textAlign:'center'}}>Quantity</Text> 
                                </View> 
                                <View style={{flex:1,flexDirection:'column',justifyContent:'center'}}>
                                    <Text style={{fontSize:17,fontWeight:'bold',textAlign:'center'}}>Price</Text> 
                                </View> 
                        </ListItem>
                    </List>
                    <List >
                        {
                            Object.keys(this.state.order_details).map((id,index)=>{
                                return(
                                    <ListItem noIndent key={index} >
                                        <View style={{flex:1,flexDirection:'column',justifyContent:'flex-start'}}>
                                            <Text style={{fontSize:14}}>{this.state.order_details[id].name}</Text>
                                        </View>
                                        <View style={{flex:1,flexDirection:'column',justifyContent:'flex-start'}}>
                                            <Text style={{fontSize:14}}>{this.state.order_details[id].qty}</Text> 
                                        </View> 
                                        <View style={{flex:1,flexDirection:'column',justifyContent:'flex-start'}}>
                                            <Text style={{fontSize:14}}>{this.state.order_details[id].price}</Text> 
                                        </View> 
                                    </ListItem>
                                );
                            })
                        }
                        {/*  */}
                    </List>
                    <List style={{paddingTop:7}}>
                        <ListItem noIndent>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',alignItems:'flex-start'}}>
                                <View style={{flex:1,flexDirection:'column',justifyContent:'flex-start'}}>
                                    <Text style={{fontSize:17,fontWeight:'bold'}}>Total Price</Text>
                                </View>
                                <View style={{flex:1,flexDirection:'column',justifyContent:'flex-start'}}>
                                    <Text style={{fontSize:20,fontWeight:'bold'}}></Text>
                                </View>
                                <View style={{flex:1,flexDirection:'column',justifyContent:'flex-start'}}>
                                    <Text style={{fontSize:16}}>Rs. {this.state.total_price}</Text> 
                                </View> 
                            </View>
                        </ListItem>
                    </List>
                </View>
            </CardItem>
            <CardItem footer bordered>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Button rounded warning onPress={(e)=>{this.getMemberId()}}>
                    <Text>Submit</Text>
                </Button>
                </View>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
const styles=StyleSheet.create({
    header:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems: 'center',
    }
})
