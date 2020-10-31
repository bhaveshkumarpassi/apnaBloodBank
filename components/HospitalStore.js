import React, {Component} from 'react';
import { View, Image, ImageBackground, Text, StyleSheet} from 'react-native';
import { auth, firestore, fireauth, firebasestore } from '../firebase/firebase';
import {Icon, Button} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

class HospitalStore extends Component {

    constructor(props) {

        super(props);
        this.state = {
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
            return (
                <View>
                    <Text>This is HospitalStore component.</Text>   
                </View>
            );
        }
        else {
        return (

            <ScrollView style={{backgroundColor: '#f0fff3'}}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                <Text style={{color: "#440047",
                    fontSize: 25,
                    fontWeight: "bold",
                    textAlign: 'center',
                    marginTop: 40,
                    flex: 1
                    }}>Sorry !! You need to Login first.</Text>
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
                    />
                <Button
                    onPress={() => this.props.navigation.navigate('Home')}
                    title="Go Back To Home"
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
                    />
                </ImageBackground>
                
                </View>
            </ScrollView>
        );
        }
    }
}

export default HospitalStore;