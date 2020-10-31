import React, {Component} from 'react';
import { View, Image, ImageBackground, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';


const mapStateToProps = (state) => {

    return{
      users: state.users
    }
};

class UserDetail extends Component {

    render() {
        return (
            <View>
                <Text>This is UserDetail component.</Text>
                
            </View>
        );
    }
}

export default connect(mapStateToProps)(UserDetail);