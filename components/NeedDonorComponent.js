import React, {Component} from 'react';
import { View, Image, ImageBackground, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { auth, firestore } from '../firebase/firebase';
import {connect} from 'react-redux';
import {Icon, Button, Card, Input} from 'react-native-elements';
import {normalize} from '../assets/fonts/DynamicFontSize';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Picker } from 'native-base';
import DateTimePicker from "@react-native-community/datetimepicker";
import Moment from 'moment';
import ValidationComponent from 'react-native-form-validator';
import { deleteBloodRequest, postBloodRequest } from '../redux/ActionCreators';

const mapStateToProps = (state) => {

    return{
      users: state.users,
      auth: state.auth,
      BloodRequests: state.BloodRequests
    }
};

const mapDispatchToProps = (dispatch) => {
    
    return {
        postBloodRequest: (bloodRequest) => dispatch(postBloodRequest(bloodRequest)),
        deleteBloodRequest: (docId) => dispatch(deleteBloodRequest(docId))
    };
  }  

class CallTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
          tableHeader: [' Patient VS Valid Donors'],
          tableHead: ['', 'O-', 'O+', 'B-', 'B+', 'A-', 'A+', 'AB-', 'AB+'],
          tableTitle: ['AB+', 'AB-', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-'],
          tableData: [
            ['yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes'],
            ['yes', 'no', 'yes', 'no', 'yes', 'no', 'yes', 'no'],
            ['yes', 'yes', 'no', 'no', 'yes', 'yes', 'no', 'no'],
            ['yes', 'no', 'no', 'no', 'yes', 'no', 'no', 'no'],
            ['yes', 'yes', 'yes', 'yes', 'no', 'no', 'no', 'no'],
            ['yes', 'no', 'yes', 'no', 'no', 'no', 'no', 'no'],
            ['yes', 'yes', 'no', 'no', 'no', 'no', 'no', 'no'],
            ['yes', 'no', 'no', 'no', 'no', 'no', 'no', 'no']
          ],
         tableFooter: ['Valid Donors    >>>>>>>>>>>>>>'],
         isAuthenticated: false
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

    render() {

        if(this.state.isAuthenticated) {
        const state = this.state;
        return (
            <ScrollView style={{backgroundColor: '#f0fff3'}}>
                <Text style={{fontWeight: 'bold', fontSize: normalize(20), alignSelf: 'center', marginTop: 15, marginBottom: 15}}>Select the needed Blood Group !!</Text>
                <View style={{flex: 1, flexDirection: 'column'}}>
                <Card>
                <View style={styles.container}>
                <Table borderStyle={{borderWidth: 1}}>
                    <Row data={state.tableHeader} style={{backgroundColor: 'orange'}} textStyle={{textAlign: 'center', fontWeight: 'bold'}}/>
                    <Row data={state.tableHead} flexArr={[2.75, 1, 1]} style={styles.head} textStyle={styles.text}/>
                    <TableWrapper style={styles.wrapper}>
                        <Col data={state.tableTitle} style={styles.title} textStyle={styles.text}/>
                        <Rows data={state.tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text}/>
                    </TableWrapper>
                    <Row data={state.tableFooter} style={{backgroundColor: 'orange'}} textStyle={{textAlign: 'center', fontWeight: 'bold'}}/>
                </Table>
                </View>
                </Card>
                <View style={{marginVertical: 20}}>
                <View style={{flex:1, flexDirection: 'row', alignSelf: 'center'}}>
                <Button
                    title="A+"
                    buttonStyle={{borderRadius: 35, width: 70, height: 70, backgroundColor: '#8b008b'}}
                    titleStyle={{fontWeight: 'bold'}}
                    containerStyle={{paddingVertical: 10, paddingLeft: 5}}
                    onPress={() => this.props.navigation.navigate('A+ Donors')}
                />
                <Button
                    title="A-"
                    buttonStyle={{borderRadius: 35, width: 70, height: 70, backgroundColor: 'green'}}
                    titleStyle={{fontWeight: 'bold'}}
                    containerStyle={{paddingVertical: 10, paddingLeft: 5}}
                    onPress={() => this.props.navigation.navigate('A- Donors')}
                />
                <Button
                    title="B+"
                    buttonStyle={{borderRadius: 35, width: 70, height: 70, backgroundColor: 'maroon'}}
                    titleStyle={{fontWeight: 'bold'}}
                    containerStyle={{paddingVertical: 10, paddingLeft: 5}}
                    onPress={() => this.props.navigation.navigate('B+ Donors')}
                />
                <Button
                    title="B-"
                    buttonStyle={{borderRadius: 35, width: 70, height: 70, backgroundColor: 'orange'}}
                    titleStyle={{fontWeight: 'bold'}}
                    containerStyle={{paddingVertical: 10, paddingLeft: 5}}
                    onPress={() => this.props.navigation.navigate('B- Donors')}
                />
                </View>
                <View style={{flex:1, flexDirection: 'row', alignSelf: 'center'}}>
                <Button
                    title="O+"
                    buttonStyle={{borderRadius: 35, width: 70, height: 70, backgroundColor: 'orchid'}}
                    titleStyle={{fontWeight: 'bold'}}
                    containerStyle={{paddingVertical: 10, paddingLeft: 5}}
                    onPress={() => this.props.navigation.navigate('O+ Donors')}
                />
                <Button
                    title="O-"
                    buttonStyle={{borderRadius: 35, width: 70, height: 70, backgroundColor: '#1e90ff'}}
                    titleStyle={{fontWeight: 'bold'}}
                    containerStyle={{paddingVertical: 10, paddingLeft: 5}}
                    onPress={() => this.props.navigation.navigate('O- Donors')}
                />
                <Button
                    title="AB+"
                    buttonStyle={{borderRadius: 35, width: 70, height: 70, backgroundColor: '#c71585'}}
                    titleStyle={{fontWeight: 'bold'}}
                    containerStyle={{paddingVertical: 10, paddingLeft: 5}}
                    onPress={() => this.props.navigation.navigate('AB+ Donors')}
                />
                <Button
                    title="AB-"
                    buttonStyle={{borderRadius: 35, width: 70, height: 70, backgroundColor: 'navy'}}
                    titleStyle={{fontWeight: 'bold'}}
                    containerStyle={{paddingVertical: 10, paddingLeft: 5}}
                    onPress={() => this.props.navigation.navigate('AB- Donors')}
                />
                </View>
                </View>
                </View>
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
                        flex: 1,
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

class RequestTab extends ValidationComponent {

    constructor(props) {

        super(props);

        this.state={
            name: '',
            age: '',
            bloodgroup: 'O+',
            units: '',
            contactnumber: '',
            info: '',
            date: new Date(),
            time: new Date(),
            mode: "date",
            dateTime: '',
            show: false,
            locality: '',
            city: '',
            state: '',
            country: '',
            isAuthenticated: false,
            contactholder: ''
        }
    }

    onBloodGroupValueChange(value) {
        this.setState({
          bloodgroup: value
        });
    }

    async sendNotification(token, notification) {

        const message = {
            to: token,
            sound: 'default',
            title: 'Blood Needed',
            body: notification,
            data: { data: 'goes here' },
          };
        
          await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Accept-encoding': 'gzip, deflate',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
          });
    }

    async sendNotificationToAllUsers(message) {

        (await firestore.collection('users').get()).docs.map(user => this.sendNotification(user.data().token, message));
    }

    async handleSubmission(doc) {

        if(!doc) { 
        this.validate({
            name: {required: true},
            age: {required: true, numbers: true},
            bloodgroup: {required: true},
            units: {required: true, numbers: true},
            contactholder: {required: true},
            contactnumber: {required: true, numbers: true, minLength: 10, maxLength: 10},
            dateTime: {required: true},
            locality: {required: true},
            city: {required: true},
            state: {required: true},
            country: {required: true}
        });

        if(this.isFormValid()) {
            
            await this.props.postBloodRequest(this.state);
            await this.sendNotificationToAllUsers(this.state.units + ' units of ' + this.state.bloodgroup+ ' Blood needed urgently! \n Within: '+this.state.dateTime + '\nAt Address: '+this.state.locality+','+this.state.city+','+this.state.state);


            this.setState({
                name: '',
                age: '',
                bloodgroup: 'O+',
                units: '',
                contactnumber: '',
                info: '',
                date: new Date(),
                time: new Date(),
                mode: "date",
                dateTime: '',
                show: false,
                locality: '',
                city: '',
                state: '',
                country: '',
                contactholder: ''
            });
        }
        else {
            Alert.alert(null, this.getErrorMessages());
        }
        }
        else {
            Alert.alert(null, 'You can make one request at a time delete previously made request to make a new one.');
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

    handleWithdrawl(doc) {

        if(doc) {
            this.props.deleteBloodRequest(doc._id);
        }
        else {
            Alert.alert(null, 'You have no current Blood request.');
        }
    }

    render() {

        if(this.state.isAuthenticated) {
        var user = auth.currentUser;
        var request = this.props.BloodRequests.bloodRequests.filter(cR => cR.author._id.toString() === user.uid.toString())[0];
        return(
            <ScrollView style={{flex: 1, backgroundColor: '#f0fff3'}}>
                <Text style={{textAlign : 'center', marginTop: '5%', marginBottom: '7%', fontSize: normalize(20), fontWeight: 'bold'}}>Make Request</Text>
                <Input
                    placeholder="  Patient Name"
                    label=' Patient Name: '
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}
                    inputContainerStyle={styles.formInput}
                    />
                <Input
                    placeholder="  Patient Age"
                    label=' Patient Age: '
                    onChangeText={(age) => this.setState({age})}
                    value={this.state.age}
                    inputContainerStyle={styles.formInput}
                    />
                <View style={{backgroundColor: '#c6f1e7', marginBottom: 25, marginHorizontal: 20, borderRadius: 10}}>
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
                </View>
                <Input
                    placeholder="  Mention units of blood required "
                    label=' Blood Requirement: '
                    onChangeText={(units) => this.setState({units})}
                    value={this.state.units}
                    inputContainerStyle={styles.formInput}
                    multiline
                    />
                <Input
                    placeholder="  Prefered Contact Number"
                    label=' Contact: '
                    onChangeText={(contactnumber) => this.setState({contactnumber})}
                    value={this.state.contactnumber}
                    inputContainerStyle={styles.formInput}
                    />
                <Input
                    placeholder="  Name of above mentioned contact holder."
                    label=' Preson to contact: '
                    onChangeText={(contactholder) => this.setState({contactholder})}
                    value={this.state.contactholder}
                    inputContainerStyle={styles.formInput}
                    multiline
                    />
                <Input
                    placeholder="  Specific Location like, hospital, building, sector, ward"
                    label=' Specific Location: '
                    onChangeText={(locality) => this.setState({locality})}
                    value={this.state.locality}
                    inputContainerStyle={styles.formInput}
                    multiline
                    />
                <Input
                    placeholder="  City"
                    label=' City: '
                    onChangeText={(city) => this.setState({city})}
                    value={this.state.city}
                    inputContainerStyle={styles.formInput}
                    />
                <Input
                    placeholder="  State"
                    label=' State: '
                    onChangeText={(state) => this.setState({state})}
                    value={this.state.state}
                    inputContainerStyle={styles.formInput}
                    />
                <Input
                    placeholder="  Country"
                    label=' Country: '
                    onChangeText={(country) => this.setState({country})}
                    value={this.state.country}
                    inputContainerStyle={styles.formInput}
                    />
                <View style={{
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 10,
                }}>
                    <Text style={{
                        fontSize: normalize(18),
                        paddingBottom: '1%'
                    }}>
                        Needed Within
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

                            });
                            } else {
                            this.setState({ show: false });
                            }
                        }}
                        />
                    )}
                    </View>
                <Input
                    placeholder="  Additional Information"
                    label=' Additional Information: '
                    onChangeText={(info) => this.setState({info})}
                    value={this.state.info}
                    inputContainerStyle={styles.formInput}
                    containerStyle={{marginTop: 25}}
                    multiline
                    />
                <View style={styles.formButton}>
                    <Button
                        onPress = {() => this.handleSubmission(request)}
                        title=" Submit Request"
                        icon={
                            <Icon
                                name='telegram-plane'
                                type='font-awesome-5'            
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
            <View style={styles.formButton}>
                    <Button
                        onPress = {() => this.handleWithdrawl(request)}
                        title=" Withdraw Request"
                        icon={
                            <Icon
                                name='times-circle'
                                type='font-awesome-5'            
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
                        flex: 1,
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

const NeedDonorTabNavigator = createBottomTabNavigator();

class NeedDonor extends Component {
    
    constructor(props) {

        super(props);
    }
    render() {
    
    const CallTabComponent = () => <CallTab navigation = {this.props.navigation}
                                        />;
    const RequestTabComponent = () => <RequestTab BloodRequests = {this.props.BloodRequests}
                                                  postBloodRequest = {this.props.postBloodRequest}
                                                  deleteBloodRequest = {this.props.deleteBloodRequest}
                                                  navigation = {this.props.navigation}
                                        />;
    
    return (
    <NeedDonorTabNavigator.Navigator
        initialRouteName="Call"
        tabBarOptions = {{
            initialRouteName: 'Call',
            activeBackgroundColor: '#11cbd7',
            inactiveBackgroundColor: '#c6f1e7',
            activeTintColor: 'navy',
            inactiveTintColor: '#1e90ff'
        }}>
        <NeedDonorTabNavigator.Screen
            name = "Call"
            component = {CallTabComponent}
            options = {{
                title: 'Call',
                tabBarIcon: ({ color: tintColor }) => (
                    <Icon
                      name='phone'
                      type='font-awesome-5'            
                      size={24}
                      iconStyle={{ color: tintColor }}
                    />
                  )
            }}
            >
        </NeedDonorTabNavigator.Screen>
        <NeedDonorTabNavigator.Screen
            name = "Make Request"
            component = {RequestTabComponent}
            options = {{
                title: 'Make Request',
                tabBarIcon: ({ color: tintColor }) => (
                    <Icon
                      name='pen'
                      type='font-awesome-5'            
                      size={24}
                      iconStyle={{ color: tintColor }}
                    />
                  ) 
            }}
            >
        </NeedDonorTabNavigator.Screen>
    </NeedDonorTabNavigator.Navigator>
    
    );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    head: {  height: 40,  backgroundColor: '#f1f8ff'  },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: {  height: 28  },
    text: { textAlign: 'center', fontSize: normalize(14) },
    formInput: {
        margin: 5,
        backgroundColor: '#c6f1e7',
        borderRadius: 10,
        paddingLeft: 10
    },
    formButton: {
        padding: 20
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NeedDonor);