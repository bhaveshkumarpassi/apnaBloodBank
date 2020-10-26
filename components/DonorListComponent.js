import React, {Component} from 'react';
import { View, Image, ImageBackground, Text, StyleSheet, FlatList, ScrollView, SafeAreaView} from 'react-native';
import {USERS} from '../shared/users';
import {ListItem, Card, Avatar, Button} from 'react-native-elements';


class DonorList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            donors: USERS
        }
    }
    render() {

        const renderListItem = ({ item , index}) => (
                <ListItem
                    bottomDivider
                    topDivider
                    key={index}
                    containerStyle={{backgroundColor: '#200019'}}
                    pad = {30}
                    onPress= {() => this.props.navigation.navigate('User Details')}
                >   
                    <Avatar rounded size={'medium'} source={require('./images/avatar2.png')} />
                    <ListItem.Content>
                        <ListItem.Title style={{fontWeight: 'bold', color: 'white'}}>{item.firstname + ' ' + item.lastname}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron/>
                </ListItem>
            );
        
        return (
            <SafeAreaView>
                    <FlatList
                        data={this.state.donors}
                        renderItem={renderListItem}
                        keyExtractor={item => item.id.toString()}
                        />
            </SafeAreaView>
        );
    }
}

export default DonorList;