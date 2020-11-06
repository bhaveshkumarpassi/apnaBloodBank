import React, {Component} from 'react';
import { View, Image, Platform, Text, StyleSheet, ActivityIndicator, Dimensions, TouchableOpacity, Alert} from 'react-native';
import {Avatar, Card} from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

//const LOCATION_TASK_NAME = 'background-location-task';

/*TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      // Error occurred - check `error.message` for more details.
        console.log(error.message);
      return;
    }
    if (data) {
      const { locations } = data;
      // do something with the locations captured in the background
      console.log('locations', locations);
    }
  });*/

const mapStateToProps = (state) => {

    return{
      users: state.users
    }
};

class UserDetail extends Component {

    constructor(props) {

        super(props);
    }

    componentDidMount = async () => {
        /*await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 5000
          });*/
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
                            height: screenHeight+450, margin: 0, borderRadius: 60}}
                            >
                                <TouchableOpacity onPress={this.onPress}>
                                    <Text>Enable background location</Text>
                                </TouchableOpacity>
                        </Card>
                    </ScrollView>
                    </View>
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