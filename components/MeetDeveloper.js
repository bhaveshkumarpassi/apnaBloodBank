import React, {Component} from 'react';
import { View, Image, ImageBackground, Text, StyleSheet, Linking} from 'react-native';
import { Card, Icon, SocialIcon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';


class MeetDeveloper extends Component {

    render() {
        return (
    
            <View style={{backgroundColor: '#f0fff3', flex: 1, flexDirection: 'column', alignItems:'center'}}>
                <Card containerStyle={{height: 450, alignItems: 'center', margin: 30}}>
                    <Card.Title>
                        <Text>Bhavesh Kumar</Text>
                    </Card.Title>
                    <Card.Image style={{height: 300}}>
                        <Image 
                            source={require('./images/developer.jpeg')}
                            style={{height: 300, width: 280}}
                        />
                    </Card.Image>
                    <View style={{paddingTop: 30}}>
                    <Card.Title>
                        <Text>Full Stack Developer</Text>
                    </Card.Title>
                    </View>
                </Card>
                <Text style={{fontWeight: 'bold', fontSize: 25, paddingTop: 20, paddingBottom: 10}}>Let's Have a talk ! </Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
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
        );
    }
}

export default MeetDeveloper;