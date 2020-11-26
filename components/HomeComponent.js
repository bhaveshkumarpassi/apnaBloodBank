import React, {Component} from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import { Avatar, Icon, Image, Button} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { auth } from '../firebase/firebase';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/ActionCreators';
import {fetchUsers} from '../redux/ActionCreators';
import {normalize} from '../assets/fonts/DynamicFontSize';
import { Loading } from './LoadingComponent';
import Modal from 'react-native-modal';

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

    constructor(props) {
       super(props);

       this.state = {
         imageUrl: 'https://firebasestorage.googleapis.com/v0/b/apnabloodbankserver.appspot.com/o/uiImages%2Favatar1.png?alt=media&token=e1666ac9-8141-465c-b886-5eaf48b00119',
         fullname: 'User',
         isFontLoaded: false,
         user: null,
         isModalVisible: false
       }
    }

  componentDidMount() {

    this.unsubscribe =  auth.onAuthStateChanged(user => {
      
        if(user) {

          if(user.photoURL)
          {
            this.setState({
            fullname: user.displayName,
            imageUrl: user.photoURL,
            user: user,
            })
          }
          else {
            this.setState({
              fullname: user.displayName,
              imageUrl: 'https://firebasestorage.googleapis.com/v0/b/apnabloodbankserver.appspot.com/o/uiImages%2Favatar1.png?alt=media&token=e1666ac9-8141-465c-b886-5eaf48b00119',
              user: user
            })
          }
        }
        else {
          this.setState({
            fullname: 'User',
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/apnabloodbankserver.appspot.com/o/uiImages%2Favatar1.png?alt=media&token=e1666ac9-8141-465c-b886-5eaf48b00119',
            user: null
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

    if(this.props.users.isLoading) {
      return (
        <Loading />
      );
    }
    else if(this.props.users.errMess) {
      return (
        <Text>{this.props.users.errMess}</Text>
      );
    }
    
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

            <View style={{paddingTop: '5%'}}>
            <Button
                        onPress={() => this.setState({isModalVisible: !this.state.isModalVisible})}
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
          <Modal 
            isVisible={this.state.isModalVisible}
            style={{backgroundColor: '#ffffff', 
                    borderRadius: 10,
                    height: screenHeight
            }}
            animationIn='zoomInUp'
            animationOut='zoomOutDown'
            animationInTiming={500}
            animationOutTiming={500}
            onBackButtonPress={() => this.setState({isModalVisible: !this.state.isModalVisible})}
            >
              <ScrollView>
              <Text style={{textAlign: 'left'}}>
                  <Icon 
                      name='times-circle'
                      type='font-awesome-5' 
                      onPress={() => this.setState({isModalVisible: !this.state.isModalVisible})}
                      size={30}
                      />
              </Text>
              <Text style={{fontSize: normalize(20), fontWeight: 'bold', textAlign: 'center', marginBottom: 10}}>5 minutes read</Text>
              <Text style={{fontSize: normalize(17), marginHorizontal: 20}}>A)  Easy and majority navigation between various screens are provided by slide side app drawer. Give it a try. {'\n'} </Text>
              <Text style={{fontSize: normalize(17), marginHorizontal: 20}}>B)  First and foremost screen is Login Screen where you need to first register yourself to use all functionalities of our network. {'\n'} </Text>
              <Text style={{fontSize: normalize(17), marginHorizontal: 20}}>C)  Second Screen is My Profile Screen where you can view current status of your profile and can also make changes to it as and when required. like updating your profile pic. {'\n'} </Text>
              <Text style={{fontSize: normalize(17), marginHorizontal: 20}}>D)  Third Screen is Donation history Screen where you can view all the records of your donations to network. You need to regularly update it whenever you make a donation. This is helpful if a user wants to filter you as a donor. {'\n'} </Text>
              <Text style={{fontSize: normalize(17), marginHorizontal: 20}}>E)  Fourth Screen is Need Donor Screen where you have two options to choose a donor first option is you can call the donor nearest to you by filtering it's location. Second option is by making a blood request and posting it to the network
              . This will fire a notifcation to every other users so that they can reach you in time. Don't forget to withdraw the request when you have successfuly got a donor. {'\n'} </Text>
              <Text style={{fontSize: normalize(17), marginHorizontal: 20}}>F)  Next Screen is Blood Donation Camp Screen. If you are a part of any community or organisation planning to organise a blood donation camp to help the local blood banks in your region then you can get a large number of donors 
              from our network of apnaBloodBank , for that all you are suppose to do is to make a blood donation camp request. {'\n'} </Text>
              <Text style={{fontSize: normalize(17), marginHorizontal: 20}}>G)  Next Screen is Notifications Screen where you can get the details of every new notification of either Blood need or Blood Donation Camp you need to either accept it or reject it remove it so that
              it is not visible the next time you open the application. {'\n'} </Text>
              <Text style={{fontSize: normalize(17), marginHorizontal: 20}}>H)  Because it's a network of users. so you can also share whatever you feel like it could be a thank you message to the donor you got from network or your experience about donation to motivate others and a lot many other things by sharing a post. {'\n'} </Text>
              <Text style={{fontSize: normalize(17), marginHorizontal: 20}}>I)  Sometimes you may need to restart your application to see the changes. {'\n'} </Text>
              </ScrollView>
          </Modal>
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

