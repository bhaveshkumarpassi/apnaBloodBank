import React, {Component} from 'react';
import { View, ImageBackground, Text, StyleSheet, ActivityIndicator, Dimensions, TouchableOpacity, Alert} from 'react-native';
import {Icon, Button, Card, Image, Input} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {normalize} from '../assets/fonts/DynamicFontSize';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import DateTimePicker from "@react-native-community/datetimepicker";
import Moment from 'moment';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import { auth, firestore, fireauth, firebasestore , storage} from '../firebase/firebase';
import {postCampRequest} from '../redux/ActionCreators';
import {deleteCampRequest} from '../redux/ActionCreators';


const  mapStateToProps = (state) => {
    return{
        users: state.users,
        CampRequests: state.CampRequests
    };
}

const mapDispatchToProps = (dispatch) => {

    return {
        postCampRequest: (campRequest) => dispatch(postCampRequest(campRequest)),
        deleteCampRequest: (docId) => dispatch(deleteCampRequest(docId))
    };
}

class DonationCamp extends Component {

    constructor(props) {

        super(props);
        this.state = {
            isAuthenticated: false,
            isModalVisible: false,
            organisation: '',
            association: '',
            associationAddress: '',
            venueLocality: '',
            venueCity: '',
            venueState: '',
            venueCountry: '',
            designation: '',
            contactnumber: '',
            fullName: '',
            date: new Date(),
            time: new Date(),
            show: false,
            mode: "date",
            dateTime: '',
            duration: '',
            dateString: '',
            isSecondModalVisible: false,
        }
    }

    componentDidMount() {
        this.unsubscribe =  auth.onAuthStateChanged(user => {
    
            if(user) {

            var User = this.props.users.users.filter(usr => usr.uid === user.uid)[0];

              this.setState({
                isAuthenticated: true,
                contactnumber: User.contactnumber,
                fullName: User.firstname + ' ' + User.lastname
              });
            

            }
            else {
              this.setState({
                isAuthenticated: false,
              })
            }
        })
    }
    
    componentWillUnmount() {
    
        this.unsubscribe();
    }

    toggleModal() {
        this.setState({
            isModalVisible: !this.state.isModalVisible
        });
    }

    toggleSecondModal() {

        this.setState({
            isSecondModalVisible: !this.state.isSecondModalVisible
        });
    }

    handleSubmit() {

        console.log(JSON.stringify(this.state));
        this.props.postCampRequest(this.state);

        this.setState({
            organisation: '',
            association: '',
            associationAddress: '',
            venueLocality: '',
            venueCity: '',
            venueState: '',
            venueCountry: '',
            designation: '',
            contactnumber: '',
            fullName: '',
            date: new Date(),
            time: new Date(),
            show: false,
            mode: "date",
            dateTime: '',
            duration: '',
            dateString: '',
            
        })
        this.toggleModal();
    }

    cancelCampRequest(doc) {

        if(doc) {
            this.props.deleteCampRequest(doc._id);
        }
        else {
            Alert.alert(null, 'You have no current Camp request.');
        }
    }

    render() {

        let screenHeight = 2*Dimensions.get('window').height;


        if(this.state.isAuthenticated) {

            var user = auth.currentUser;

            var request = this.props.CampRequests.campRequests.filter(cR => cR.author._id.toString() === user.uid.toString())[0];

            var canMakeRequest = false;
            var status = '';
            if(!request) {
                canMakeRequest = true;
            }
            else {

                if(request.responses)
                {
                    var accepted = request.responses.filter(response => response.accepted === true);

                    if(accepted)
                    {   
                        status = accepted.length.toString();
                    }
                }
                canMakeRequest = false;
            } 

            return (
            <ScrollView style={{backgroundColor: '#000000', flex: 1, flexDirection: 'column'}}>
                    <Card containerStyle={{flex: 1, height: screenHeight-500, 
                        marginTop: '10%', marginBottom: '10%', borderRadius: 25,
                        backgroundColor: '#c6f1e7'}}>
                        <Card.Image source={require('./images/donationCampImage.jpg')}
                                style={{height: 200, width: '100%', marginTop: '5%', marginBottom: '10%'}}
                                PlaceholderContent={<ActivityIndicator />} 
                                />
                        <Card.FeaturedSubtitle style={{color: 'black'}}>
                            If you are a part of any community or organisation planning to organise a blood donation camp then you can get a large number of donors 
                            from our network of apnaBloodBank , for that all you are suppose to do is to make a blood donation camp request.
                        </Card.FeaturedSubtitle>
                        <Button 
                            title='   Make a Camp Request'
                            buttonStyle={{borderRadius: 25, backgroundColor: '#6a2c70'}}
                            containerStyle={{marginTop: '10%'}}
                            raised
                            icon={
                                <Icon
                                    name='marker'
                                    type='font-awesome-5'            
                                    size={24}
                                    color= 'white'
                                    
                                />
                            }
                            onPress = {canMakeRequest ? () => this.toggleModal() : () => Alert.alert(null, 'You can make one request at a time Cancel previous request to make a new request.')}
                        />
                        <Button 
                            title='   Check Status of Request'
                            buttonStyle={{borderRadius: 25, backgroundColor: "#335d2d"}}
                            containerStyle={{marginTop: '10%'}}
                            raised
                            icon={
                                <Icon
                                    name='check-circle'
                                    type='font-awesome-5'            
                                    size={24}
                                    color= 'white'
                                />
                            }
                            onPress={status ? () => this.toggleSecondModal() : () => Alert.alert(null, 'You have no current Camp request.')}
                        />
                        <Button 
                            title='   Cancel Camp Request'
                            buttonStyle={{borderRadius: 25, backgroundColor: "#fa4659"}}
                            containerStyle={{marginTop: '10%'}}
                            raised
                            icon={
                                <Icon
                                    name='times-circle'
                                    type='font-awesome-5'            
                                    size={24}
                                    color= 'white'
                                    
                                />
                            }
                            onPress = {() => this.cancelCampRequest(request)}
                        />
                    </Card>
                        <Modal 
                            isVisible={this.state.isModalVisible}
                            style={{backgroundColor: '#ffffff', 
                                    borderRadius: 10,
                                    height: screenHeight-600
                            }}
                            animationIn='zoomInUp'
                            animationOut='zoomOutDown'
                            animationOutTiming={500}
                            >
                            
                            <ScrollView style={{flex: 1}}>
                            <Text style={{textAlign: 'left'}}>
                            <Icon 
                                name='times-circle'
                                type='font-awesome-5' 
                                onPress={() => this.toggleModal()}
                                size={30}
                                />
                            </Text>
                                <Text style={{fontWeight: 'bold', textAlign: 'center', marginVertical: '5%', fontSize: normalize(22), }}>Camp Request Form</Text>
                                <View style={{marginTop: '5%', marginHorizontal: '2%'}}>
                                <Input
                                    placeholder="Organization name organising the camp eg., college society, NGO , local Society, etc."
                                    onChangeText={(organisation) => this.setState({organisation})}
                                    value={this.state.organisation}
                                    label='Organisation Name: '
                                    multiline
                                    />
                                <Input 
                                    placeholder="Mention the hospital/local bloodbank/pharmacy or any other medical practised association associated with camp."
                                    label='Medical practised association: '
                                    onChangeText={(association) => this.setState({association})}
                                    value={this.state.association}
                                    multiline
                                />
                                <Input 
                                    placeholder='Address of above mentioned association'
                                    label='Address of Medical practised association: '
                                    onChangeText={(associationAddress) => this.setState({associationAddress})}
                                    value={this.state.associationAddress}
                                    multiline
                                />
                                <Input 
                                    placeholder='Specific Address of venue of camp'
                                    label='Loclity: '
                                    onChangeText={(venueLocality) => this.setState({venueLocality})}
                                    value={this.state.venueLocality}
                                    multiline
                                />
                                <Input 
                                    placeholder='City of camp venue'
                                    label='City: '
                                    onChangeText={(venueCity) => this.setState({venueCity})}
                                    value={this.state.venueCity}
                                />
                                <Input 
                                    placeholder='State of camp venue'
                                    label='State: '
                                    onChangeText={(venueState) => this.setState({venueState})}
                                    value={this.state.venueState}
                                />
                                <Input 
                                    placeholder='Country of camp venue'
                                    label='Country: '
                                    onChangeText={(venueCountry) => this.setState({venueCountry})}
                                    value={this.state.venueCountry}
                                />
                                <Input 
                                    placeholder='How you are related to the conduct of camp ?'
                                    label='Designation: '
                                    multiline
                                    onChangeText={(designation) => this.setState({designation})}
                                    value={this.state.designation}
                                />
                                <Input 
                                    label='Your Full Name: '
                                    value={this.state.fullName}
                                    disabled
                                />
                                <Input 
                                    label='Your contact number: '
                                    value={this.state.contactnumber}
                                    disabled
                                />
                                <View style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: 20,
                                }}>
                                    <Text style={{
                                        fontSize: normalize(18),
                                        paddingBottom: '3%'
                                    }}>
                                        Mention Start Date and Time of Camp
                                    </Text>
                                    <TouchableOpacity style={{flex: 1}}
                                        style={{
                                            padding: 15,
                                            borderColor: '#512DA8',
                                            borderWidth: 2,
                                            flexDirection: "row",
                                            borderRadius: 20
                                        }}
                                        onPress={() => this.setState({ show: true, mode: 'date' })}
                                    >
                                    <Icon type='font-awesome-5' name='calendar-alt' color='#512DA8' style={{paddingRight: 10}} />
                                    <Text >
                                        {' ' + Moment(this.state.date).format('DD-MMM-YYYY h:mm A') }
                                    </Text>
                                    </TouchableOpacity>
                                    {this.state.show && (
                                        <DateTimePicker
                                        value={this.state.date}
                                        mode={this.state.mode}
                                        display="default"
                                        minimumDate={new Date()}
                                        onChange={(selected, value) => {
                                            if (value !== undefined) {
                                            this.setState({
                                                show: this.state.mode === "time" ? false : true,
                                                mode: "time",
                                                date: new Date(selected.nativeEvent.timestamp),
                                                time: new Date(selected.nativeEvent.timestamp),
                                                dateTime: Moment(new Date(selected.nativeEvent.timestamp)).format('DD-MMM-YYYY h:mm A').toString(),
                                                dateString: (new Date(selected.nativeEvent.timestamp)).toString()

                                            });
                                            } else {
                                            this.setState({ show: false });
                                            }
                                        }}
                                        />
                                    )}
                                    </View>
                                    <Input 
                                        placeholder='Expected Duration of Camp in hours.'
                                        label='Duration: '
                                        onChangeText={(duration) => this.setState({duration})}
                                        value={this.state.duration}
                                        multiline
                                    />
                                <Button
                                    onPress={() => this.handleSubmit()}
                                    title="Share with the Network"
                                    icon={
                                        <Icon
                                            name='share'
                                            type='font-awesome-5'            
                                            size={24}
                                            color= 'white'
                                        />
                                    }
                                    buttonStyle={{
                                        backgroundColor: "#fa4659",
                                        borderRadius: 30
                                    }}
                                    titleStyle={{padding: '4%'}}
                                    containerStyle={{marginLeft: '4%', marginRight: '4%', marginBottom: '6%', marginTop: '15%'}}
                                    raised
                                    />
                                </View>
                            </ScrollView>
                        </Modal>
                        <Modal 
                            isVisible={this.state.isSecondModalVisible}
                        >
                            <Text style={{fontWeight: 'bold', textAlign: 'center', marginVertical: '5%', fontSize: normalize(22),
                                color: 'yellow'
                            }}>
                                Camp Request Status
                            </Text>
                            <Text style={{fontWeight: 'bold', marginVertical: '5%', fontSize: normalize(20),
                                color: 'white'
                            }}>
                                Number of Members from network willing to donate in the camp  ::  {status}
                            </Text>
                            <Button title='close' onPress={() => this.toggleSecondModal()} 
                            buttonStyle={{backgroundColor: '#bc6ff1', marginTop: '10%', borderRadius: 20}}
                            >
                            </Button>
                        </Modal>
            </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(DonationCamp);