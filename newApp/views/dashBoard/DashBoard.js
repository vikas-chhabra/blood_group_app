import React , { Component } from 'react';
import { View, StatusBar } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Container, Header, Title, Content, Button, Left, Right, Body, Text, ListItem, Switch, List, Icon } from "native-base";
import API from '../../helper/Helper';

class DashBoard extends Component{
    constructor(props){
        super(props);
        this.state={
            categories:[],
            items:[],
            count:{},
        }
    }
    static navigationOptions = {
        header: null
    }
    nextScreen=(obj)=>{
        this.props.navigation.navigate('Details',{obj});
    }
    componentWillMount(){
        this.fetchCategories();
        this.fetchItems();
    }
    fetchCategories=()=>{
        API.post(API.BASE_URL+'get-categories.php',{api_id:API.ID},(res)=>{
            this.setState({
                categories:res.categories
            });
        })

    }

    fetchItems=()=>{
        API.post(API.BASE_URL+'get-items.php',{api_id:API.ID},(res)=>{
            this.setState({
                items:res.items
            });
        })
    }
    extend=(obj,src)=>{
        Object.keys(src).forEach(function(key){obj[key]=src[key];});
        return obj;
    }
    increaseCount=(item)=>{
        if(this.state.count[item.id]!=undefined){
            let new_qty=this.state.count[item.id].qty+1;
            let new_price = new_qty*item.item_price;
            let obj = {};
            obj[item.id]={id:item.id,qty:new_qty,price:parseFloat(new_price),name:item.item_name};
            this.setState({
                count:this.extend(this.state.count,obj),
            });
        }
        else{
            let obj ={};
            obj[item.id]={id:item.id,qty:1,price:parseFloat(item.item_price),name:item.item_name};
            this.setState({
                count:this.extend(this.state.count,obj),
            });
        }
        
    }
    decreaseCount=(item)=>{
        if(this.state.count[item.id]!=undefined){
            if(this.state.count[item.id].qty!=1){
                let new_qty=this.state.count[item.id].qty-1;
                let new_price = new_qty*item.item_price;
                let obj = {};
                obj[item.id]={id:item.id,qty:new_qty,price:parseFloat(new_price),name:item.item_name};
                this.setState({
                    count:this.extend(this.state.count,obj),
                });
            }
            else{
                delete this.state.count[item.id];
                this.setState({
                    count:this.state.count,
                });
            }
        }
    }
    render(){
        return(
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
                        <Button transparent onPress={(e)=>{this.nextScreen(this.state.count)}}>
                        <Text>Order Now</Text>
                        </Button>
                    </Right>
                </Header>
                <StatusBar
                    backgroundColor="#FF4E50"
                    barStyle="light-content"
                    hidden={false}
                />
                <Content>
                    <List>
                        {
                            this.state.categories.map((categoriy,indexCategories)=>{
                                return(
                                    <View key={indexCategories}>
                                        <ListItem itemDivider>
                                            <Text>{categoriy.category_name}</Text>
                                        </ListItem>
                                        {
                                            this.state.items.map((item,index)=>{
                                                if(categoriy.category_name==item.category_name){
                                                    return(
                                                        <ListItem icon key={index}>
                                                    <Left>
                                                        <Button style={{ backgroundColor: "#ff4c4c" }}>
                                                            <FontAwesome style={{color: "#FFF",fontSize:24 }}>{Icons.angleRight}</FontAwesome>
                                                        </Button>
                                                    </Left>
                                                    <Body>
                                                        <Text>{item.item_name}</Text>
                                                        <Text style={{fontSize:13}}>Rs. {item.item_price} / Item</Text>
                                                    </Body>
                                                    <Right >
                                                        <Button style={{ backgroundColor: "transparent", width:35, height:35,elevation:0}} onPress={(e)=>{this.decreaseCount(item)}}>
                                                            <FontAwesome style={{color: "#DB7093",fontSize:26,alignSelf:'center' }}>{Icons.minusSquare}</FontAwesome>
                                                        </Button>
                                                        {
                                                            this.state.count[item.id]!=undefined?<Text>{this.state.count[item.id].qty}</Text>:<Text>0</Text>
                                                        }
                                                        <Button style={{ backgroundColor: "transparent", width:35, height:35,elevation:0}} onPress={(e)=>{this.increaseCount(item)}}>
                                                            <FontAwesome style={{color: "green",fontSize:26,marginLeft:10 }}>{Icons.plusSquare}</FontAwesome>
                                                        </Button>
                                                    </Right>
                                                </ListItem>
                                                    );
                                                }
                                            })
                                        }
                                    </View>
                                );
                            })
                        }
                    </List>
                </Content>
            </Container>
        );
    }
}
const styles={
    header:{
        backgroundColor:"#FF4E50"
    },
}

export default DashBoard;