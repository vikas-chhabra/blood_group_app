import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Container, Header, Left, Body, Right, Title, Subtitle, Content, Button, Icon, Card, CardItem, } from 'native-base';
import { Font } from 'expo';

export default class DetailView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
            details:{
                "name": 'Loading...',
                "contactNo": "",
                "country": '',
                "state": '',
                "noOfDonors": '',
                "address": '',
            }
        }
    }
    render() {
        if (this.state.fontLoaded === true)
            return (
                <Container>
                    <StatusBar backgroundColor="#8E0E00" barStyle="light-content" translucent={false} />
                    <Header style={{ backgroundColor: '#8E0E00' }} androidStatusBarColor="#8E0E00">
                        <Left >
                            <Button transparent>
                                <Icon name='arrow-back' onPress={(e)=>{this.props.navigation.goBack()}}/>
                            </Button>
                        </Left>
                        <Body>
                            <Title>{this.state.details.name}</Title>
                            <Subtitle>Details</Subtitle>
                        </Body>
                        <Right />
                    </Header>
                    <Content>
                        <Card>
                            <CardItem header bordered>
                                <Text>Name : </Text>
                                <Text>{this.state.details.name}</Text>
                            </CardItem>
                            <CardItem header bordered>
                                <Text>State : </Text>
                                <Text>{this.state.details.state}</Text>
                            </CardItem>
                            <CardItem header bordered>
                                <Text>Contat no. : </Text>
                                <Text>{this.state.details.contactNo}</Text>
                            </CardItem>
                            <CardItem header bordered>
                                <Text>Country : </Text>
                                <Text>{this.state.details.country}</Text>
                            </CardItem>
                            <CardItem header bordered>
                                <Text>Number Of Donors : </Text>
                                <Text>{this.state.details.noOfDonors}</Text>
                            </CardItem>
                            <CardItem header bordered>
                                <Body>
                                    <Text>Address : {this.state.details.address}</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>
                </Container>
            );
        else {
            return (
                <View></View>
            )
        }
    }
    async componentDidMount() {
        await Font.loadAsync({
            'Roboto_medium': require('../../assets/fonts/Roboto-Medium.ttf'),
        });
        this.setState({ fontLoaded: true });
        this.setState({
            details:this.props.navigation.state.params.value
        })
    }
}