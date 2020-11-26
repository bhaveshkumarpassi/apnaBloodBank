import React, {Component} from 'react';
import { View, Image, ImageBackground, Text, FlatList, ScrollView, SafeAreaView, ActivityIndicator, Dimensions, Alert} from 'react-native';
import {ListItem, Card, Button, Icon, Input} from 'react-native-elements';
import {connect} from 'react-redux';
import {Loading} from './LoadingComponent';
import Modal from 'react-native-modal';
import { auth } from '../firebase/firebase';
import {normalize} from '../assets/fonts/DynamicFontSize';
import { postRemove } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
    
    return {
        posts: state.posts,
        likes: state.likes,
        comments: state.comments
    };
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        postRemove: (postId) => dispatch(postRemove(postId))
    };
  }  

  

class MyPosts extends Component {

    constructor(props) {
        super(props);
        
        this.state={
            isAuthenticated: false,
            isWriteModalVisible: false,
            comment: '',
            user: null,
            selectedPost: ''
        }
    }

    componentDidMount() {
        this.unsubscribe =  auth.onAuthStateChanged(user => {
    
            if(user) {
              this.setState({
                isAuthenticated: true,
                user: user
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

    toggleWriteModal(selected) {

        this.setState({
            isWriteModalVisible: !this.state.isWriteModalVisible,
            selectedPost: selected
        })
    }

    handleDelete(postId) {

        Alert.alert(
            'Delete Post',
            'are you sure you want to delete this post ?',
            [
                {text: 'cancel', style: 'cancel'},
                {text: 'Delete', onPress: () => this.props.postRemove(postId)}
            ],
            {cancelable: false}
        )
    }

    render() {

        if(this.state.isAuthenticated) {

            if(this.props.posts.isLoading) {
                return (
                    <Loading />
                );
            }
            else if(this.props.posts.errMess) {
                return (
                    <Text>{this.state.errMess}</Text>
                )
            }
            else {

                const renderListItem = ({ item , index}) => {

                    var width = Dimensions.get('window').width;
                    var heigth = Math.floor(Dimensions.get('window').height/3);
                    var itemLikes = this.props.likes.likes.filter(like => like.postId === item._id);
                    var ilike = itemLikes.filter(like => like.userId === this.state.user.uid)[0];
                    var itemComments = this.props.comments.comments.filter(comment => comment.postId === item._id);

                   return (
                    <ListItem
                        key={index}
                        
                    >   
                    <ListItem.Content>
                        <View style={{alignSelf: 'center'}}>
                        <Card >
                        <Text style={{textAlign: 'center', fontWeight: 'bold'}} 
                            onPress= {() => this.props.navigation.navigate('User Details', {userId: item.author._id})}>{item.author.firstname}</Text>
                        <Card.Image style={{height: heigth, width: width, marginTop: '3%'}}>
                            <Image 
                                source={{uri: item.imageUrl}}
                                style={{height: heigth, width: width}}
                                placeholder={<ActivityIndicator size="large" color="white" />}
                            />
                        </Card.Image>
                        <Text style={{margin: 10}}>
                            {item.caption}
                        </Text>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Icon
                                raised
                                reverse
                                name='commenting'
                                type='font-awesome'
                                color='#f50'
                                size={20}
                                onPress={() => this.props.navigation.navigate('Comments', {postId: item._id})}
                        />
                        <Icon
                            raised
                            reverse
                            name={'trash'}
                            type='font-awesome-5'
                            color='#158467'
                            size={20}
                            onPress={() => this.handleDelete(item._id)}
                        />      
                        </View>
                        <Text style={{marginHorizontal: 10}}>Likes : {itemLikes.length}</Text>
                        <Text style={{marginHorizontal: 10}}>Comments : {itemComments.length}</Text>
                        </Card>
                        </View>
                    </ListItem.Content>
                    </ListItem>
                    
                );
                }

            return (
                <View style={{flex: 1}} >
                <SafeAreaView style={{flex: 1}}>
                        <FlatList
                            data={this.props.posts.posts.filter((post) => post.author._id === this.state.user.uid).sort((a, b) => b.dateTime-a.dateTime)}
                            renderItem={renderListItem}
                            keyExtractor={item => item._id.toString()}
                            />
                        
                </SafeAreaView>
                <Modal 
                        isVisible={this.state.isWriteModalVisible}
                        onBackButtonPress={() => this.setState({
                            isWriteModalVisible: !this.state.isWriteModalVisible,
                            selectedPost: ''
                        })}
                    >
                    <View style={{marginHorizontal: '5%'}}>
                        <Input
                            placeholder="Write your comment ...."
                            inputStyle={{color: 'white'}}
                            value={this.state.comment}
                            onChangeText={(comment) => this.setState({comment})}
                            labelStyle={{color: 'white'}}
                            label='Add Comment: '
                            multiline
                        />
                    </View>
                    <View style={{marginHorizontal: '5%', marginVertical: '5%'}}>
                    <Button
                            onPress = {() => this.onCommentSubmission()}
                            title=" Submit"
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
                </Modal>
                </View>
            );
            }
        }
        else {
            return (

                <ScrollView style={{backgroundColor: '#f0fff3'}}>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                    <Text style={{color: "#440047",
                        fontSize: normalize(25),
                        fontWeight: "bold",
                        textAlign: 'center',
                        marginTop: 40,
                        flex: 1,
                        }}>Sorry !! You need to Login first...</Text>
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
                        raised
                        />
                    <Button
                        onPress={() => this.props.navigation.navigate('Home')}
                        title="Home"
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
                        raised
                        />
                    </ImageBackground>
                    
                    </View>
                </ScrollView>
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);