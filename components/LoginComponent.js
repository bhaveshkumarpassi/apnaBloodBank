import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert, Switch, TouchableOpacity} from 'react-native';
import { Input, Button, Icon, Card, Avatar, Tooltip } from 'react-native-elements';
import {Picker} from 'native-base';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Toast } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ValidationComponent from 'react-native-form-validator';
import {connect} from 'react-redux';
import {addUser, fetchUsers, loginUser, logoutUser} from '../redux/ActionCreators';
import { auth } from '../firebase/firebase';
import {normalize} from '../assets/fonts/DynamicFontSize';


const mapStateToProps = (state) => {
    
    return {
        users: state.users,
        auth: state.auth
    };
}

const mapDispatchToProps = dispatch => {
    
    return {
        fetchUsers: () => dispatch(fetchUsers()),
        addUser: (user, creds) => dispatch(addUser(user, creds)),
        loginUser: (email, password, navigation) => dispatch(loginUser(email, password, navigation)),
        logoutUser: (navigation) => dispatch(logoutUser(navigation))
    };
}

class LoginTab extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        this._isMounted = true;
      }

    componentWillUnmount() {
        this._isMounted = false;
      }

    handleLogin(email, password) {

        this.props.loginUser(email, password, this.props.navigation);
        this.setState({
            email: '',
            password: ''
        })
    }

    handleLogout() {

        this.props.logoutUser(this.props.navigation);
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
                    secureTextEntry={true}
                    />
                </Card>
                <View style={styles.formButton}>
                    <TouchableOpacity style={{alignItems: "center",padding: 10}} onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={{padding: 20, fontWeight: 'bold', fontSize: normalize(16)}}>Don't have an account ? Go and register!</Text>
                    </TouchableOpacity>
                    <Button
                        onPress={() => this.handleLogin(this.state.email, this.state.password)}
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
                            backgroundColor: "#fa4659",
                            borderRadius: 30
                        }}
                        titleStyle={{padding: 20}}
                        containerStyle={{margin: 20}}
                        raised
                        />
                    <Button
                        onPress={() => this.handleLogout()}
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
                            backgroundColor: "#fa4659",
                            borderRadius: 30
                        }}
                        titleStyle={{padding: 20}}
                        containerStyle={{marginLeft: 20, marginRight: 20}}
                        raised
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }

}

class RegisterTab extends ValidationComponent {

    constructor(props) {
        super(props);

        this.state = {
            gender: 'Female',
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            bloodgroup: 'O+',
            age: '',
            contactnumber: '',
            locality: '',
            city: '',
            state: '',
            country: '',
            willing: true,
            disease: '',
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/apnabloodbankserver.appspot.com/o/uiImages%2Favatar1.png?alt=media&token=e1666ac9-8141-465c-b886-5eaf48b00119',
            blob: null
        };
    }

    componentDidMount() {
        this.unsubscribe =  auth.onAuthStateChanged(user => {
    
            if(user) {
              
              if(user.photoURL)
              {
                this.setState({
                imageUrl: user.photoURL
              });
            }
            else {
                this.setState({
                    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/apnabloodbankserver.appspot.com/o/uiImages%2Favatar1.png?alt=media&token=e1666ac9-8141-465c-b886-5eaf48b00119'
                  });
            }
            }
            else {
              this.setState({
                imageUrl: 'https://firebasestorage.googleapis.com/v0/b/apnabloodbankserver.appspot.com/o/uiImages%2Favatar1.png?alt=media&token=e1666ac9-8141-465c-b886-5eaf48b00119'
              })
            }
        })
    }
    
    componentWillUnmount() {
    
        this.unsubscribe();
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
    
    onDiseaseSelect() {

        Alert.alert(
            null,
            'Mention about any acute or' + '\n' + 'chronic disease from which You ' + '\n' + 'are currently suffering' + '\n' +'and which could be harmful if you ' + '\n' + 'donate/accept blood' + '\n' + 'You can update this as ' + '\n' + 'and when required in My Profile Section. Leave it blank if no such disease.',
          )
    }

    handleRegister(creds) {

        this.validate({
            gender: {required: true},
            email: {required: true},
            password: {required: true},
            firstname: {required: true},
            lastname: {required: true},
            bloodgroup: {required: true},
            age: {required: true, numbers: true},
            contactnumber: {required: true, numbers: true, minlength:10, maxlength: 10},
            locality: {required: true},
            city: {required: true},
            state: {required: true},
            country: {required: true},
            willing: {required: true}
        })

        if(this.isFormValid()) {
            
            auth.createUserWithEmailAndPassword(creds.email, creds.password)
            .then(async () => {
                var user = auth.currentUser;
                await this.props.addUser(user, creds);
                //await this.props.fetchUsers();
                Alert.alert(
                    'Registration Successful!!',
                    'Now you can head over to Home Screen. Kindly Restart the application.' 
                );

                this.setState({
                    gender: 'Female',
                    email: '',
                    password: '',
                    firstname: '',
                    lastname: '',
                    bloodgroup: 'O+',
                    age: '',
                    contactnumber: '',
                    locality: '',
                    city: '',
                    state: '',
                    country: '',
                    willing: true,
                    disease: '',
                    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/apnabloodbankserver.appspot.com/o/uiImages%2Favatar1.png?alt=media&token=e1666ac9-8141-465c-b886-5eaf48b00119',
                    blob: null
                    });
                    
                    this.props.navigation.navigate('Home');
            })
            .catch((error) => Alert.alert('Registeration Unsucessful!!', error.message));

        }
        else 
            Alert.alert(null,this.getErrorMessages());
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

        var image = await fetch(processedImage.uri);
        var Blob = await image.blob();

        console.log(processedImage);
        console.log(processedImage.uri);
        this.setState({
            imageUrl: processedImage.uri,
            blob: Blob
        });
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
                        buttonStyle={{margin: 10, backgroundColor: '#f0fff3', borderRadius: 28}}
                        titleStyle={{color: "black", fontWeight: "bold"}}
                        
                        />
                    <Button
                        title="From Gallery"
                        onPress={this.getImageFromGallery}
                        buttonStyle={{margin: 10, backgroundColor: '#f0fff3', borderRadius: 28}}
                        titleStyle={{color: "black", fontWeight: "bold"}}
                        />
                    </View>
                </View>
                <Input
                    placeholder="Email"
                    label=' Email address: '
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    inputContainerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Set a Password"
                    label=' Password: '
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    inputContainerStyle={styles.formInput}
                    secureTextEntry={true}
                    />
                <Input
                    placeholder="First Name"
                    label=' First Name: '
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    onChangeText={(firstname) => this.setState({firstname})}
                    value={this.state.firstname}
                    inputContainerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Last Name"
                    label=' Last Name: '
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
                    placeholder="Your Age"
                    label=' Age: '
                    onChangeText={(age) => this.setState({age})}
                    value={this.state.age}
                    inputContainerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Contact Number"
                    label=' Contact Number: '
                    leftIcon={{ type: 'font-awesome', name: 'phone-square' }}
                    onChangeText={(contactnumber) => this.setState({contactnumber})}
                    value={this.state.contactnumber}
                    inputContainerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Provide specific address (Building,locality,sector,ward)"
                    label=' Locality: '
                    leftIcon={{ type: 'font-awesome-5', name: 'address-card' }}
                    onChangeText={(locality) => this.setState({locality})}
                    value={this.state.locality}
                    inputContainerStyle={styles.formInput}
                    multiline
                    onTouchStart={() => Toast.show ({text: 'Preferably mention address where you spend most of your time. like, resendential/work-place, etc.', duration: 6000,textStyle: {textAlign: 'center'},
                    buttonStyle: {marginBottom: 40}})}
                    />
                <Input
                    placeholder=" city"
                    label=' City: '
                    leftIcon={{ type: 'font-awesome-5', name: 'address-card' }}
                    onChangeText={(city) => this.setState({city})}
                    value={this.state.city}
                    inputContainerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Resedential state"
                    label=' Resedential State: '
                    leftIcon={{ type: 'font-awesome-5', name: 'address-card' }}
                    onChangeText={(state) => this.setState({state})}
                    value={this.state.state}
                    inputContainerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Resedential country"
                    label=' Resedential Country: '
                    leftIcon={{ type: 'font-awesome-5', name: 'address-card' }}
                    onChangeText={(country) => this.setState({country})}
                    value={this.state.country}
                    inputContainerStyle={styles.formInput}
                    
                    />
                <Input 
                    placeholder="Medical details"
                    label=' Medical Details: '
                    multiline={true}
                    onTouchStart={() => this.onDiseaseSelect()}
                    onChangeText={(disease) => this.setState({disease})}
                    value={this.state.disease}
                    inputContainerStyle={styles.formInput}
                    
                />
                <Tooltip height={300} popover={<Text style={{color: 'white', fontSize: normalize(12)}}>Turn on the Switch Given if you want to be contacted when there is need of blood group of yours{'\n'}We recommend to turn it off if you have recently donated blood for your good health and this status can always be updated later when you feel you need to be contacted in My Profile section.</Text>}>
                <Text style={{marginLeft: 12, fontWeight: 'bold', marginRight: 12,marginBottom: 20, height: 40, textAlignVertical: 'center', fontSize: normalize(15)}}>Press here to get Details of below Switch!</Text>
                </Tooltip>
                <Switch
                    value={this.state.willing}
                    trackColor="#512DA8"
                    onValueChange={(value) => this.setState({ willing: value })}
                />
                <View style={{paddingBottom: 30}} />
            </Card>
            <View style={styles.formButton}>
                    <Button
                        onPress = {() => this.handleRegister(this.state)}
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
                            backgroundColor: "#fa4659",
                            borderRadius: 30
                        }}
                        raised
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
    formButton: {
        padding: 20
    }
});

const LoginTabNavigator = createBottomTabNavigator();

class Login extends Component {
    
    constructor(props) {

        super(props);
    }
    render() {
    
    const RegitserTabComponent = () => <RegisterTab registerUser={this.props.registerUser}
                                        addUser={this.props.addUser}
                                        errMess={this.props.auth.errMess}
                                        user={this.props.auth.user}
                                        navigation={this.props.navigation}
                                        fetchUsers={this.props.fetchUsers}
                                        />;
    const LoginTabComponent = () => <LoginTab loginUser={this.props.loginUser} 
                                        errMess={this.props.auth.errMess}
                                        user={this.props.auth.user}
                                        logoutUser={this.props.logoutUser}
                                        navigation={this.props.navigation}
                                        />;
    
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
            component = {LoginTabComponent}
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
            component = {RegitserTabComponent}
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);