import React, {Component} from 'react';
import { View, Image, ImageBackground, Text, StyleSheet, Dimensions, ActivityIndicator, Switch, Alert} from 'react-native';
import { auth, firestore, fireauth, firebasestore } from '../firebase/firebase';
import {Icon, Button, Card, Input} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {normalize} from '../assets/fonts/DynamicFontSize';
import { connect } from 'react-redux';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { profileUpdate } from '../redux/ActionCreators';
import { fetchUsers } from '../redux/ActionCreators';
import { Loading } from './LoadingComponent';

const  mapStateToProps = (state) => {
    return{
        users: state.users
    };
}

const mapDispatchToProps = dispatch => {
    
    return {
        fetchUsers: () => dispatch(fetchUsers()),
        profileUpdate: (newCreds, docId, User, navigation) => dispatch(profileUpdate(newCreds, docId, User, navigation))
    };
}

class Profile extends Component {

    constructor(props) {

        super(props);
        this.state = {
            isAuthenticated: false,
            editable: false,
            gender: '',
            bloodgroup: '',
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            contactnumber: '',
            locality: '',
            city: '',
            state: '',
            country: '',
            willing: true,
            disease: '',
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/apnabloodbankserver.appspot.com/o/uiImages%2Favatar1.png?alt=media&token=e1666ac9-8141-465c-b886-5eaf48b00119',
            blob: null,
            User: null,
            docId: '',
        }
    }

    componentDidMount() {
        this.unsubscribe =  auth.onAuthStateChanged(user => {
    
            if(user) {

            var User = this.props.users.users.filter(usr => usr.uid === user.uid)[0];

              this.setState({
                isAuthenticated: true,
                gender: User.gender,
                bloodgroup: User.bloodgroup,
                email: User.email,
                password: User.password,
                firstname: User.firstname,
                lastname: User.lastname,
                contactnumber: User.contactnumber,
                locality: User.locality,
                city: User.city,
                state: User.state,
                country: User.country,
                willing: User.willing,
                disease: User.disease,
                imageUrl: User.imageUrl,
                blob: null,
                docId: User._id.toString(),
                User: User
              })
            }
            else {
              this.setState({
                isAuthenticated: false,
              })
            }
        });
        
    }
    
    componentWillUnmount() {
    
        this.unsubscribe();
    }
    
    handleEditPress() {
        this.setState({
            editable: !this.state.editable
        })
    }

    handleSubmission() {

        this.props.profileUpdate(this.state, this.state.docId, this.state.User, this.props.navigation);
        this.props.fetchUsers();
        this.setState({
            editable: false
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
            if(this.state.isAuthenticated) {
                if(this.props.users.isLoading) {

                    return(
                        <Loading />
                    );
                }
                else if(this.props.users.errMess) {
        
                    return(
                        <View>            
                            <Text>{props.dishes.errMess}</Text>
                        </View>            
                    );
                }
        
                let screenHeight = 2*Dimensions.get('window').height;
                var status = this.state.willing ? 'Willing' : 'Not-Willing';
                
                return (
                        <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'black'}}>
                            <View style={{flex: 1}}>
                            <ScrollView>
                                <View style={{ height: screenHeight-1115, paddingVertical: 5}}>
                                <Image
                                            source={{uri: this.state.imageUrl}}
                                            style={{height: '100%', width: 250, alignSelf: 'center', borderRadius: 10}}
                                            PlaceholderContent={<ActivityIndicator />}
                                        />
                                
                                </View>
                                <Card containerStyle={{ backgroundColor: '#c6f1e7', 
                                    height: screenHeight+450, margin: 0, borderRadius: 60}}
                                >   
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: '2%', paddingBottom: '15%'}}>
                                    <View style={{width: '45%', height: 100, paddingRight: '2%'}}>
                                    <Button
                                        title="Camera"
                                        onPress={this.getImageFromCamera}
                                        buttonStyle={{backgroundColor: '#c3aed6', borderRadius: 28}}
                                        titleStyle={{color: "black", fontWeight: "bold", paddingHorizontal: '5%'}}
                                        disabled = {!this.state.editable}
                                        raised
                                    />
                                    </View>
                                    <View style={{width: '45%', height: 100, paddingLeft: '2%'}}>
                                    <Button
                                        title="Gallery"
                                        onPress={this.getImageFromGallery}
                                        buttonStyle={{backgroundColor: '#c3aed6', borderRadius: 28}}
                                        titleStyle={{color: "black", fontWeight: "bold", paddingHorizontal: '5%'}}
                                        disabled = {!this.state.editable}
                                        raised
                                    />
                                    </View>
                                </View>
                                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: '5%', paddingBottom: '20%'}}>
                                        <View style={{width: '45%', height: 100, paddingRight: '2%'}}>
                                        <Button
                                            title="Edit"
                                            onPress={() => this.handleEditPress()}
                                            buttonStyle={{backgroundColor: '#c3aed6', borderRadius: 28}}
                                            titleStyle={{color: "black", fontWeight: "bold", paddingHorizontal: '5%'}}
                                            raised
                                            icon={
                                                <Icon
                                                    name='user-edit'
                                                    type='font-awesome-5'            
                                                    size={20}
                                                    color= '#52057b'
                                                />
                                            }
                                        />
                                        </View>
                                        <View style={{width: '45%', height: 100, paddingLeft: '2%'}}>
                                        <Button
                                            title="My Posts"
                                            //onPress={}
                                            buttonStyle={{backgroundColor: '#c3aed6', borderRadius: 28}}
                                            titleStyle={{color: "black", fontWeight: "bold", paddingHorizontal: '5%'}}
                                            raised
                                            icon={
                                                <Icon
                                                    name='images'
                                                    type='font-awesome-5'            
                                                    size={20}
                                                    color= '#52057b'
                                                />
                                            }
                                        />
                                        </View>
                                    </View>
                                    <View>
                                        <Input
                                            placeholder="Email"
                                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                                            onChangeText={(email) => this.setState({email})}
                                            value={this.state.email}
                                            label='E-mail'
                                            disabled
                                            />
                                        <Input
                                            placeholder="Password"
                                            leftIcon={{ type: 'font-awesome', name: 'key' }}
                                            onChangeText={(password) => this.setState({password})}
                                            value={this.state.password}
                                            label='Password'
                                            secureTextEntry={true}
                                            disabled
                                            />
                                        <Input
                                            placeholder="First Name"
                                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                                            onChangeText={(firstname) => this.setState({firstname})}
                                            value={this.state.firstname}
                                            disabled = {!this.state.editable}
                                            label='First Name'
                                            />
                                        <Input
                                            placeholder="Last Name"
                                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                                            onChangeText={(lastname) => this.setState({lastname})}
                                            value={this.state.lastname}
                                            disabled = {!this.state.editable}
                                            label='Last Name'
                                            />
                                        <Input
                                            placeholder="Gender"
                                            onChangeText={(lastname) => this.setState({lastname})}
                                            value={this.state.gender}
                                            disabled
                                            label='Gender'
                                            />
                                        <Input
                                            placeholder="Blood Group"
                                            leftIcon={{ type: 'font-awesome-5', name: 'tint' }}
                                            onChangeText={(lastname) => this.setState({lastname})}
                                            value={this.state.bloodgroup}
                                            disabled
                                            label='Blood Group'
                                            />
                                        <Input
                                            placeholder="Contact Number"
                                            leftIcon={{ type: 'font-awesome', name: 'phone-square' }}
                                            onChangeText={(contactnumber) => this.setState({contactnumber})}
                                            value={this.state.contactnumber}
                                            disabled = {!this.state.editable}
                                            label='Contact Number'
                                            />
                                        <Input
                                            placeholder="resedential locality"
                                            leftIcon={{ type: 'font-awesome-5', name: 'address-card' }}
                                            onChangeText={(locality) => this.setState({locality})}
                                            value={this.state.locality}
                                            disabled = {!this.state.editable}
                                            label='Locality'
                                            />
                                        <Input
                                            placeholder="resedential city"
                                            leftIcon={{ type: 'font-awesome-5', name: 'address-card' }}
                                            onChangeText={(city) => this.setState({city})}
                                            value={this.state.city}
                                            disabled = {!this.state.editable}
                                            label='City'
                                            />
                                        <Input
                                            placeholder="resedential state"
                                            leftIcon={{ type: 'font-awesome-5', name: 'address-card' }}
                                            onChangeText={(state) => this.setState({state})}
                                            value={this.state.state}
                                            disabled = {!this.state.editable}
                                            label='State'
                                            />
                                        <Input
                                            placeholder="resedential country"
                                            leftIcon={{ type: 'font-awesome-5', name: 'address-card' }}
                                            onChangeText={(country) => this.setState({country})}
                                            value={this.state.country}
                                            disabled = {!this.state.editable}
                                            label='Country'
                                            />
                                        <Input 
                                            placeholder="Medical details"
                                            multiline={true}
                                            onChangeText={(disease) => this.setState({disease})}
                                            value={this.state.disease}
                                            disabled = {!this.state.editable}
                                            label='Medical Details'
                                        />
                                        <Text style={{marginLeft: '4%'}}>{status}</Text>
                                        <Switch
                                            disabled = {!this.state.editable}
                                            value={this.state.willing}
                                            trackColor="#512DA8"
                                            onValueChange={(value) => this.setState({ willing: value })}
                                        />
                                        <View style={{marginTop: '10%'}}>
                                        <Button
                                            onPress = {() => this.handleSubmission()}
                                            title=" Submit Changes"
                                            icon={
                                                <Icon
                                                    name='telegram-plane'
                                                    type='font-awesome-5'            
                                                    size={24}
                                                    color= '#52057b'
                                                />
                                            }
                                            buttonStyle={{
                                                backgroundColor: '#c3aed6',
                                                borderRadius: 30                    
                                            }}
                                            titleStyle={{
                                                fontWeight: 'bold',
                                                color: 'black'
                                            }}
                                            raised
                                            disabled = {!this.state.editable}
                                            />
                                        </View>
                                        <View style={{marginTop: '10%'}}>
                                        <Button
                                            onPress = {() => this.handleRegister(this.state)}
                                            title=" View Donation History"
                                            icon={
                                                <Icon
                                                    name='tint'
                                                    type='font-awesome-5'            
                                                    size={24}
                                                    color= '#52057b'
                                                />
                                            }
                                            buttonStyle={{
                                                backgroundColor: '#c3aed6',
                                                borderRadius: 30                    
                                            }}
                                            titleStyle={{
                                                fontWeight: 'bold',
                                                color: 'black'
                                            }}
                                            raised
                                            />
                                        </View>
                                    </View>
                                </Card>
                            </ScrollView>
                            </View>
                        </View>
                );
            }
            else {
            return (

                <ScrollView style={{backgroundColor: '#f0fff3'}}>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                    <Text style={{color: "#440047",
                        fontSize: normalize(25),
                        fontWeight: "bold",
                        textAlign: 'center',
                        marginTop: 40,
                        flex: 1
                        }}>Sorry !! You need to Login first...</Text>
                    <ImageBackground source={require('./images/bloodLogo.png')} style={{height: 600, marginTop: 60, width: 550, flex: 3}}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Login')}
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
                            backgroundColor: 'green',
                            borderRadius: 30,
                            height: 50
                        }}
                        titleStyle={{padding: 20}}
                        containerStyle={{marginRight: 250, marginLeft: 70, marginTop: 40}}
                        raised
                        />
                    <Button
                        onPress={() => this.props.navigation.navigate('Home')}
                        title="Home"
                        icon={
                            <Icon
                                name='arrow-circle-left'
                                type='font-awesome'            
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: 'green',
                            borderRadius: 30,
                            height: 50
                        }}
                        titleStyle={{padding: 20}}
                        containerStyle={{marginRight: 250, marginLeft: 70, marginTop: 40}}
                        raised
                        />
                    </ImageBackground>
                    
                    </View>
                </ScrollView>
            );
            }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);