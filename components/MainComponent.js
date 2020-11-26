import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import NetInfo from '@react-native-community/netinfo';
import { View, Platform, ScrollView, Image, StyleSheet, SafeAreaView, Text } from 'react-native';
import {Icon} from 'react-native-elements';
import Home from './HomeComponent';
import Login from './LoginComponent';
import Profile from './ProfileComponent';
import NeedDonor from './NeedDonorComponent';
import DonationCamp from './DonationCamp';
import Notification from './NotificationsComponent';
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
import Sharing from './SharingComponent';
import AddPost from './AddPostComponent';
import Comments from './CommentsComponent';
import MyPosts from './MyPosts';
import DonationHistory from './DonationHistory';
import {connect} from 'react-redux';
import {fetchUsers, fetchCampRequests, fetchPosts, fetchLikes, fetchComments, fetchBloodRequests} from '../redux/ActionCreators';
import { Root, Toast } from 'native-base';
import {normalize} from '../assets/fonts/DynamicFontSize';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { auth, firestore } from '../firebase/firebase';

const mapStateToProps = (state) => {
    
    return {
        users: state.users,
        campRequests: state.campRequests,
        bloodRequests: state.bloodRequests,
        posts: state.posts,
        likes: state.likes,
        comments: state.comments
    };
}

const mapDispatchToProps = dispatch => {
    
    return {
        fetchUsers: () => dispatch(fetchUsers()),
        fetchCampRequests: () => dispatch(fetchCampRequests()),
        fetchBloodRequests: () => dispatch(fetchBloodRequests()),
        fetchPosts: () => dispatch(fetchPosts()),
        fetchLikes: () => dispatch(fetchLikes()),
        fetchComments: () => dispatch(fetchComments())
    };
}

const ProfileNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const NeedDonorNavigator = createStackNavigator();
const DonationCampNavigator = createStackNavigator();
const NotificationsNavigator = createStackNavigator();
const MainNavigator = createDrawerNavigator();
const LoginNavigator = createStackNavigator();
const MeetDeveloperNavigator = createStackNavigator();
const SharingNavigator = createStackNavigator();
const MyPostsNavigator = createStackNavigator();
const DonationHistoryNavigator = createStackNavigator();

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
                    ),

                    headerRight: () => (
                        <Icon 
                            name='user'
                            type='font-awesome' 
                            size={24}
                            color='white'
                            iconStyle={{marginRight: 10}}
                        />
                    )
                
                })}
            />
        </ProfileNavigator.Navigator>
    );
}

function DonationHistoryNavigatorScreen() {

    return(
        <DonationHistoryNavigator.Navigator
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
            <DonationHistoryNavigator.Screen
                name="Donation History"
                component={DonationHistory}
                options={{headerTitle: "Donation History"},({navigation}) => ({
                    headerLeft: () => (
                        <Icon 
                            name='menu' 
                            size={24}
                            color='white'
                            iconStyle={{marginLeft: 10}}
                            onPress={() => 
                                navigation.toggleDrawer()}
                        />
                    ),

                    headerRight: () => (
                        <Icon 
                            name='history'
                            type='font-awesome-5' 
                            size={24}
                            color='white'
                            iconStyle={{marginRight: 10}}
                        />
                    )
                
                })}
            />
        </DonationHistoryNavigator.Navigator>
    );
}

function MyPostsNavigatorScreen() {

    return(
        <MyPostsNavigator.Navigator
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
            <MyPostsNavigator.Screen
                name="My Posts"
                component={MyPosts}
                options={{headerTitle: "My Posts"},({navigation}) => ({
                    headerLeft: () => (
                        <Icon 
                            name='menu' 
                            size={24}
                            color='white'
                            iconStyle={{marginLeft: 10}}
                            onPress={() => 
                                navigation.toggleDrawer()}
                        />
                    ),

                    headerRight: () => (
                        <Icon 
                            name='images'
                            type='font-awesome-5' 
                            size={24}
                            color='white'
                            iconStyle={{marginRight: 10}}
                        />
                    )
                
                })}
            />
            <MyPostsNavigator.Screen
                name="User Details"
                component={UserDetail}
                options= {{ headerTitle: "User Details", headerStyle: {backgroundColor: '#85cfcb'}, 
                    headerTintColor: '#200019', 
                    headerTitleStyle: {color: '#200019'}
                }}
            />
            <MyPostsNavigator.Screen
                name="Comments"
                component={Comments}
                options= {{ headerTitle: "Comments", headerStyle: {backgroundColor: '#85cfcb'}, 
                    headerTintColor: '#200019', 
                    headerTitleStyle: {color: '#200019'}
                }}
            />
        </MyPostsNavigator.Navigator>
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
                    ),

                    headerRight: () => (
                        <Icon 
                            name='sign-in'
                            type='font-awesome' 
                            size={24}
                            color='white'
                            iconStyle={{marginRight: 10}}
                        />
                    )
                
                })}
            />
        </LoginNavigator.Navigator>
    );
}

function SharingNavigatorScreen() {
    return(
        <SharingNavigator.Navigator
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
            <SharingNavigator.Screen
                name="Share with Network"
                component={Sharing}
                options={{headerTitle: "Share with Network"},({navigation}) => ({
                    headerLeft: () => (
                        <Icon 
                            name='menu' 
                            size={24}
                            color='white'
                            iconStyle={{marginLeft: 10}}
                            onPress={() => 
                                navigation.toggleDrawer()}
                        />
                    ),

                    headerRight: () => (
                        <Icon 
                            name='share-alt'
                            type='font-awesome-5' 
                            size={24}
                            color='white'
                            iconStyle={{marginRight: 10}}
                        
                        />
                    )
                
                })}
            />
            <SharingNavigator.Screen
                name="Add Post"
                component={AddPost}
                options= {{ headerTitle: "Add Post", headerStyle: {backgroundColor: '#85cfcb'}, 
                    headerTintColor: '#200019', 
                    headerTitleStyle: {color: '#200019'}
                }}
            />
            <SharingNavigator.Screen
                name="User Details"
                component={UserDetail}
                options= {{ headerTitle: "User Details", headerStyle: {backgroundColor: '#85cfcb'}, 
                    headerTintColor: '#200019', 
                    headerTitleStyle: {color: '#200019'}
                }}
            />
            <SharingNavigator.Screen
                name="Comments"
                component={Comments}
                options= {{ headerTitle: "Comments", headerStyle: {backgroundColor: '#85cfcb'}, 
                    headerTintColor: '#200019', 
                    headerTitleStyle: {color: '#200019'}
                }}
            />
        </SharingNavigator.Navigator>
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
                    ),

                    headerRight: () => (
                        <Icon 
                            name='tint'
                            type='font-awesome' 
                            size={24}
                            color='white'
                            iconStyle={{marginRight: 10}}
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

function DonationCampNavigatorScreen(){
    return(
        <DonationCampNavigator.Navigator
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
            <DonationCampNavigator.Screen
                name="Blood Donation Camp"
                component={DonationCamp}
                options={{headerTitle: "Blood Donation Camp"},({navigation}) => ({
                    headerLeft: () => (
                        <Icon 
                            name='menu' 
                            size={24}
                            color='white'
                            iconStyle={{marginLeft: 10}}
                            onPress={() => 
                                navigation.toggleDrawer()}
                        />
                    ),

                    headerRight: () => (
                        <Icon 
                            name='medkit'
                            type='font-awesome-5'
                            size={24}
                            color='white'
                            iconStyle={{marginRight: 10}}
                        />
                    )
                
                })}
            />
        </DonationCampNavigator.Navigator>
    );
}

function NotificationsNavigatorScreen() {
    return(
        <NotificationsNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#85cfcb'
                },
                headerTintColor: '#200019',
                headerTitleStyle: {
                    color: '#200019'            
                }
            }}
        >
            <NotificationsNavigator.Screen
                name="Notifications"
                component={Notification}
                options={{headerTitle: "Notifications"},({navigation}) => ({
                    headerLeft: () => (
                        <Icon 
                            name='menu' 
                            size={24}
                            color='#200019'
                            iconStyle={{marginLeft: 10}}
                            onPress={() => 
                                navigation.toggleDrawer()}
                        />
                    ),

                    headerRight: () => (
                        <Icon 
                            name='bell'
                            type='font-awesome'
                            size={24}
                            color='#200019'
                            iconStyle={{marginRight: 10}}
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
                    ),

                    headerRight: () => (
                        <Icon 
                            name='home'
                            type='font-awesome'
                            size={24}
                            color='white'
                            iconStyle={{marginRight: 10}}
                        />
                    )
                
                })}
            />
        </HomeNavigator.Navigator>
    );
}

//connect()(HomeNavigatorScreen);

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
                    ),

                    headerRight: () => (
                        <Icon 
                            name='code'
                            type='font-awesome-5'
                            size={24}
                            color='white'
                            iconStyle={{marginRight: 10}}
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
        <View style={{marginTop: normalize(20), padding: 20, marginBottom: normalize(20)}}>
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
                backgroundColor  : "#f0fff3" , width: normalize(380)}}
            drawerType='slide'
            drawerContent={(props) => <CustomDrawerContentComponent {...props} />}
            drawerContentOptions={{
                activeTintColor: '#070d59',
                activeBackgroundColor: '#c6f1e7',
                inactiveTintColor: 'black',
                
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
                name="Donation History"
                component={DonationHistoryNavigatorScreen}
                options={{headerTitle: "Donation History"},{drawerIcon: ({ tintColor }) => (
                    <Icon
                      name='history'
                      type='font-awesome-5'            
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
                name="Blood Donation Camp"
                component={DonationCampNavigatorScreen}
                options={{headerTitle: "Blood Donation Camp"},{drawerIcon: ({ tintColor }) => (
                    <Icon
                      name='medkit'
                      type='font-awesome-5'            
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
                name="Share with Network"
                component={SharingNavigatorScreen}
                options={{ headerTitle: "Share with Network"},{drawerIcon: ({ tintColor }) => (
                    <Icon
                      name='share-alt'
                      type='font-awesome-5'            
                      size={24}
                      color={tintColor}
                    />
                  )}}
            />
            <MainNavigator.Screen
                name="My Posts"
                component={MyPostsNavigatorScreen}
                options={{ headerTitle: "My Posts"},{drawerIcon: ({ tintColor }) => (
                    <Icon
                      name='images'
                      type='font-awesome-5'            
                      size={24}
                      color={tintColor}
                    />
                  )}}
            />
            <MainNavigator.Screen
                name="Meet Developer"
                component={MeetDeveloperNavigatorScreen}
                options={{ headerTitle: "Meet Developer"},{drawerIcon: ({ tintColor }) => (
                    <Icon
                      name='code'
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


  async componentDidMount() {

    await this.props.fetchUsers();
    var user = auth.currentUser;
    if(user) {

        var docId = this.props.users.users.filter(usr => usr.uid === user.uid)[0]._id;
        this.registerForPushNotificationsAsync(docId);
    }
    

      this.props.fetchCampRequests();
      this.props.fetchBloodRequests();
      this.props.fetchPosts();
      this.props.fetchLikes();
      this.props.fetchComments();
    window.value = NetInfo.addEventListener(connectionInfo => this.handleConnectivityChange(connectionInfo))
  }

  async registerForPushNotificationsAsync(docId) {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
   
    if(token) {
    const res = await firestore.collection('users').doc(docId).set({token}, {merge: true});
    }

    Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
    });
 
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        sound:  'default',
        showBadge: true,
        
      });
    }
 
    return token;
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
            Toast.show ({ text: 'You are now using Mobile data', duration: 4000, textStyle: {textAlign: 'center'},
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
      flexDirection: 'row',
      borderBottomColor: '#c6f1e7',
      borderBottomWidth: 10
    },
    drawerHeaderText: {
      color: '#1f3c88',
      fontSize: normalize(24),
      fontWeight: 'bold',
    },
    drawerImage: {
      width: 100,
      height: 100,
    }
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Main);