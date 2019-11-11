import React, { Component } from 'react';
import { View, Text, ImageBackground, StatusBar, Dimensions, TextInput, AsyncStorage, Animated, Platform, TouchableOpacity, Alert, Modal, ToastAndroid } from 'react-native';
import { LinearGradient } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import Helper from '../../helper/Helper';
import { StackActions, NavigationActions } from 'react-navigation';
import * as LocalAuthentication from 'expo-local-authentication';

const { width: WIDTH } = Dimensions.get('window'); // width of window 
const { height: HEIGHT } = Dimensions.get('window');// height of widnow
const { OS: OS } = Platform;

class LoginView extends Component {

    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.state = {
            os: OS,
            username: '',
            password: '',
            isUserInputDesignSet: false,
            isPasswordInputDesignSet: false,
            usernameWidht: new Animated.Value(0),
            passwordWidth: new Animated.Value(0),
            compatible: false,
            fingerprints: false,
            result: '',
            modalVisible: false,
        }
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    componentDidMount() {
        this.checkDeviceForHardware();
        this.checkForFingerprints();
        this.loadStorage();
    }
    checkForFingerprints = async () => {
        let fingerprints = await LocalAuthentication.isEnrolledAsync();
        this.setState({ fingerprints })
    }
    scanFingerprint = async () => {
        let result = await LocalAuthentication.authenticateAsync('Scan your finger.');
        this.setState({ result: result.success })
        if (result.success) {
            ToastAndroid.showWithGravityAndOffset(
                'You are successfully Logged in...',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
            );
            this.setModalVisible(true)
            this.pushToDashboard()
        }
        else {
            alert("FingerPrint authentication failed, You have to login with your username and password.")
        }
    }
    loadStorage = async () => {
        try {
            let token = await AsyncStorage.getItem('token');
            if (token !== null) {
                this.scanFingerprint();
                this.setModalVisible(true)
            }
        }
        catch (err) {
            console.log("err");
        }
    }
    checkDeviceForHardware = async () => {
        let compatible = await LocalAuthentication.hasHardwareAsync();
        this.setState({ compatible })
    }
    pushToDashboard = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
        });
        this.props.navigation.dispatch(resetAction);
    }

    handleLogin = (e) => {
        let body = JSON.stringify({
            email: this.state.username,
            password: this.state.password
        })
        let res = Helper('users/login', "POST", body);
        res.then((res) => {
            if (res.success === true) {
                this.props.navigation.navigate("Dashboard");
                this.storeAuthToAsync(res.token);
            }
            else {
                Alert.alert(
                    'Error',
                    'Please enter correct Username/Password !',
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false },
                );
            }
        })
    }
    storeAuthToAsync = async (token) => {
        try {
            await AsyncStorage.setItem('token', token);
        } catch (error) {
            Alert.alert(
                'Sorry',
                'Something went wrong, Please try again later !!',
                [
                    { text: 'OK', },
                ],
                { cancelable: false },
            );
        }
    };
    toggleTextInputBox = (WhatToAnimate) => {
        if (WhatToAnimate === 'username') {
            this.setState({
                isUserInputDesignSet: !this.state.isUserInputDesignSet
            }, () => {
                if (this.state.isUserInputDesignSet) {
                    Animated.timing(
                        this.state.usernameWidht, {
                        toValue: 200,
                        duration: 400,
                    }
                    ).start();
                }
                else {
                    this.setState({
                        usernameWidht: new Animated.Value(0)
                    })
                }
            })
        }
        else if (WhatToAnimate === 'password') {
            this.setState({
                isPasswordInputDesignSet: !this.state.isPasswordInputDesignSet
            }, () => {
                if (this.state.isPasswordInputDesignSet) {
                    Animated.timing(
                        this.state.passwordWidth, {
                        toValue: 200,
                        duration: 400
                    }
                    ).start();
                }
                else {
                    this.setState({
                        passwordWidth: new Animated.Value(0)
                    })
                }
            })
        }
    }

    render() {
        return (
            <ImageBackground source={require('../../assets/city.jpg')} style={{ flex: 1, alignItems: 'center' }}>
                <StatusBar backgroundColor="#DD2476" barStyle="light-content" />
                <View style={{ flex: 1, width: WIDTH / 1.2, alignItems: 'center', justifyContent: 'center', }}>
                    <LinearGradient colors={['#FF512F', '#DD2476']} style={{ height: HEIGHT / 6, width: WIDTH / 1.4, zIndex: 1, elevation: 2, top: -HEIGHT / 4, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flex: 1, }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 25, color: '#fff', padding: 20, fontWeight: 'bold' }}>
                                    Log in
                                </Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <FontAwesome name="facebook-square" style={{ fontSize: 26, color: '#fff', padding: 2 }} />
                                <FontAwesome name="twitter" style={{ fontSize: 26, color: '#fff', padding: 2 }} />
                                <FontAwesome name="google-plus" style={{ fontSize: 26, color: '#fff', padding: 2 }} />
                            </View>
                        </View>
                    </LinearGradient>
                    <View style={{ flex: 3, backgroundColor: '#fff', height: HEIGHT / 1.8, width: WIDTH / 1.2, position: 'absolute', zIndex: 0, borderRadius: 8, alignContent: 'center', alignItems: 'center', opacity: 0.94 }}>
                        <View style={{ height: HEIGHT / 1.7 - HEIGHT / 7.8, width: 200, top: HEIGHT / 6 - 30, alignContent: 'center', justifyContent: 'space-around', alignItems: 'center' }}>
                            <View style={{ backgroundColor: '#fff' }}>
                                <Text style={{ fontSize: 18, color: 'grey' }}>
                                    Or Be Classical
                                </Text>
                            </View>
                            <View style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'space-around' }}>
                                <View style={{ flexDirection: 'row', padding: 7, paddingBottom: 0 }}>
                                    <FontAwesome name="user-circle-o" style={{ fontSize: 28, color: '#727578', padding: 10, }} />
                                    <View style={{ padding: 10, }}>
                                        <TextInput style={{ height: 20, width: 200 }} placeholder="Username.." onFocus={(e) => { this.toggleTextInputBox('username') }} onBlur={(e) => { this.toggleTextInputBox('username') }} onChangeText={(text) => this.setState({ username: text })}></TextInput>
                                        {
                                            this.state.isUserInputDesignSet ? (<Animated.View style={{ height: 2, width: this.state.usernameWidht, backgroundColor: '#DD2476' }}></Animated.View>) : (<View style={{ height: 1, width: 200, backgroundColor: 'grey' }}></View>)
                                        }
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', padding: 7, paddingBottom: 0 }}>
                                    <FontAwesome name="lock" style={{ fontSize: 33, color: '#727578', padding: 10, }} />
                                    <View style={{ padding: 10, paddingLeft: 12, }}>
                                        <TextInput style={{ height: 20, width: 200, color: '#000' }} secureTextEntry placeholder="Password.." onFocus={(e) => { this.toggleTextInputBox('password') }} onBlur={(e) => { this.toggleTextInputBox('password') }} onChangeText={(text) => this.setState({ password: text })}></TextInput>
                                        {
                                            this.state.isPasswordInputDesignSet ? (<Animated.View style={{ height: 2, width: this.state.passwordWidth, backgroundColor: '#DD2476' }}></Animated.View>) : (<View style={{ height: 1, width: 200, backgroundColor: 'grey' }} />)
                                        }
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity onPress={(e) => { this.handleLogin(e) }}>
                                <Text style={{ color: '#DD2476', fontSize: 16, marginBottom: 30 }}>Getting Started..</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false)
                    }}>
                    <View style={{ width: WIDTH, height: HEIGHT, backgroundColor: 'rgba(0,0,0,0.25)', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: WIDTH - 40, backgroundColor: "#fff", borderRadius: 30, padding: 20 }}>
                            <Text>You are already logged in Please authenticate with fingerprint to continue</Text>
                            <TouchableOpacity
                                style={{ marginTop: 20, padding: 10, }}
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </ImageBackground>
        );
    }
}

export default LoginView;