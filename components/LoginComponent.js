import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, KeyboardAvoidingView, Platform} from 'react-native';
import { Input, CheckBox, Button, Icon, Card, Avatar } from 'react-native-elements';
import {Picker} from 'native-base';
//import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
//import * as Asset from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { baseUrl } from '../shared/baseUrl';

class LoginTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }


    render() {
        return (
            <ScrollView style={{backgroundColor: '#f0fff3'}}>
            <View
                style={styles.container}
            >
                <Card containerStyle={{borderRadius: 30, backgroundColor: '#ffcac2'}}>
                <Input
                    placeholder="Email"
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    inputContainerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    inputContainerStyle={styles.formInput}
                    />
                </Card>
                    <View style={styles.formButton}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Register')}
                        title="Register"
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'            
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: "#fa4659"
                        }}
                        titleStyle={{padding: 20}}
                        containerStyle={{marginLeft: 20, marginRight: 20}}
                        />
                    <Button
                        onPress={() => this.handleLogin()}
                        title="Login"
                        icon={
                            <Icon
                                name='sign-in'
                                type='font-awesome'            
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: "#fa4659"
                        }}
                        titleStyle={{padding: 20}}
                        containerStyle={{margin: 20}}
                        />
                    <Button
                        onPress={() => this.handleLogin()}
                        title="Logout"
                        icon={
                            <Icon
                                name='sign-out'
                                type='font-awesome'            
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: "#fa4659"
                        }}
                        titleStyle={{padding: 20}}
                        containerStyle={{marginLeft: 20, marginRight: 20}}
                        />
                    </View>
            </View>
            </ScrollView>
        );
    }

}

class RegisterTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gender: 'Male',
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            bloodgroup: 'O+',
            contactnumber: '',
            address: '',
            willing: false,
            disease: '',
            imageUrl: './images/avatar1.png'
        };
    }
    onGenderValueChange(value) {
        this.setState({
          gender: value
        });
      }
    onBloodGroupValueChange(value) {
        this.setState({
          bloodgroup: value
        });
      }

      getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [5, 5],
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                this.processImage(capturedImage.uri);
            }
        }

    }

    getImageFromGallery = async () => {
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if(cameraRollPermission.status === 'granted') {
            let selectedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [5, 5]
            })
            if(!selectedImage.cancelled) {
                console.log(selectedImage);
                this.processImage(selectedImage.uri);
            }
        }
    }

    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulateAsync(
            imageUri, 
            [
                {resize: {width: 400}}
            ],
            {format: 'png'}
        );
        console.log(processedImage);
        this.setState({imageUrl: processedImage.uri });
    }

    handleRegister() {
        console.log(JSON.stringify(this.state));
    }

    render() {
        return(
            <ScrollView>
            <View style={styles.container}>
                <Card containerStyle={{backgroundColor: '#ffcac2', borderRadius: 30}}>
                <View style={styles.imageContainer}>
                    <Avatar rounded
                    size="xlarge"
                    source={{uri: this.state.imageUrl}}
                    icon={{name: 'user', type: 'font-awesome'}}
                />
                    <View>
                    <Button
                        title="From Camera"
                        onPress={this.getImageFromCamera}
                        buttonStyle={{margin: 10, backgroundColor: '#f0fff3'}}
                        titleStyle={{color: "black", fontWeight: "bold"}}
                        />
                    <Button
                        title="From Gallery"
                        onPress={this.getImageFromGallery}
                        buttonStyle={{margin: 10, backgroundColor: '#f0fff3'}}
                        titleStyle={{color: "black", fontWeight: "bold"}}
                        />
                    </View>
                </View>
                <Input
                    placeholder="Email"
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    inputContainerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    inputContainerStyle={styles.formInput}
                    secureTextEntry={true}
                    />
                <Input
                    placeholder="First Name"
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    onChangeText={(firstname) => this.setState({firstname})}
                    value={this.state.firstname}
                    inputContainerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Last Name"
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    onChangeText={(lastname) => this.setState({lastname})}
                    value={this.state.lastname}
                    inputContainerStyle={styles.formInput}
                    />
                <Picker
                    style={styles.formInput}
                    selectedValue={this.state.gender}
                    onValueChange={this.onGenderValueChange.bind(this)}
                >
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                    <Picker.Item label="Others" value="Others" />
                </Picker>
                <Picker
                    style={styles.formInput}
                    selectedValue={this.state.bloodgroup}
                    onValueChange={this.onBloodGroupValueChange.bind(this)}
                >
                    <Picker.Item label="O+" value="O+" />
                    <Picker.Item label="O-" value="O-" />
                    <Picker.Item label="A+" value="A+" />
                    <Picker.Item label="A-" value="A-" />
                    <Picker.Item label="B+" value="B+" />
                    <Picker.Item label="B-" value="B-" />
                    <Picker.Item label="AB+" value="AB+" />
                    <Picker.Item label="AB-" value="AB-" />
                </Picker>
                <Input
                    placeholder="Contact Number"
                    leftIcon={{ type: 'font-awesome', name: 'phone-square' }}
                    onChangeText={(contactnumber) => this.setState({contactnumber})}
                    value={this.state.contactnumber}
                    inputContainerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Address (sector/ street/ ward,city,state,country : format)"
                    multiline={true}
                    leftIcon={{ type: 'font-awesome-5', name: 'address-card' }}
                    onChangeText={(address) => this.setState({address})}
                    value={this.state.address}
                    inputContainerStyle={styles.formInput}
                    />
                <Input 
                    placeholder="Mention any acute or chronic disease from which you are suffering which can be harmful if you are a donor or acceptor."
                    multiline={true}
                    onChangeText={(disease) => this.setState({disease})}
                    value={this.state.disease}
                    inputContainerStyle={styles.formInput}
                />
                <CheckBox title="Willing to Donate ?"
                    center
                    checked={this.state.willing}
                    onPress={() => this.setState({willing: !this.state.willing})}
                    inputContainerStyle={styles.formCheckbox}
                    />
                <View style={{paddingBottom: 30}} />
            </Card>
            <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleRegister()}
                        title=" Register"
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'            
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: "#fa4659"
                        }}
                        />
                </View>
            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: "#f0fff3",
        paddingTop: 30
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    image: {
      margin: 10,
      width: 80,
      height: 60
    },
    formInput: {
        margin: 5
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: '#f0fff3'
    },
    formButton: {
        padding: 80
    }
});

const LoginTabNavigator = createBottomTabNavigator();

function Login(props) {

    return (

    <LoginTabNavigator.Navigator
        initialRouteName="Login"
        tabBarOptions = {{
            initialRouteName: 'Login',
            activeBackgroundColor: '#11cbd7',
            inactiveBackgroundColor: '#c6f1e7',
            activeTintColor: '#ffffff',
            inactiveTintColor: 'gray'
        }}>
        <LoginTabNavigator.Screen
            name = "Login"
            component = {LoginTab}
            options = {{
                title: 'Login',
                tabBarIcon: ({ color: tintColor }) => (
                    <Icon
                      name='sign-in'
                      type='font-awesome'            
                      size={24}
                      iconStyle={{ color: tintColor }}
                    />
                  )
            }}
            >
        </LoginTabNavigator.Screen>
        <LoginTabNavigator.Screen
            name = "Register"
            component = {RegisterTab}
            options = {{
                title: 'Register',
                tabBarIcon: ({ color: tintColor }) => (
                    <Icon
                      name='user-plus'
                      type='font-awesome'            
                      size={24}
                      iconStyle={{ color: tintColor }}
                    />
                  ) 
            }}
            >
        </LoginTabNavigator.Screen>
    </LoginTabNavigator.Navigator>
    
    );
}

export default Login;