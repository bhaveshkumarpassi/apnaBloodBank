import React, {Component} from 'react';
import { View, Image, ImageBackground, Text, StyleSheet} from 'react-native';
import { Avatar, Accessory , ButtonGroup, Icon} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Login from './LoginComponent';
import Profile from './ProfileComponent';

function Home({ navigation: { navigate } }) {

    const buttons = ['Login', 'Edit Profile', 'Logout'];
    return (
        <View style={styles.container}>
            <View style={styles.avatar}>
            <Avatar rounded
                size="xlarge"
                source={require('./images/avatar1.png')}
                icon={{name: 'user', type: 'font-awesome'}}
                />
            <Text style={styles.text}>Hello! user</Text>
            </View>
            <ImageBackground source={require('./images/homeBlood2.jpg')} style={styles.image}>
              <Text style={styles.text}>Welcom !! to apnaBloodBank app.</Text>
            </ImageBackground>
            <View style={{flex:1 , flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>
              <Icon
                        raised
                        reverse
                        name={'sign-in'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => navigate('Login')}
                    />
                    <Icon
                        raised
                        reverse
                        name={'pencil'}
                        type='font-awesome'
                        color='#512DA8'
                        onPress={() => navigate('My Profile')}
                    />
                    <Icon
                            raised
                            reverse
                            name='sign-out'
                            type='font-awesome'
                            color='green'
                            //onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)}
                    />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      alignItems: "center",
      backgroundColor  : "#f0fff3",
      justifyContent: 'center',
      paddingTop: 30,
    },
    avatar: {
      flex: 2,
      paddingBottom: 20
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
    },
    buttonGroup: {
      flex: 3
    }
  });

export default Home;

