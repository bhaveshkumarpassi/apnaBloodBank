import React, {Component} from 'react';
import { View, Text, FlatList, Alert} from 'react-native';
import { Icon, ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import { auth } from '../firebase/firebase';
import { commentRemove } from '../redux/ActionCreators';


const mapStateToProps = (state) => {

    return{
      comments: state.comments,
      users: state.users
    }
};

const mapDispatchToProps = (dispatch) => {

    return{
        commentRemove: (commId) => dispatch(commentRemove(commId))
    };
}

class Comments extends Component {

    constructor(props) {
        super(props);
    }

    handleDelete(commId) {

        Alert.alert(
            'Delete Comment',
            'Are you sure you want to delete this comment ?',
            [
                {text: 'cancel', style: 'cancel'},
                {text: 'Delete', onPress: () => this.props.commentRemove(commId)}
            ],
            {cancelable: false}
        )
    }

    render(){

        if(this.props.comments.errMess){
            return(
                <Text>{this.props.errMess}</Text>
            )
        }
        else if(this.props.comments.comments) {

            const RenderCommentsListItem = ({item, index}) => {

                
                return(
                <ListItem key={index}>
                     <ListItem.Content>
                        <Text style={{color: 'black', fontWeight: 'bold'}}>{item.comment}</Text>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={{marginTop: 5, marginBottom: 15, flex: 8, color:'#686d76'}}
                                onPress={() => this.props.navigation.navigate('User Details', {userId: item.author._id})}
                            >-- {item.author.firstname} , {new Date(Date.parse(item.createdAt.toDate())).toDateString()}, {new Date(Date.parse(item.createdAt.toDate())).toTimeString().slice(0,8)}</Text>
                                <Icon 
                                    name='trash'
                                    type='font-awesome-5'
                                    color='#fa4659'
                                    style={{flex: 2}}
                                    size={15}
                                    disabled={item.author._id === auth.currentUser.uid ? false : true}
                                    onPress={() => this.handleDelete(item._id)}
                                />
                        </View>
                     </ListItem.Content>
                 </ListItem>
                );
            }

            var post = this.props.route.params.postId;
            var data = this.props.comments.comments.filter(comment => comment.postId === post).sort((a, b) => b.datTime-a.datTime);

            return(
                    <FlatList
                        data={data}
                        renderItem={RenderCommentsListItem}
                        keyExtractor={(item) => item._id.toString()}
                        style={{backgroundColor: 'white'}}
                    />
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);