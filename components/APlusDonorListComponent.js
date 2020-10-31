import { Icon } from 'native-base';
import React, {Component} from 'react';
import { View, Image, ImageBackground, Text, StyleSheet, FlatList, ScrollView, SafeAreaView} from 'react-native';
import {ListItem, Card, Avatar, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {fetchUsers} from '../redux/ActionCreators';
import {Loading} from './LoadingComponent';
import PTRView from 'react-native-pull-to-refresh';


const mapStateToProps = (state) => {

    return{
      users: state.users
    }
};

class APlusDonorList extends Component {

    constructor(props) {
        super(props);
        
    }

    render() {

        const availability = ({willing}) => {
            return ((!willing) ? 'Available': 'Un-Available');
        }
        const renderListItem = ({ item , index}) => (
                <ListItem
                    bottomDivider
                    topDivider
                    key={index}
                    containerStyle={{backgroundColor: '#200019'}}
                    pad = {30}
                    onPress= {() => this.props.navigation.navigate('User Details')}
                >   
                    <Avatar rounded size={'medium'} source={{uri: item.imageUrl}} icon={{name: 'user', type: 'font-awesome'}}/>
                    <ListItem.Content>
                        <ListItem.Title style={{fontWeight: 'bold', color: 'white'}}>{item.firstname + ' ' + item.lastname}</ListItem.Title>
                        <ListItem.Subtitle style={{color: 'white'}}>{availability(item.willing)}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron/>
                </ListItem>
            );
        
        if(this.props.users.isLoading) {

            return(
                <Loading />
            );
        }
        else if(this.props.users.errMess) {

            return(
                <View>            
                    <Text>{props.dishes.errMess}</Text>
                </View>            
            );
        }
        return (
            <SafeAreaView>
                    <FlatList
                        data={this.props.users.users.filter((user) => user.bloodgroup === 'A+')}
                        renderItem={renderListItem}
                        keyExtractor={item => item._id.toString()}
                        />
            </SafeAreaView>

        );
    }
}

export default connect(mapStateToProps)(APlusDonorList);