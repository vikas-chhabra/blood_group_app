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
                "disease": '',
                "donorName": "Loading...",
                "mobile": '',
                "bloodGroup": '',
                "dob": '',
                "address": '',
                "occupation": '',
                "gender": '',
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
                            <Title>{this.state.details.donorName}</Title>
                            <Subtitle>Details</Subtitle>
                        </Body>
                        <Right />
                    </Header>
                    <Content>
                        <Card>
                            <CardItem header bordered>
                                <Text>Name : </Text>
                                <Text>{this.state.details.donorName} ,{this.state.details.gender}, {this.state.details.bloodGroup}</Text>
                            </CardItem>
                            <CardItem header bordered>
                                <Text>State : </Text>
                                <Text>{this.state.details.state}</Text>
                            </CardItem>
                            <CardItem header bordered>
                                <Text>Contat no. : </Text>
                                <Text>{this.state.details.mobile}</Text>
                            </CardItem>
                            <CardItem header bordered>
                                <Text>Dob. : </Text>
                                <Text>{this.state.details.dob}</Text>
                            </CardItem>
                            <CardItem header bordered>
                                <Text>Occupation : </Text>
                                <Text>{this.state.details.occupation}</Text>
                            </CardItem>
                            <CardItem header bordered>
                                <Body>
                                    <Text>Address : {this.state.details.address}</Text>
                                </Body>
                            </CardItem>
                            <CardItem footer bordered>
                                <Text>Disease: {this.state.details.disease}</Text>
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