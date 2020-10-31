import React, {Component} from 'react';
import {BLOOD} from '../shared/blood';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import NetInfo from '@react-native-community/netinfo';
import { View, Platform, ScrollView, Image, StyleSheet, SafeAreaView, Text, ToastAndroid } from 'react-native';
import {Icon} from 'react-native-elements';
import Home from './HomeComponent';
import Login from './LoginComponent';
import Profile from './ProfileComponent';
import NeedDonor from './NeedDonorComponent';
import HospitalStore from './HospitalStore';
import Notifications from './NotificationsComponent';
import Loading from './LoadingComponent';
import { color } from 'react-native-reanimated';
import MeetDeveloper from './MeetDeveloper';
import APlusDonorList from './APlusDonorListComponent';
import AMinusDonorList from './AMinusDonorListComponent';
import BPlusDonorList from './BPlusDonorListComponent';
import BMinusDonorList from './BMinusDonorListComponent';
import OPlusDonorList from './OPlusDonorListComponent';
import OMinusDonorList from './OMinusDonorListComponent';
import ABPlusDonorList from './ABPlusDonorListComponent';
import ABMinusDonorList from './ABMinusDonorListComponent';
import UserDetail from './UserDetailComponent';
import {connect} from 'react-redux';
import {fetchUsers} from '../redux/ActionCreators';
import { auth } from '../firebase/firebase';
import { Root, Toast } from 'native-base';

const mapStateToProps = (state) => {
    
    return {
        users: state.users
    };
}

const mapDispatchToProps = dispatch => {
    
    return {
        fetchUsers: () => dispatch(fetchUsers())
    };
}

const ProfileNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const NeedDonorNavigator = createStackNavigator();
const HospitalStoreNavigator = createStackNavigator();
const NotificationsNavigator = createStackNavigator();
const MainNavigator = createDrawerNavigator();
const LoginNavigator = createStackNavigator();
const MeetDeveloperNavigator = createStackNavigator();

function ProfileNavigatorScreen() {

    return(
        <ProfileNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#fa4659"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <ProfileNavigator.Screen
                name="My Profile"
                component={Profile}
                options={{headerTitle: "My Profile"},({navigation}) => ({
                    headerLeft: () => (
                        <Icon 
                            name='menu' 
                            size={24}
                            color='white'
                            iconStyle={{marginLeft: 10}}
                            onPress={() => 
                                navigation.toggleDrawer()}
                        />
                    )
                
                })}
            />
        </ProfileNavigator.Navigator>
    );
}

function LoginNavigatorScreen() {
    return(
        <LoginNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#fa4659"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <LoginNavigator.Screen
                name="Login"
                component={Login}
                options={{headerTitle: "Login"},({navigation}) => ({
                    headerLeft: () => (
                        <Icon 
                            name='menu' 
                            size={24}
                            color='white'
                            iconStyle={{marginLeft: 10}}
                            onPress={() => 
                                navigation.toggleDrawer()}
                        />
                    )
                
                })}
            />
        </LoginNavigator.Navigator>
    );
}

function NeedDonorNavigatorScreen() {
    return(
        <NeedDonorNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#fa4659"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <NeedDonorNavigator.Screen
                name="Need Donor"
                component={NeedDonor}
                options={{headerTitle: "Need Donor"},({navigation}) => ({
                    headerLeft: () => (
                        <Icon 
                            name='menu' 
                            size={24}
                            color='white'
                            iconStyle={{marginLeft: 10}}
                            onPress={() => 
                                navigation.toggleDrawer()}
                        />
                    )
                
                })}
            />
            <NeedDonorNavigator.Screen
                name="A+ Donors"
                component={APlusDonorList}
                options= {{ headerTitle: "A+ Donors", headerStyle: {backgroundColor: '#85cfcb'}, 
                    headerTintColor: '#200019', 
                    headerTitleStyle: {color: '#200019'}
                }}
            />
            <NeedDonorNavigator.Screen
                name="A- Donors"
                component={AMinusDonorList}
                options= {{ headerTitle: "A- Donors", headerStyle: {backgroundColor: '#85cfcb'}, 
                    headerTintColor: '#200019', 
                    headerTitleStyle: {color: '#200019'}
                }}
            />
            <NeedDonorNavigator.Screen
                name="B+ Donors"
                component={BPlusDonorList}
                options= {{ headerTitle: "B+ Donors", headerStyle: {backgroundColor: '#85cfcb'}, 
                    headerTintColor: '#200019', 
                    headerTitleStyle: {color: '#200019'}
                }}
            />
            <NeedDonorNavigator.Screen
                name="B- Donors"
                component={BMinusDonorList}
                options= {{ headerTitle: "B- Donors", headerStyle: {backgroundColor: '#85cfcb'}, 
                    headerTintColor: '#200019', 
                    headerTitleStyle: {color: '#200019'}
                }}
            />
            <NeedDonorNavigator.Screen
                name="O+ Donors"
                component={OPlusDonorList}
                options= {{ headerTitle: "O+ Donors", headerStyle: {backgroundColor: '#85cfcb'}, 
                    headerTintColor: '#200019', 
                    headerTitleStyle: {color: '#200019'}
                }}
            />
            <NeedDonorNavigator.Screen
                name="O- Donors"
                component={OMinusDonorList}
                options= {{ headerTitle: "O- Donors", headerStyle: {backgroundColor: '#85cfcb'}, 
                    headerTintColor: '#200019', 
                    headerTitleStyle: {color: '#200019'}
                }}
            />
            <NeedDonorNavigator.Screen
                name="AB+ Donors"
                component={ABPlusDonorList}
                options= {{ headerTitle: "AB+ Donors", headerStyle: {backgroundColor: '#85cfcb'}, 
                    headerTintColor: '#200019', 
                    headerTitleStyle: {color: '#200019'}
                }}
            />
            <NeedDonorNavigator.Screen
                name="AB- Donors"
                component={ABMinusDonorList}
                options= {{ headerTitle: "AB- Donors", headerStyle: {backgroundColor: '#85cfcb'}, 
                    headerTintColor: '#200019', 
                    headerTitleStyle: {color: '#200019'}
                }}
            />
            <NeedDonorNavigator.Screen
                name="User Details"
                component={UserDetail}
                options= {{ headerTitle: "User Details", headerStyle: {backgroundColor: '#85cfcb'}, 
                    headerTintColor: '#200019', 
                    headerTitleStyle: {color: '#200019'}
                }}
            />
        </NeedDonorNavigator.Navigator>
    );
}

function HospitalStoreNavigatorScreen(){
    return(
        <HospitalStoreNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#fa4659"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <HospitalStoreNavigator.Screen
                name="Hospital Store"
                component={HospitalStore}
                options={{headerTitle: "Hospital Store"},({navigation}) => ({
                    headerLeft: () => (
                        <Icon 
                            name='menu' 
                            size={24}
                            color='white'
                            iconStyle={{marginLeft: 10}}
                            onPress={() => 
                                navigation.toggleDrawer()}
                        />
                    )
                
                })}
            />
        </HospitalStoreNavigator.Navigator>
    );
}

function NotificationsNavigatorScreen() {
    return(
        <NotificationsNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#fa4659"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <NotificationsNavigator.Screen
                name="Notifications"
                component={Notifications}
                options={{headerTitle: "Notifications"},({navigation}) => ({
                    headerLeft: () => (
                        <Icon 
                            name='menu' 
                            size={24}
                            color='white'
                            iconStyle={{marginLeft: 10}}
                            onPress={() => 
                                navigation.toggleDrawer()}
                        />
                    )
                
                })}
            />
        </NotificationsNavigator.Navigator>
    );
}

function HomeNavigatorScreen(){

    return(
        <HomeNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#fa4659"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <HomeNavigator.Screen
                name="Home"
                component={Home}
                options={{headerTitle: "Home"},({navigation}) => ({
                    headerLeft: () => (
                        <Icon 
                            name='menu' 
                            size={24}
                            color='white'
                            iconStyle={{marginLeft: 10}}
                            onPress={() => 
                                navigation.toggleDrawer()}
                        />
                    )
                
                })}
            />
        </HomeNavigator.Navigator>
    );
}

connect()(HomeNavigatorScreen);

function MeetDeveloperNavigatorScreen() {
    return(
        <MeetDeveloperNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#fa4659"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <LoginNavigator.Screen
                name="Meet Developer"
                component={MeetDeveloper}
                options={{headerTitle: "Meet Developer"},({navigation}) => ({
                    headerLeft: () => (
                        <Icon 
                            name='menu' 
                            size={24}
                            color='white'
                            iconStyle={{marginLeft: 10}}
                            onPress={() => 
                                navigation.toggleDrawer()}
                        />
                    )
                
                })}
            />
        </MeetDeveloperNavigator.Navigator>
    );
}

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{flex:1}}>
          <Image source={require('./images/bloodLogo.png')} style={styles.drawerImage} />
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>apnaBloodBank</Text>
          </View>
        </View>
        <View style={{marginTop: 60, padding: 20}}>
        <DrawerItemList {...props} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );

function MainNavigatorScreen() {

    return(
        <MainNavigator.Navigator
            initialRouteName="Home"
            drawerStyle={{
                backgroundColor  : "#f0fff3" }}
            drawerContent={(props) => <CustomDrawerContentComponent {...props} />}
            drawerContentOptions={{
                activeTintColor: '#070d59',
                activeBackgroundColor: '#c6f1e7',
                inactiveTintColor: 'black'
            }}
        >   
            <MainNavigator.Screen
                name="Login"
                component={LoginNavigatorScreen}
                options={{ headerTitle: "Login"},{drawerIcon: ({ tintColor }) => (
                    <Icon
                      name='sign-in'
                      type='font-awesome'            
                      size={24}
                      color={tintColor}
                    />
                  )}}
            />
            <MainNavigator.Screen
                name="Home"
                component={HomeNavigatorScreen}
                options={{ headerTitle: "Home"},{drawerIcon: ({ tintColor }) => (
                    <Icon
                      name='home'
                      type='font-awesome'            
                      size={24}
                      color={tintColor}
                    />
                  )}}
            />
            <MainNavigator.Screen
                name="My Profile"
                component={ProfileNavigatorScreen}
                options={{headerTitle: "My Profile"},{drawerIcon: ({ tintColor }) => (
                    <Icon
                      name='user'
                      type='font-awesome'            
                      size={24}
                      color={tintColor}
                    />
                  )}}
            />
            <MainNavigator.Screen
                name="Need Donor"
                component={NeedDonorNavigatorScreen}
                options={{ headerTitle: "Need Donor"},{drawerIcon: ({ tintColor }) => (
                    <Icon
                      name='tint'
                      type='font-awesome'            
                      size={24}
                      color={tintColor}
                    />
                  )}}
            />
            <MainNavigator.Screen
                name="Hospital Store"
                component={HospitalStoreNavigatorScreen}
                options={{headerTitle: "Hospital STore"},{drawerIcon: ({ tintColor }) => (
                    <Icon
                      name='hospital-o'
                      type='font-awesome'            
                      size={22}
                      color={tintColor}
                    />
                )}}
            />
            <MainNavigator.Screen
                name="Notifications"
                component={NotificationsNavigatorScreen}
                options={{headerTitle: "Notifications"},{drawerIcon: ({ tintColor }) => (
                    <Icon
                      name='bell'
                      type='font-awesome'            
                      size={22}
                      color={tintColor}
                    />
                )}}
            />
            <MainNavigator.Screen
                name="Meet Developer"
                component={MeetDeveloperNavigatorScreen}
                options={{ headerTitle: "Meet Developer"},{drawerIcon: ({ tintColor }) => (
                    <Icon
                      name='handshake'
                      type='font-awesome-5'            
                      size={24}
                      color={tintColor}
                    />
                  )}}
            />
        </MainNavigator.Navigator>
    );
}

class Main extends Component {


  componentDidMount() {
      this.props.fetchUsers();
    
    window.value = NetInfo.addEventListener(connectionInfo => this.handleConnectivityChange(connectionInfo))
  }

  componentWillUnmount() {
        window.value();
  }

  handleConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type) {
        case 'none': 
            Toast.show ({text: 'You are now offline', duration: 4000,textStyle: {textAlign: 'center'},
            buttonStyle: {marginBottom: 40}});
            break;
        case 'wifi':
            Toast.show ({ text: 'You are now on WiFi', duration: 4000,textStyle: {textAlign: 'center'},
            buttonStyle: {marginBottom: 40}});
            break;
        case 'cellular':
            Toast.show ({ text: 'You are now on Cellular', duration: 4000, textStyle: {textAlign: 'center'},
            buttonStyle: {marginBottom: 40}});
            break;
        case 'unknown' :
            Toast.show ({ text: 'The network state could not or has yet to be be determined', duration: 4000, textStyle: {textAlign: 'center'},
            buttonStyle: {marginBottom: 40}});
            break;
        case 'bluetooth' :
            Toast.show ({ text: 'You are now on Bluetooth', duration: 4000, textStyle: {textAlign: 'center'},
            buttonStyle: {marginBottom: 40}});
            break;
        case 'other' :
            Toast.show ({ text: 'Active network over another type of network', duration: 4000, textStyle: {textAlign: 'center'},
            buttonStyle: {marginBottom: 40}});
            break;
        default: 
    }
}
  render() {
 
    return (
        <NavigationContainer>
            <Root>
            <MainNavigatorScreen/>  
            </Root>       
        </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#11cbd7',
      height: 150,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: '#1f3c88',
      fontSize: 24,
      fontWeight: 'bold',
    },
    drawerImage: {
      width: 100,
      height: 100,
    }
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Main);