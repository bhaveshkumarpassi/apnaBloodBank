import React, {Component} from 'react';
import { View, Image, ImageBackground, Text, StyleSheet} from 'react-native';
import { Avatar, Accessory , ButtonGroup, Icon} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Login from './LoginComponent';
import Profile from './ProfileComponent';
import { auth, firestore, fireauth, firebasestore } from '../firebase/firebase';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/ActionCreators';
import {fetchUsers} from '../redux/ActionCreators';
import UserDetailComponent from './UserDetailComponent';

const mapStateToProps = (state) => {
    
  return {
      users: state.users,
      auth: state.auth
  };
}

const mapDispatchToProps = (dispatch) => {
    
  return {
      fetchUsers: () => dispatch(fetchUsers()),
      logoutUser: (navigation) => dispatch(logoutUser(navigation))
  };
}

class Home extends Component {

    _isMounted = false;
    constructor(props) {
       super(props);

       this.state = {
         imageUrl: 'https://firebasestorage.googleapis.com/v0/b/apnabloodbankserver.appspot.com/o/uiImages%2Favatar1.png?alt=media&token=e1666ac9-8141-465c-b886-5eaf48b00119',
         fullname: 'User'
       }
    }

  componentDidMount() {

    this._isMounted = true;
    this.unsubscribe =  auth.onAuthStateChanged(user => {
      
      if(this._isMounted) {
        if(user) {
 
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
      }
    })
}

componentWillUnmount() {

    this._isMounted = false;
    this.unsubscribe();
}



  handleLogout() {

        this.props.logoutUser(this.props.navigation);
  }


  render(){

    return (
        <View style={styles.container}>
            <View style={styles.avatar}>
            <Avatar rounded
                size="xlarge"
                source={{uri: this.state.imageUrl}}
                icon={{name: 'user', type: 'font-awesome'}}
                />
            </View>
            <Text style={styles.text}>Hello! {this.state.fullname}</Text>
            <ImageBackground source={require('./images/homeBlood2.jpg')} style={styles.image}>
              <Text style={styles.text}>Welcome !! to apnaBloodBank app.</Text>
            </ImageBackground>
            <View style={{flex:1 , flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>
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
                        name={'pencil'}
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
        </View>
    );
}
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      alignItems: "center",
      backgroundColor  : "#f0fff3",
      justifyContent: 'center',
      paddingTop: 20
    },
    avatar: {
      flex: 2
    },
    image: {
      flex: 3,
      //resizeMode: "cover",
      height: 390,
      opacity: 0.6
    },
    text: {
      color: "#440047",
      fontSize: 30,
      fontWeight: "bold",
      textAlign: 'center',
      paddingBottom: 30
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(Home);

