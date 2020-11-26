import React, {Component} from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert} from 'react-native';
import {Icon, BottomSheet, Button, Input, ListItem, Slider} from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from "@react-native-community/datetimepicker";
import {normalize} from '../assets/fonts/DynamicFontSize';
import Moment from 'moment';
import {connect} from 'react-redux';
import { addHistory, removeHistory, fetchUsers } from '../redux/ActionCreators';
import { auth } from '../firebase/firebase';
import { Loading } from './LoadingComponent';
import { Toast } from 'native-base';

const mapStateToProps = (state) => {
    
    return {
        users: state.users
    };
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        addHistory: (docId, data) => dispatch(addHistory(docId, data)),
        removeHistory: (docId, history) => dispatch(removeHistory(docId, history)),
        fetchUsers: () => dispatch(fetchUsers())
    };
}  

class DonationHistory extends Component {

    constructor(props) {

        super(props);
        this.state={
            sheetVisible: false,
            address: '',
            date: new Date(),
            time: new Date(),
            mode: "date",
            dateTime: '',
            show: false,
            user: null,
            isAuthenticated: false,
            name: '',
            contact: ''
        }

    }

    componentDidMount() {

        this.unsubscribe =  auth.onAuthStateChanged(user => {
    
            if(user) {

              this.setState({
                user: user,
                isAuthenticated: true,
              })
            }
            else {
              this.setState({
                user: null,
                isAuthenticated: false,
              })
            }
        });
        
    }

    componentWillUnmount() {
    
        this.unsubscribe();
    }

    handleSubmit = async (docId) => {

        if(this.state.dateTime && this.state.address && this.state.name && this.state.contact) {
        await this.props.addHistory(docId, this.state);
        this.props.fetchUsers();
        this.setState({
            sheetVisible: false,
            address: '',
            date: new Date(),
            time: new Date(),
            mode: "date",
            dateTime: '',
            show: false,
            name: '',
            contact: ''
        })
        }
        else {
            Alert.alert(null, 'Each field is to be filled before submiting.');
        }
    }

    handleDelete = async (docId, item) => {

        await this.props.removeHistory(docId, item);
        this.props.fetchUsers();
        this.setState({
            sheetVisible: false,
            address: '',
            date: new Date(),
            time: new Date(),
            mode: "date",
            dateTime: '',
            show: false,
            name: '',
            contact: ''
        })
    }

    render() {

        if(this.state.isAuthenticated) {

        if(this.props.users.isLoading) {
            return(
                <Loading />
            );
        }
        else if(this.props.users.errrMess) {
            return(
                <Text>
                    {this.props.users.errrMess}
                </Text>
            )
        }

        var info = this.props.users.users.filter((user) => user.uid === this.state.user.uid)[0];
        const RenderListItem = ({item, index}) => {

                
            return(
            <ListItem 
                key={index}
                containerStyle={{backgroundColor: '#065446', borderRadius: 25, marginHorizontal: '3%', marginTop: '5%'}}
                pad = {30}
            >
                 <ListItem.Content>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 8}}>
                    <ListItem.Title style={{fontWeight: 'bold', color: '#ffffff'}}>Donation Date</ListItem.Title>
                    <ListItem.Subtitle style={{color: '#ffffff'}}>{item.dateTime.toString()}</ListItem.Subtitle>
                    </View>
                    <Icon 
                        name='trash'
                        type='font-awesome-5'
                        color='white'
                        style={{flex: 2}}
                        size={15}
                        onPress={() => this.handleDelete(info._id, item)}
                    />
                    </View>
                    <ListItem.Title style={{fontWeight: 'bold', color: '#ffffff', paddingTop: '4%'}}>Donation Place</ListItem.Title>
                    <ListItem.Subtitle style={{color: '#ffffff'}}>{item.address}</ListItem.Subtitle>
                    <ListItem.Title style={{fontWeight: 'bold', color: '#ffffff', paddingTop: '4%'}}>Donated to</ListItem.Title>
                    <ListItem.Subtitle style={{color: '#ffffff'}}>{item.name},  C-No. : {item.contact}</ListItem.Subtitle>
                 </ListItem.Content>
             </ListItem>
            );
        }

        if(info && info.histories && info.histories.length) {
        return(
            <View style={{flex: 1, backgroundColor: '#b0eacd'}}>
                <View style={{alignItems: 'center', backgroundColor: '#b0eacd'}}>
                    <Icon       
                            raised
                            name={'plus'}
                            type='font-awesome'
                            color='#fa4659'
                            style={{}}
                            onPress={() => this.setState({sheetVisible: !this.state.sheetVisible})}
                        />
                    
                </View>
                <View style={{alignItems: 'center'}}>
                    <Slider
                        value={info.histories.length*5}
                        style={{width: normalize(250)}}
                        disabled
                        maximumValue={100}
                        minimumValue={0}
                        step={1}
                        thumbStyle={{ height: 10, width: 20, backgroundColor: 'transparent' }}
                        thumbProps={{
                        children: (
                            <Icon
                            name="tint"
                            type="font-awesome-5"
                            size={10}
                            reverse
                            containerStyle={{ bottom: 15, right: 20 }}
                            color="#fa4659"
                            />
                        ),
                        }}
                    />
                    <View style={{alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', paddingLeft: 20}}>
                        <Icon 
                            name='info-circle'
                            type='font-awesome-5' 
                            onPress={() => Toast.show ({text: 'Each Donation will earn you 5 points.', duration: 4000,textStyle: {textAlign: 'center'},
                            buttonStyle: {marginBottom: 40}})}
                            size={20}
                            style={{flex: 2}}
                            />
                        <Text style={{color: "#440047",
                        fontSize: normalize(20),
                        flex: 8, paddingLeft: 20}}>Your Points: {(info.histories.length*5).toString()}</Text>
                    </View>
                    </View>
                </View>
                    <FlatList
                            data={info.histories.sort((a, b) => b.dateTimeNow-a.dateTimeNow)}
                            renderItem={RenderListItem}
                            keyExtractor={(item) => item.dateTimeNow.toString()}
                            style={{marginBottom: '10%'}}
                        />
                <View>
                    <BottomSheet isVisible={this.state.sheetVisible}
                        
                    >    
                    <View style={{flex: 1, backgroundColor: 'white'}}>
                        <Text style={{textAlign: 'right', marginBottom: '0%'}}>
                                <Icon 
                                    name='times-circle'
                                    type='font-awesome-5' 
                                    onPress={() => this.setState({sheetVisible: !this.state.sheetVisible})}
                                    size={30}
                                    />
                        </Text>
                        <Input 
                                    placeholder='Complete Address of Donation place.'
                                    label='Donation Place: '
                                    onChangeText={(address) => this.setState({address})}
                                    value={this.state.address}
                                    multiline
                                    labelStyle={{color: 'black', fontWeight: 'bold'}}
                                />

                        <Input 
                                    placeholder='Mention Name '
                                    label='Donated To: '
                                    onChangeText={(name) => this.setState({name})}
                                    value={this.state.name}
                                    multiline
                                    labelStyle={{color: 'black', fontWeight: 'bold'}}
                                />
                        
                        <Input 
                                    placeholder="Mention Acceptor's contact number"
                                    onChangeText={(contact) => this.setState({contact})}
                                    value={this.state.contact}
                                    multiline
                                    labelStyle={{color: 'black', fontWeight: 'bold'}}
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
                                Mention Date and Time of Donation
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
                        <View style={{marginHorizontal: '10%', marginVertical: '5%'}}>
                        <Button
                                onPress = {() => this.handleSubmit(info._id)}
                                title=" Submit"
                                titleStyle={{marginLeft: '5%'}}
                                icon={
                                    <Icon
                                        name='telegram-plane'
                                        type='font-awesome-5'            
                                        size={24}
                                        color= 'white'
                                    />
                                }
                                buttonStyle={{
                                    backgroundColor: '#008891',
                                    borderRadius: 28
                                }}
                                
                                raised
                                />
                        </View> 
                        </View>
                    </BottomSheet>
                </View>
            </View>
        );
        }
        else {
            return (
                <View style={{flex: 1, backgroundColor: '#b0eacd'}}>
                <View style={{alignItems: 'center', backgroundColor: '#b0eacd'}}>
                    <Icon       
                        raised
                        name={'plus'}
                        type='font-awesome'
                        color='#fa4659'
                        style={{}}
                        onPress={() => this.setState({sheetVisible: !this.state.sheetVisible})}
                    />
                </View>
                    <Text style={{fontSize: normalize(20), fontWeight: 'bold', textAlign: 'center', marginVertical: '70%'}}>It seems you haven't donated blood. {'\n'} Add donation history when you donate . </Text>
                <View>
                    <BottomSheet isVisible={this.state.sheetVisible}
                        
                    >    
                    <View style={{flex: 1, backgroundColor: 'white'}}>
                        <Text style={{textAlign: 'right', marginBottom: '0%'}}>
                                <Icon 
                                    name='times-circle'
                                    type='font-awesome-5' 
                                    onPress={() => this.setState({sheetVisible: !this.state.sheetVisible})}
                                    size={30}
                                    />
                        </Text>
                        <Input 
                                    placeholder='Complete Address of Donation place.'
                                    label='Donation Place: '
                                    onChangeText={(address) => this.setState({address})}
                                    value={this.state.address}
                                    multiline
                                    labelStyle={{color: 'black', fontWeight: 'bold'}}
                                />

                        <Input 
                                    placeholder='Mention Name '
                                    label='Donated To: '
                                    onChangeText={(name) => this.setState({name})}
                                    value={this.state.name}
                                    multiline
                                    labelStyle={{color: 'black', fontWeight: 'bold'}}
                                />
                        
                        <Input 
                                    placeholder="Mention Acceptor's contact number"
                                    onChangeText={(contact) => this.setState({contact})}
                                    value={this.state.contact}
                                    multiline
                                    labelStyle={{color: 'black', fontWeight: 'bold'}}
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
                                Mention Date and Time of Donation
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
                        <View style={{marginHorizontal: '10%', marginVertical: '5%'}}>
                        <Button
                                onPress = {() => this.handleSubmit(info._id)}
                                title=" Submit"
                                titleStyle={{marginLeft: '5%'}}
                                icon={
                                    <Icon
                                        name='telegram-plane'
                                        type='font-awesome-5'            
                                        size={24}
                                        color= 'white'
                                    />
                                }
                                buttonStyle={{
                                    backgroundColor: '#008891',
                                    borderRadius: 28
                                }}
                                
                                raised
                                />
                        </View> 
                        </View>
                    </BottomSheet>
                </View>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(DonationHistory);