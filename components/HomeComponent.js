import React, {Component} from 'react';
import { View, Image, ImageBackground, Text, StyleSheet} from 'react-native';

function Home(props) {

    return (
        <View style={styles.container}>
            <ImageBackground source={require('./images/homeBlood2.jpg')} style={styles.image}>
                <Text style={styles.text}>Welcome to apnaBloodBank App !!</Text>
            </ImageBackground>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
      opacity: 0.7
    },
    text: {
      color: "#440047",
      fontSize: 30,
      fontWeight: "bold",
      textAlign: 'center',
    }
  });

export default Home;

