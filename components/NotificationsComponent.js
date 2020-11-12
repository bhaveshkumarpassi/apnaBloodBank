import React, {Component} from 'react';
import { View, Image, ImageBackground, Text, StyleSheet, FlatList, SafeAreaView, Dimensions, Linking, Share, Alert, Platform} from 'react-native';
import {Icon, Button, ListItem, Avatar} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {normalize} from '../assets/fonts/DynamicFontSize';
import {fetchCampRequests} from '../redux/ActionCreators';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import * as Calendar from 'expo-calendar';
import * as Permissions from 'expo-permissions';
//import { Notifications } from 'expo';
import * as Notifications from 'expo-notifications';
import { auth, firestore, fireauth, firebasestore , storage} from '../firebase/firebase';
import { Loading } from './LoadingComponent';
import MapView from 'react-native-maps';



const mapStateToProps = (state) => {
    
    return {
        users: state.users,
        auth: state.auth,
        CampRequests: state.CampRequests
    };
}

class Notification extends Component {

    constructor(props) {

        super(props);
        this.state = {
            isAuthenticated: false,
            isModalVisible: false,
            selectedItem: {},
        }
    }

    componentDidMount() {

        this.unsubscribe =  auth.onAuthStateChanged(user => {
    
            if(user) {
              this.setState({
                isAuthenticated: true
              })
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

    modalSelect(item) {

        this.setState({
            selectedItem: item,
            isModalVisible: !this.state.isModalVisible
        })
    }

    toggleModal() {

        this.setState({
            isModalVisible: !this.state.isModalVisible
        })
    }

    async obtainNotificationPermission() {

        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        
        if (permission.status !== 'granted') {
        permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
        
        if (permission.status !== 'granted') {
        Alert.alert('Permission not granted to show notifications');
        
        }
        
        } else {
        
        if (Platform.OS === 'android') {
        
            Notifications.setNotificationChannelAsync('notify', {
                name: 'Notify',
                importance: Notifications.AndroidImportance.HIGH,
                sound: 'email-sound.wav', // <- for Android 8.0+, see channelId property below
                
              });
        }
        
        }
        return permission;

    }

    async obtainCalendarPermission() {
        let permission = await Permissions.getAsync(Permissions.CALENDAR);
        if(permission.status !== 'granted') {
          permission = await Permissions.askAsync(Permissions.CALENDAR);
          if(permission.status !== 'granted') {
            Alert.alert(null, 'Pernission has to be granted for calendar support');
          }
        }
        return permission;
    }

    async getDefaultCalendarSource() {
        const calendars = await Calendar.getCalendarsAsync();
        const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
        return defaultCalendars[0].source;
    }

    async addReservationToCalendar(date, duration, address, dateString) {
        await this.obtainCalendarPermission();
        const defaultCalendarSource = Platform.OS === 'ios'
        ? await this.getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'apnaBloodBank Calendar' };
  
    let details = {
    title: 'Blood Donation Camp Event',
    source: defaultCalendarSource,
    name: 'internalCalendarName',
    color: 'blue',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
    
    }

    const calendarId = await Calendar.createCalendarAsync(details);
  
       await Calendar.createEventAsync(calendarId, {
          title:  'Blood Donation Camp Event',
          //startDate: date,
          //endDate: date,
          startDate: new Date(Date.parse(dateString)),
          endDate: new Date(Date.parse(dateString) + parseInt(duration, 10)*3600000),
          timeZone: 'Asia/India',
          location: address
  
        });
    }

            async presentLocalNotification() {

                await this.obtainNotificationPermission();

                Notifications.setNotificationHandler({
                    handleNotification: async () => ({
                      shouldShowAlert: true,
                      shouldPlaySound: false,
                      shouldSetBadge: true,
                    }),
                });
                
                Notifications.scheduleNotificationAsync({
                    content: {
                      title: "Blood Donation Camp",
                      body: 'Thanks for accepting the camp request the event has been marked to your Mobile Default Calendar' + "\n" + 'Hope to See you at Camp!!',
                      sound: 'email-sound.wav', // <- for Android below 8.0
                    },
                    trigger: {
                      seconds: 2,
                      channelId: 'notify', // <- for Android 8.0+, see definition above
                    },
                  });
                
            }

    async updateDocStatus(campRequest, isAccepted) {

        var user = auth.currentUser;

        await firestore.collection('campRequests').doc(campRequest._id).collection('responses').doc(user.uid.toString()).
        update({
            accepted: isAccepted,
            viewed: true
        })
        .then(() => console.log('Response submitted!!'))
        .catch((err) => Alert.alert('Status not updated', err.message));
    }

    handleAcceptence(date, duration, address, campRequest, dateString) {

        this.updateDocStatus(campRequest, true);
        this.addReservationToCalendar(date, duration, address, dateString);
        this.presentLocalNotification();
        this.toggleModal();
    }

    handeleDecline(campRequest) {

        this.updateDocStatus(campRequest, false);
        this.toggleModal();
    }
    
    render() {
        if(this.state.isAuthenticated) {

            let screenHeight = 2*Dimensions.get('window').height;
            var user = auth.currentUser;

            const shareRequest = (title, message) => {

                Share.share({
                    title: title,
                    message: title + ': ' + message,

                }, { dialogTitle: 'Share' + title})
            }
            const MyModal = (props) => {

                var shareMessage = 'A Blood Donation Camp is going to be organised by '+  props.selectedItem.organisation +
                ' in association with ' + props.selectedItem.association + '\n' + ' The Date and Time for the same is : ' + '\n' + props.selectedItem.dateTime +
                '\n' + 'The Address of the Venue of camp is : ' + '\n' + props.selectedItem.venueLocality + ' ' + props.selectedItem.venueCity + ' ' + props.selectedItem.venueState + '\n' +
                'You can get more details about the camp by contacting : '+ '\n' + 'Name: ' + props.selectedItem.fullName + '\n' + 'Designation: ' + props.selectedItem.designation + '\n' + 'Contact Number: ' + props.selectedItem.contactnumber;
                

                return (
                    <Modal 
                            isVisible={props.isModalVisible}
                            style={{backgroundColor: '#ffffff', 
                                    borderRadius: 10,
                                    height: screenHeight
                            }}
                            animationIn='zoomInUp'
                            animationOut='zoomOutDown'
                            animationInTiming={500}
                            animationOutTiming={500}
                    
                            >
                                <ScrollView>
                                    <Text style={{textAlign: 'left'}}>
                                        <Icon 
                                            name='times-circle'
                                            type='font-awesome-5' 
                                            onPress={() => this.toggleModal()}
                                            size={30}
                                            />
                                    </Text>
                                    <Text style={{marginHorizontal: '3%', marginVertical: '5%', fontSize: normalize(20) }}>
                                        A Blood Donation Camp is going to be organised by {props.selectedItem.organisation} in association with {props.selectedItem.association} 
                                    </Text>
                                    <Text style={{marginHorizontal: '3%', marginVertical: '5%', fontSize: normalize(20) }}>
                                        The Date and Time for the same is : {'\n'} {props.selectedItem.dateTime} and expected duration of event is {props.selectedItem.duration} hours.
                                    </Text>
                                    <Text style={{marginHorizontal: '3%', marginVertical: '5%', fontSize: normalize(20) }}
                                        onPress={() => Linking.openURL('https://www.google.com/maps/')}
                                    >
                                        The Address of the Venue of camp is : {'\n'} {props.selectedItem.venueLocality} {props.selectedItem.venueCity} {props.selectedItem.venueState} {props.selectedItem.venueCountry}
                                    </Text>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                    <MapView 
                                        style={{height: screenHeight-1000, width: Dimensions.get('window').width-100, marginHorizontal: 50}}
                                    />
                                    </View>
                                    <Text style={{marginHorizontal: '3%', marginVertical: '5%', fontSize: normalize(20) }}>
                                        You can get more details about the camp by contacting : {'\n'} Name : {props.selectedItem.fullName} {'\n'} Designation : {props.selectedItem.designation}
                                    </Text>
                                    <Button
                                    onPress={()=> Linking.openURL('tel:'+props.selectedItem.contactnumber)}
                                    title=" Call"
                                    icon={
                                        <Icon
                                            name='phone-square'
                                            type='font-awesome-5'            
                                            size={24}
                                            color= 'white'
                                        />
                                    }
                                    buttonStyle={{
                                        backgroundColor: "#158467",
                                        borderRadius: 30,
                                    
                                    }}
                                    titleStyle={{padding: '4%'}}
                                    containerStyle={{marginLeft: '4%', marginRight: '4%', 
                                        marginBottom: '15%', marginTop: '5%', width: '50%'
                                    }}
                                    raised
                                    />
                                    <Text style={{marginHorizontal: '3%', marginVertical: '5%', fontSize: normalize(20) }}>
                                        If you want to contribute to the camp as a donor please click on the Accept button or else you can Decline to dismiss the notification.
                                    </Text>
                                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginBottom: '5%'}}>
                                            <Icon
                                                name='share'
                                                type='font-awesome-5'            
                                                size={24}
                                                color= 'white'
                                                onPress={()=> shareRequest('Blood Donation Camp', shareMessage)}
                                                raised
                                                color='#892cdc'
                                                reverse
                                            />
                                            <Icon
                                                name='check-circle'
                                                type='font-awesome-5'            
                                                size={24}
                                                color= 'white'
                                                onPress={()=> this.handleAcceptence(props.selectedItem.date, props.selectedItem.duration, 
                                                    props.selectedItem.venueLocality+', '+props.selectedItem.venueCity+', '+props.selectedItem.venueState+', '+props.selectedItem.venueCountry, props.selectedItem,
                                                    props.selectedItem.dateString)}
                                                raised
                                                reverse
                                                color='#519872'
                                            />
        
                                            <Icon
                                                name='times-circle'
                                                type='font-awesome-5'            
                                                size={24}
                                                color= 'white'
                                                onPress={()=> this.handeleDecline(props.selectedItem)}
                                                raised
                                                reverse
                                                color='#ec524b'
                                            />
                                    </View>
                                </ScrollView>
                            </Modal>
                );
            }

            const renderListItem = ({ item , index}) => (
                <ListItem
                    bottomDivider
                    topDivider
                    key={index}
                    containerStyle={{backgroundColor: '#200019', height: 100, borderRadius: 25, marginHorizontal: '3%', marginTop: '5%'}}
                    pad = {30}
                    onPress= {() => this.modalSelect(item)}
                >   
                    <ListItem.Content>
                        <ListItem.Title style={{fontWeight: 'bold', color: 'white'}}>Blood Donation Camp</ListItem.Title>
                        <ListItem.Subtitle style={{color: 'white'}}>{item.dateTime}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron/>
                    
                </ListItem>
                
            );

            if(this.props.CampRequests.campRequests)
            {

                var dataItems = this.props.CampRequests.campRequests.filter(campRequest => {

                    if(user && campRequest.responses)
                    {
                        var resp = campRequest.responses.filter((response) => (response._id.toString() === user.uid))[0];
                        return (resp && resp.viewed === false);
                    }
                });

                if(dataItems)
                {
                    return (
                    <SafeAreaView>
                            <FlatList
                                data={this.props.CampRequests.campRequests.filter(campRequest => {

                                    if(user && campRequest.responses)
                                    {
                                        var resp = campRequest.responses.filter((response) => (response._id.toString() === user.uid))[0];
                                        return (resp && resp.viewed === false);
                                    }
                                })}
                                renderItem={renderListItem}
                                keyExtractor={item => item._id.toString()}
                                />
                            <MyModal selectedItem={this.state.selectedItem} isModalVisible={this.state.isModalVisible}/>
                    </SafeAreaView>
                );
                }
                else {
                    return (
                        <Text>No New Notifications for you right now.. </Text>
                    );
                }
            }
            else if(this.props.CampRequests.errMess) {
                return(
                    <Text>{this.props.CampRequests.errMess}</Text>
                );
            }
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

export default connect(mapStateToProps)(Notification);