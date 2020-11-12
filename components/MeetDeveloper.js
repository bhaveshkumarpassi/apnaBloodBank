import React, {Component} from 'react';
import { View, Image, ImageBackground, Text, StyleSheet, Linking} from 'react-native';
import { Card, Icon, SocialIcon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {normalize} from '../assets/fonts/DynamicFontSize';

class MeetDeveloper extends Component {

    render() {
        return (
            <ScrollView style={{backgroundColor: '#f0fff3', flex: 1}}>
                <View style={{flexDirection: 'column', alignItems:'center'}}>
                <Card containerStyle={{height: '72%', alignItems: 'center', margin: 30}}>
                    <Card.Title>
                        <Text style={{fontSize: normalize(20)}}>Bhavesh Kumar</Text>
                    </Card.Title>
                    <Card.Image style={{height: 300}}>
                        <Image 
                            source={require('./images/developer.jpeg')}
                            style={{height: 300, width: 280}}
                        />
                    </Card.Image>
                    <View style={{padding: 20}}>
                        <Card.Title>
                            <Text style={{fontSize: normalize(18)}}>Full Stack Developer</Text>
                        </Card.Title>
                    </View>
                </Card>
                <Text style={{fontWeight: 'bold', fontSize: normalize(25), paddingTop: 20, paddingBottom: 10, height: '11%'}}>Let's Have a talk ! </Text>
                <View style={{flex: 1, flexDirection: 'row', height: '17%'}}>
                    <SocialIcon 
                        type='linkedin'
                        raised={true}
                        onPress={()=> Linking.openURL('https://www.linkedin.com/in/bhavesh-kumar-9ab7061b1')}
                        
                    />
                    <SocialIcon 
                        type='instagram'
                        raised={true}
                        onPress={()=> Linking.openURL('https://www.instagram.com/_bhavesh__kumar/')}
                        style={{backgroundColor: '#fb3958'}}
                        
                    />
                    <SocialIcon 
                        type='github'
                        raised={true}
                        onPress={()=> Linking.openURL('https://github.com/bhaveshkumarpassi')}
                        
                    />
                    <Icon
                        raised
                        reverse
                        name={'envelope-square'}
                        type='font-awesome-5'
                        color='#512DA8'
                        
                    />
                </View>
                </View>
            </ScrollView>
        );
    }
}

export default MeetDeveloper;