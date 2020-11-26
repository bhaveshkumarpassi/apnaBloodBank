import React, {Component} from 'react';
import { View, ScrollView, Alert, Dimensions} from 'react-native';
import { Button, Image, Input, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {postPost} from '../redux/ActionCreators';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

var width = Dimensions.get('window').width;
var heigth = Math.floor(Dimensions.get('window').height/3);

const mapStateToProps = (state) => {
    
    return {
        posts: state.posts
    };
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        postPost: (post) => dispatch(postPost(post))
    };
  }  

class AddPost extends Component {

    constructor(props) {
        super(props);
        
        this.state={
            imageUrl: 'abc.png',
            blob: null,
            caption: ''
        }
    }

    handleSubmit = (post) => {

        if(post.blob && post.caption) {
        
        this.props.postPost(post);
        this.props.navigation.navigate('Share with Network');
        }
        else {
            Alert.alert(null, 'A post should contain an image and a caption .')
        }
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                
                aspect: [width, heigth],
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                var image = await fetch(capturedImage.uri);
                var Blob = await image.blob();

                this.setState({
                    imageUrl: capturedImage.uri,
                    blob: Blob
                });
            }
        }

    }

    getImageFromGallery = async () => {
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if(cameraRollPermission.status === 'granted') {
            let selectedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [width, heigth]
            })
            if(!selectedImage.cancelled) {
                console.log(selectedImage);
                var image = await fetch(selectedImage.uri);
                var Blob = await image.blob();

                this.setState({
                    imageUrl: selectedImage.uri,
                    blob: Blob
                });
            }
        }
    }

    render() {

        return (
            <ScrollView style={{flex: 1}}>
                <View style={{alignItems: 'center'}}>
                    <Image 
                        style={{height: heigth, width: width, marginTop: '10%'}}
                        source={{ uri: this.state.imageUrl}}
                        
                    />
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: '10%', paddingBottom: '0%'}}>
                    <View style={{width: '45%', height: 100, paddingRight: '2%'}}>
                        <Button
                            title="Camera"
                            onPress={this.getImageFromCamera}
                            buttonStyle={{backgroundColor: '#008891', borderRadius: 28}}
                            titleStyle={{color: "white", fontWeight: "bold", paddingHorizontal: '5%'}}
                            raised
                        />
                    </View>
                    <View style={{width: '45%', height: 100, paddingLeft: '2%'}}>
                        <Button
                            title="Gallery"
                            onPress={this.getImageFromGallery}
                            buttonStyle={{backgroundColor: '#008891', borderRadius: 28}}
                            titleStyle={{color: "white", fontWeight: "bold", paddingHorizontal: '5%'}}
                            raised
                        />
                    </View>
                </View>
                <View style={{marginHorizontal: '5%'}}>
                    <Input
                        placeholder="Write a caption ...."
                        leftIcon={{ type: 'font-awesome', name: 'pencil'}}
                        leftIconContainerStyle={{marginRight: 10}}
                        onChangeText={(caption) => this.setState({caption})}
                        value={this.state.caption}
                        label='Caption: '
                        multiline
                    />
                </View>
                <View style={{marginHorizontal: '5%', marginVertical: '5%'}}>
                <Button
                        onPress = {() => this.handleSubmit(this.state)}
                        title=" Make Post"
                        titleStyle={{marginLeft: '5%'}}
                        icon={
                            <Icon
                                name='telegram-plane'
                                type='font-awesome-5'            
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: '#008891',
                            borderRadius: 28
                        }}
                        
                        raised
                        />
                </View>
            </ScrollView>
        );
    }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);