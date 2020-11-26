import React, {Component} from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator, Dimensions, Linking} from 'react-native';
import {Card, normalize, Button, Icon, ListItem} from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';

const mapStateToProps = (state) => {

    return{
      users: state.users
    }
};

class UserDetail extends Component {

    constructor(props) {

        super(props);

        this.state = {
            isModalVisible: false
        }
    }

    render() {

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

        const userId = this.props.route.params.userId;
        let screenHeight = Dimensions.get('window').height;
        var User = this.props.users.users.filter(user => user.uid === userId)[0];
        var med = (User.disease) ? User.disease : 'Healthy';

        var info = User;
        const RenderListItem = ({item, index}) => {

                
            return(
            <ListItem 
                key={index}
                containerStyle={{backgroundColor: '#065446', borderRadius: 25, marginHorizontal: '3%', marginTop: '5%'}}
                pad = {20}
            >
                 <ListItem.Content>
                    <ListItem.Title style={{fontWeight: 'bold', color: '#ffffff'}}>Donation Date</ListItem.Title>
                    <ListItem.Subtitle style={{color: '#ffffff'}}>{item.dateTime.toString()}</ListItem.Subtitle>
                    <ListItem.Title style={{fontWeight: 'bold', color: '#ffffff', paddingTop: '4%'}}>Donation Place</ListItem.Title>
                    <ListItem.Subtitle style={{color: '#ffffff'}}>{item.address}</ListItem.Subtitle>
                    <ListItem.Title style={{fontWeight: 'bold', color: '#ffffff', paddingTop: '4%'}}>Donated to</ListItem.Title>
                    <ListItem.Subtitle style={{color: '#ffffff'}}>{item.name},  C-No. : {item.contact}</ListItem.Subtitle>
                 </ListItem.Content>
             </ListItem>
            );
        }

        return (
                <View style={styles.container}>
                    <View style={{flex: 1}}>
                    <ScrollView>
                        <View style={{ height: screenHeight-450, paddingVertical: 5}}>
                        <Image
                            source={{uri: User.imageUrl}}
                            style={{height: '100%', width: 250, alignSelf: 'center', borderRadius: 10}}
                            PlaceholderContent={<ActivityIndicator />}
                        />
                        </View>
                        <Card containerStyle={{ backgroundColor: '#197163', 
                            height: screenHeight-80, margin: 0, borderRadius: 60}}
                            >
                            <View style={{marginVertical: '8%'}}>
                            <Button
                                onPress = {() => this.setState({isModalVisible: !this.state.isModalVisible})}
                                title="  View Donation History"
                                icon={
                                    <Icon
                                        name='history'
                                        type='font-awesome-5'            
                                        size={24}
                                        color= '#52057b'
                                    />
                                }
                                buttonStyle={{
                                    backgroundColor: '#b0eacd',
                                    borderRadius: 30,                    
                                }}
                                titleStyle={{
                                    fontWeight: 'bold',
                                    color: 'black'
                                }}
                                raised
                                />
                            </View>
                            <View style={{marginVertical: '2%'}}>
                            <Button
                                onPress = {() => Linking.openURL('tel:'+User.contactnumber)}
                                title="  Call Now"
                                icon={
                                    <Icon
                                        name='phone'
                                        type='font-awesome-5'            
                                        size={24}
                                        color= '#52057b'
                                    />
                                }
                                buttonStyle={{
                                    backgroundColor: '#b0eacd',
                                    borderRadius: 30,                    
                                }}
                                titleStyle={{
                                    fontWeight: 'bold',
                                    color: 'black'
                                }}
                                raised
                                />
                            </View>
                            <View style={{flexDirection: 'column', flex: 1}}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{flex: 4}}>
                                <Text style={{color: 'white', fontSize: normalize(15), fontWeight: 'bold', marginTop: '10%'}}>Full Name : </Text>
                                </View>
                                <View style={{flex: 5}}>
                                <Text style={{color: 'white', fontSize: normalize(15), marginTop: '10%'}}>{User.firstname} {User.lastname}</Text>
                                </View>
                            </View>
                            <View style={{marginTop: '10%', flexDirection: 'row'}}>
                                <View style={{flex: 4}}>
                                <Text style={{color: 'white', fontSize: normalize(15), fontWeight: 'bold', marginTop: '10%'}}>Age : </Text>
                                </View>
                                <View style={{flex: 5}}>
                                <Text style={{color: 'white', fontSize: normalize(15), marginTop: '10%'}}>{User.age}</Text>
                                </View>
                            </View>
                            <View style={{marginTop: '10%', flexDirection: 'row'}}>
                                <View style={{flex: 4}}>
                                <Text style={{color: 'white', fontSize: normalize(15), fontWeight: 'bold', marginTop: '10%'}}>Gender : </Text>
                                </View>
                                <View style={{flex: 5}}>
                                <Text style={{color: 'white', fontSize: normalize(15), marginTop: '10%'}}>{User.gender}</Text>
                                </View>
                            </View>
                            <View style={{marginTop: '10%', flexDirection: 'row'}}>
                                <View style={{flex: 4}}>
                                <Text style={{color: 'white', fontSize: normalize(15), fontWeight: 'bold', marginTop: '10%'}}>Blood Group : </Text>
                                </View>
                                <View style={{flex: 5}}>
                                <Text style={{color: 'white', fontSize: normalize(15), marginTop: '10%'}}>{User.bloodgroup}</Text>
                                </View>
                            </View>
                            <View style={{marginTop: '10%', flexDirection: 'row'}}>
                                <View style={{flex: 4}}>
                                <Text style={{color: 'white', fontSize: normalize(15), fontWeight: 'bold', marginTop: '10%'}}>Address : </Text>
                                </View>
                                <View style={{flex: 5}}>
                                <Text style={{color: 'white', fontSize: normalize(15), marginTop: '10%'}}>{User.locality}, {User.city}, {User.state}, {User.country}</Text>
                                </View>
                            </View>
                            <View style={{marginTop: '25%', flexDirection: 'row'}}>
                                <View style={{flex: 4}}>
                                <Text style={{color: 'white', fontSize: normalize(15), fontWeight: 'bold', marginTop: '10%'}}>Medical Status : </Text>
                                </View>
                                <View style={{flex: 5}}>
                                <Text style={{color: 'white', fontSize: normalize(15), marginTop: '10%'}}>{med}</Text>
                                </View>
                            </View>
                            </View>

                        </Card>
                    </ScrollView>
                    </View>
                    <Modal isVisible={this.state.isModalVisible} 
                        style={{backgroundColor: '#b0eacd', borderRadius: 20}}
                        onBackButtonPress={() => this.setState({isModalVisible: !this.state.isModalVisible})}>
                        <Text style={{textAlign: 'center', marginVertical: '4%', fontWeight: 'bold', fontSize: normalize(15)}}>Donation History</Text>
                        <FlatList
                            data={(info && info.histories && info.histories.length) ? info.histories.sort((a, b) => b.dateTimeNow-a.dateTimeNow) : []}
                            renderItem={RenderListItem}
                            keyExtractor={(item) => item.dateTimeNow.toString()}
                            style={{marginBottom: '10%'}}
                        />
                    </Modal>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    }
  });

export default connect(mapStateToProps)(UserDetail);