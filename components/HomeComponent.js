import React, {Component} from 'react';
import { View,ImageBackground, Text, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import { Avatar, Accessory , ButtonGroup, Icon, Image, Card, Button} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Login from './LoginComponent';
import Profile from './ProfileComponent';
import { auth, firestore, fireauth, firebasestore } from '../firebase/firebase';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/ActionCreators';
import {fetchUsers} from '../redux/ActionCreators';
import {fetchCampRequests} from '../redux/ActionCreators';
import UserDetailComponent from './UserDetailComponent';
import {normalize} from '../assets/fonts/DynamicFontSize';
import {widthToDp, heightToDp} from '../responsive';
import { Loading } from './LoadingComponent';

const mapStateToProps = (state) => {
    
  return {
      users: state.users,
      auth: state.auth
  };
}

const mapDispatchToProps = (dispatch) => {
    
  return {
      fetchUsers: () => dispatch(fetchUsers()),
      logoutUser: (navigation) => dispatch(logoutUser(navigation)),
      fetchCampRequests: () => dispatch(fetchCampRequests())
  };
}

class Home extends Component {

    constructor(props) {
       super(props);

       this.state = {
         imageUrl: 'https://firebasestorage.googleapis.com/v0/b/apnabloodbankserver.appspot.com/o/uiImages%2Favatar1.png?alt=media&token=e1666ac9-8141-465c-b886-5eaf48b00119',
         fullname: 'User',
         isFontLoaded: false
       }
    }

  componentDidMount() {

    this.unsubscribe =  auth.onAuthStateChanged(user => {
      
        if(user) {
          
          this.props.fetchCampRequests();
          if(user.photoURL)
          {
            this.setState({
            fullname: user.displayName,
            imageUrl: user.photoURL
            })
          }
          else {
            this.setState({
              fullname: user.displayName,
              imageUrl: 'https://firebasestorage.googleapis.com/v0/b/apnabloodbankserver.appspot.com/o/uiImages%2Favatar1.png?alt=media&token=e1666ac9-8141-465c-b886-5eaf48b00119'
            })
          }
        }
        else {
          this.setState({
            fullname: 'User',
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/apnabloodbankserver.appspot.com/o/uiImages%2Favatar1.png?alt=media&token=e1666ac9-8141-465c-b886-5eaf48b00119'
          })
        }
    })

}

componentWillUnmount() {
    this.unsubscribe();
}



  handleLogout() {

        this.props.logoutUser(this.props.navigation);
  }


  render(){

    return (
      <ScrollView>
        <View style={styles.container}>
            <View style={styles.avatar}>
            
            <Avatar rounded
                size="xlarge"
                source={{uri: this.state.imageUrl}}
                icon={{name: 'user', type: 'font-awesome'}}
                />
            <Text style={styles.text}>Hello! {this.state.fullname}</Text>
            <Text style={styles.text}>Welcome !! to apnaBloodBank app.</Text>
            <View style={{padding: 20}}>
            <Button
                        //onPress={() => this.handleLogin(this.state.email, this.state.password)}
                        title="View Guide"
                        icon={
                            <Icon
                                name='book-open'
                                type='font-awesome-5'            
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: "#fa4659",
                            borderRadius: 30
                        }}
                        titleStyle={{padding: 10}}
                        containerStyle={{margin: 20}}
                        raised
                        />
                    <Button
                        //onPress={() => this.handleLogout()}
                        title="View Stars"
                        icon={
                            <Icon
                                name='star'
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
            <View style={{flex:1 , flexDirection: 'row', marginVertical: '10%'}}>
              <Icon
                        raised
                        reverse
                        name={'sign-in'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => this.props.navigation.navigate('Login')}
                    />
                    <Icon
                        raised
                        reverse
                        name={'user'}
                        type='font-awesome'
                        color='#512DA8'
                        onPress={() => this.props.navigation.navigate('My Profile')}
                    />
                    <Icon
                            raised
                            reverse
                            name='sign-out'
                            type='font-awesome'
                            color='green'
                            onPress={() => this.handleLogout()}
                    />
            </View>
            <View style={{paddingVertical: '5%'}}>
            <Image
              source={require('./images/homeBlood.jpg')}
              style={{height: 250, width: 250, borderRadius: 25}}
              PlaceholderContent={<ActivityIndicator />}
            />
            </View>
            
            
            </View>
          </View>
      </ScrollView>
    );
}
}
var screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
      flex:1
    },
    avatar: {
      alignItems: 'center',
      backgroundColor  : "#f0fff3",
      paddingVertical: 10
    },
    
    text: {
      color: "#440047",
      fontSize: normalize(25),
      textAlign: 'center',
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(Home);

