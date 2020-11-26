import * as ActionTypes from './ActionTypes';
import { auth, firestore, fireauth, firebasestore , storage} from '../firebase/firebase';
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions, Modal, TouchableHighlight, ActivityIndicator} from 'react-native';
import uuid from 'uuid-random';

export const fetchUsers = () => (dispatch) => {
    dispatch(usersLoading(true));

    return firestore.collection('users').get()
        .then(snapshot => {
            let users = [];
            snapshot.forEach(doc => {
                const data = doc.data()
                const _id = doc.id
                users.push({_id, ...data });
            });
            return users;
        })
        .then(users => dispatch(addUsers(users)))
        .catch(error => dispatch(usersFailed(error.message)));
}

export const usersLoading = () => ({
    type: ActionTypes.USERS_LOADING
});

export const usersFailed = (errmess) => ({
    type: ActionTypes.USERS_FAILED,
    payload: errmess
});

export const addUsers = (users) => ({
    type: ActionTypes.ADD_USERS,
    payload: users
});

export const addUser = (user, creds) => (dispatch) => {

    if (!user) {
        console.log('No user logged in!');
        return;
    }

if(creds.blob) {
var image = creds.blob;

    // Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = storage.ref().child('usersProfilePic/' + user.uid.toString()).put(image);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed', // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused': // or 'paused'
        console.log('Upload is paused');
        break;
      case 'running': // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {
    Alert.alert(error.message);
}, function() {
  // Upload completed successfully, now we can get the download URL
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

      user.updateProfile({
        displayName: creds.firstname,
        photoURL: downloadURL.toString()
      }).then(function() {
        
        firestore.collection('users').add({
          uid: user.uid, 
          points: 0,
          firstname: creds.firstname,
          lastname: creds.lastname,
          gender: creds.gender,
          bloodgroup: creds.bloodgroup,
          contactnumber: creds.contactnumber,
          locality: creds.locality,
          city: creds.city,
          state: creds.state,
          country: creds.country,
          disease: creds.disease,
          willing: creds.willing,
          imageUrl: user.photoURL,
          email: creds.email,
          password: creds.password,
          histories: [],
          age: creds.age,
          createdAt: firebasestore.FieldValue.serverTimestamp(),
          updatedAt: firebasestore.FieldValue.serverTimestamp()
      })
      .then(() => {
          dispatch(fetchUsers());
      })
      .catch(error => { console.log('added user', error.message);
          alert(null,error.message); })
      }).catch(function(error) {
        // An error happened.
      });
    console.log('File available at', downloadURL);
  });
});
}
else {
    user.updateProfile({
        displayName: creds.firstname
      }).then(function() {
        
        firestore.collection('users').add({
          uid: user.uid,
          points: 0,
          firstname: creds.firstname,
          lastname: creds.lastname,
          gender: creds.gender,
          bloodgroup: creds.bloodgroup,
          contactnumber: creds.contactnumber,
          locality: creds.locality,
          city: creds.city,
          state: creds.state,
          country: creds.country,
          disease: creds.disease,
          willing: creds.willing,
          imageUrl: creds.imageUrl,
          email: creds.email,
          histories: [],
          age: creds.age,
          password: creds.password,
          createdAt: firebasestore.FieldValue.serverTimestamp(),
          updatedAt: firebasestore.FieldValue.serverTimestamp()
      })
      .then(() => {
          dispatch(fetchUsers());
      })
      .catch(error => { console.log('added user', error.message);
          alert(null,error.message); })
      }).catch(function(error) {
        // An error happened.
      });
}

}

export const registerUser = (creds, navigation) => (dispatch) => {

            auth.createUserWithEmailAndPassword(creds.email, creds.password)
            .then(() => {
                var user = auth.currentUser;
                //this.props.addUser(user, creds);
                //addProfilePic(user, creds);
                dispatch(addUser(user, creds));
                
                Alert.alert(
                    'You are Succesfully registered!!',
                    'Now you can head over to Home Screen and restart the application.'
                );
                navigation.navigate('Home');
            })
            .catch((error) => {
                Alert.alert('Registeration Unsucessful!!', error.message);
            });
}

export const loginRequest = () => {
    return {
        type: ActionTypes.LOGIN_REQUEST
    }
};

export const loginSuccess = (user) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        user
    }
};

export const loginFailure = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
};

export const loginUser = (email, password, navigation) => (dispatch) => {

    dispatch(loginRequest());

    return auth.signInWithEmailAndPassword(email, password)
    .then(() => {
        
        var user = auth.currentUser;
        dispatch(loginSuccess(user));
        navigation.navigate('Home');
    })
    .catch((error) => {
        Alert.alert('Login UnSuccessful!!', error.message);
        dispatch(loginFailure(error.message));
    });
}

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const logoutSuccess = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

export const logoutFailure = (message) => {
    return {
        type: ActionTypes.LOGOUT_FAILURE,
        message
    }
}

// Logs the user out
export const logoutUser = (navigation) => (dispatch) => {
    dispatch(requestLogout());

      return auth.signOut().then(() => {
        dispatch(logoutSuccess());
        navigation.navigate('Home');
      }).catch((error) => {
        Alert.alert('Logout Unsuccessful!!', error.message);
        dispatch(logoutFailure(error.message));
      });

}

export const updateRequest = () => {
    return {
        type: ActionTypes.UPDATE_PROFILE_REQUEST
    }
};

export const updateSuccess = (user) => {
    return {
        type: ActionTypes.UPDATE_PROFILE_SUCCESS,
        user
    }
};

export const updateFailure = (message) => {
    return {
        type: ActionTypes.UPDATE_PROFILE_FAILURE,
        message
    }
};

export const profileUpdate = (newCreds, docId, User, navigation) => (dispatch) => {

    dispatch(updateRequest());

    var user = auth.currentUser;
    if (!user) {
        console.log('No user logged in!');
        return;
    }

    if(newCreds.blob) {
    var image = newCreds.blob;

    var deletePrev = storage.ref().child('usersProfilePic/' + user.uid.toString());

    deletePrev.delete()
    .then(() => {
        console.log('old profile pic deleted.');
    })
    .catch((error) => {
        console.log('deletion failed');
    });
        // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storage.ref().child('usersProfilePic/' + user.uid.toString()).put(image);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed', // or 'state_changed'
    function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
        case 'paused': // or 'paused'
            console.log('Upload is paused');
            break;
        case 'running': // or 'running'
            console.log('Upload is running');
            break;
        }
    }, function(error) {
        Alert.alert(error.message);
    }, function() {
    // Upload completed successfully, now we can get the download URL
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

        user.updateProfile({
            displayName: newCreds.firstname,
            photoURL: downloadURL.toString()
        }).then(function() {
            var update = {};

            update.imageUrl = downloadURL.toString();
            
            if(User.firstname.toString() !== newCreds.firstname.toString())
                update.firstname = newCreds.firstname.toString();
            
            if(User.lastname.toString() !== newCreds.lastname.toString())
                update.lastname = newCreds.lastname.toString();

            if(User.age.toString() !== newCreds.age.toString())
                update.age = newCreds.age.toString();
        
            if(User.contactnumber.toString() !== newCreds.contactnumber.toString())
                update.contactnumber = newCreds.contactnumber.toString();
        
            if(User.firstname.toString() !== newCreds.firstname.toString())
            update.firstname = newCreds.firstname.toString();
        
            if(User.locality.toString() !== newCreds.locality.toString())
                update.locality = newCreds.locality.toString();
        
            if(User.city.toString() !== newCreds.city.toString())
                update.city = newCreds.city.toString();
        
            if(User.state.toString() !== newCreds.state.toString())
                update.state = newCreds.state.toString();
        
            if(User.country.toString() !== newCreds.country.toString())
                update.country = newCreds.country.toString();
            
            if(User.disease.toString() !== newCreds.disease.toString())
                update.disease = newCreds.disease.toString();
        
            if(User.willing !== newCreds.willing)
                update.willing = newCreds.willing;
        
            return firestore.collection('users').doc(docId.toString())
            .update(update)
            .then(() => {
                var user = auth.currentUser;
                dispatch(updateSuccess(user));
                Alert.alert('Account Update Successful!!', 'Your account has been updated as per the new changes. You can now restart your application')
                navigation.navigate('Home');
            })
            .catch( (error) => {
                Alert.alert('Account Update Unsuccessful!!', error.message);
                disease(updateFailure(error.message));
            });
        }) 
        .catch(function(error) {
            // An error happened.
        });
        console.log('File available at', downloadURL);
    });
    });
    }
    else {
        user.updateProfile({
            displayName: newCreds.firstname
        }).then(function() {
            var update = {};
            
            if(User.firstname.toString() !== newCreds.firstname.toString())
                update.firstname = newCreds.firstname.toString();
            
            if(User.lastname.toString() !== newCreds.lastname.toString())
                update.lastname = newCreds.lastname.toString();

            if(User.age.toString() !== newCreds.age.toString())
                update.age = newCreds.age.toString();
        
            if(User.contactnumber.toString() !== newCreds.contactnumber.toString())
                update.contactnumber = newCreds.contactnumber.toString();
        
            if(User.firstname.toString() !== newCreds.firstname.toString())
            update.firstname = newCreds.firstname.toString();
        
            if(User.locality.toString() !== newCreds.locality.toString())
                update.locality = newCreds.locality.toString();
        
            if(User.city.toString() !== newCreds.city.toString())
                update.city = newCreds.city.toString();
        
            if(User.state.toString() !== newCreds.state.toString())
                update.state = newCreds.state.toString();
        
            if(User.country.toString() !== newCreds.country.toString())
                update.country = newCreds.country.toString();
            
            if(User.disease.toString() !== newCreds.disease.toString())
                update.disease = newCreds.disease.toString();
        
            if(User.willing !== newCreds.willing)
                update.willing = newCreds.willing;
        
            return firestore.collection('users').doc(docId.toString())
            .update(update)
            .then(() => {
                var user = auth.currentUser;
                dispatch(updateSuccess(user));
                Alert.alert('Account Update Successful!!', 'Your account has been updated as per the new changes.')
                navigation.navigate('Home');
            })
            .catch( (error) => {
                Alert.alert('Account Update Unsuccessful!!', error.message);
                dispatch(updateFailure(error.message));
            });
            
        }).catch(function(error) {
            // An error happened.
        });
    }

}

export const addHistory = (docId, data) => (dispatch) => {

    if(!auth.currentUser) {
        return;
    }

    var history = {};
    history.address = data.address;
    history.date = data.date;
    history.time = data.time;
    history.dateTime = data.dateTime;
    history.name = data.name;
    history.contact = data.contact;
    history.dateTimeNow = Date.now();
    return firestore.collection('users').doc(docId)
    .update({
        histories: firebasestore.FieldValue.arrayUnion(history),
        points: firebasestore.FieldValue.increment(5)
    }).catch(er => console.log(er.message));
}

export const removeHistory = (docId, history) => (dispatch) => {

    if(!auth.currentUser) {
        return;
    }

    return firestore.collection('users').doc(docId)
    .update({
        histories: firebasestore.FieldValue.arrayRemove(history),
        points: firebasestore.FieldValue.increment(-5)
    }).catch(er => console.log(er.message));
}

export const deleteCampRequest = (docId) => (dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }

    var user = auth.currentUser;

    return firestore.collection('campRequests').doc(docId).delete()
    .then(() => {
        dispatch(fetchCampRequests());
        Alert.alert('Removal Successful!!', 'Camp Request Successfuly removed.');
    })
    .catch((error) => {
        Alert.alert("Deletion Unsuccessful!!", error.message);
    })
};

export const addCampRequest = (campRequest) => ({
    type: ActionTypes.ADD_CAMP_REQUEST,
    payload: campRequest
});

export const postCampRequest = (campRequest) => (dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }

    return firestore.collection('campRequests').add({
        author: {
            '_id': auth.currentUser.uid,
            'firstname' : auth.currentUser.displayName ? auth.currentUser.displayName : auth.currentUser.email
        },
        organisation: campRequest.organisation,
        association: campRequest.association,
        associationAddress: campRequest.associationAddress,
        venueLocality: campRequest.venueLocality,
        venueCity: campRequest.venueCity,
        venueState: campRequest.venueState,
        venueCountry: campRequest.venueCountry,
        designation: campRequest.designation,
        contactnumber: campRequest.contactnumber,
        dateTime: campRequest.dateTime,
        date: campRequest.date,
        time: campRequest.time,
        duration: campRequest.duration,
        dateTimeNow: Date.now(),
        dateString: campRequest.dateString,
        fullName: campRequest.fullName,
        createdAt: firebasestore.FieldValue.serverTimestamp(),
        updatedAt: firebasestore.FieldValue.serverTimestamp()
    })
    .then(docRef => {

        firestore.collection('users').get()
        .then(snapshot => {

            var users = [];
            snapshot.forEach(doc => {
                const data = doc.data()
                const _id = doc.id
                users.push({_id, ...data });
            });
            return users;
        })
        .then(async (users) => {

            for(var i=0;i<users.length;i++) {
                await firestore.collection('campRequests').doc(docRef.id).collection('responses')
                .doc(users[i].uid.toString()).set({
                    viewed: false,
                    accepted: false
                })
                .then(() => (console.log('added')))
                .catch((error) => (console.log(error.message)));
            }

            return docRef;
        })
        .then((docRef) => {
                    firestore.collection('campRequests').doc(docRef.id).get()
                    .then(doc => {
                        if (doc.exists) {
                            const data = doc.data();
                            const _id = doc.id;
                            let campRequest = {_id, ...data};
                            firestore.collection('campRequests').doc(_id).collection('responses').get()
                            .then(snapshot => {

                                var responses = [];
                                snapshot.forEach(doc => {
                                    const data = doc.data()
                                    const _id = doc.id
                                    responses.push({_id, ...data });
                                });
                                return responses;
                            })
                            .then((responses) => campRequest.responses = responses)
                            .catch((err) => console.log(err.message));

                            return campRequest;
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                        }
                    })
                    .then((campRequest) => {
                        dispatch(addCampRequest(campRequest));
                    })
                    .catch((err) => console.log(err.message));
            })
            .catch(error => { console.log('Post campRequests ', error.message);
                Alert.alert('CampRequest Post Unsuccessful!!',error.message); })
        })
        .catch((err) => console.log(err.message));

}

export const fetchCampRequests = () => (dispatch) => {

    dispatch(campRequestsLoading(true));
    return firestore.collection('campRequests').get()
        .then(snapshot => {
            let campRequests = [];
            snapshot.forEach(doc => {
                const data = doc.data()
                const _id = doc.id

                firestore.collection('campRequests').doc(_id).collection('responses').get()
                .then(snapshot => {

                    var responses = [];
                    snapshot.forEach(doc => {
                        const data = doc.data()
                        const _id = doc.id
                        responses.push({_id, ...data });
                    });
                    return responses;
                })
                .then((responses) => campRequests.push({_id,responses, ...data }))
                .catch((err) => console.log(err.message));
            });
            return campRequests;
        })
        .then(campRequests => dispatch(addCampRequests(campRequests)))
        .catch(error => dispatch(campRequestsFailed(error.message)));
}

export const campRequestsFailed = (errmess) => ({
    type: ActionTypes.CAMP_REQUESTS_FAILED,
    payload: errmess
});

export const addCampRequests = (campRequests) => ({
    type: ActionTypes.ADD_CAMP_REQUESTS,
    payload: campRequests
});

export const campRequestsLoading = () => ({
    type: ActionTypes.CAMP_REQUESTS_LOADING,
});

export const addPost = (post) => ({
    type: ActionTypes.ADD_POST,
    payload: post
});

export const postPost =  (post)  =>  (dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }

    if(post.blob) {
        var image = post.blob;
        
            // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = storage.ref().child('usersPosts/' + uuid()).put(image);
        
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed', // or 'state_changed'
          function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused': // or 'paused'
                console.log('Upload is paused');
                break;
              case 'running': // or 'running'
                console.log('Upload is running');
                break;
            }
          }, function(error) {
            Alert.alert(error.message);
        }, function() {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        
                //var id = Date.now();
                return firestore.collection('posts').add({

                author: {
                    '_id': auth.currentUser.uid,
                    'firstname' : auth.currentUser.displayName ? auth.currentUser.displayName : auth.currentUser.email
                },
                caption: post.caption,
                imageUrl: downloadURL.toString(),
                createdAt: firebasestore.FieldValue.serverTimestamp(),
                updatedAt: firebasestore.FieldValue.serverTimestamp(),
                dateTime: Date.now()
              })
              .then((docRef) => {
                firestore.collection('posts').doc(docRef.id).get()
                    .then(doc => {
                        if (doc.exists) {
                            const data = doc.data();
                            const _id = doc.id;
                            let post = {_id, ...data};
                            dispatch(addPost(post))
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                        }
                    });
            })
            .catch(error => { console.log('Post posts ', error.message);
                Alert.alert(null, 'Your post could not be posted\nError: '+ error.message); })
              
        });
    });
    }
    else {
        return;
    }
}

export const postRemove = (postId) => (dispatch) => {

    firestore.collection('posts').doc(postId).delete()
    .then(() => dispatch(deletePost(postId)))
    .catch((er) => Alert.alert(null, err.message));
} 

export const fetchPosts = () => (dispatch) => {

    dispatch(postsLoading(true));

    return firestore.collection('posts').get()
        .then(snapshot => {
            let posts = [];
            snapshot.forEach(doc => {
                const data = doc.data()
                const _id = doc.id
                posts.push({_id, ...data });
            });
            return posts;
        })
        .then(posts => dispatch(addPosts(posts)))
        .catch(error => dispatch(postsFailed(error.message)));
}

export const postsLoading = () => ({
    type: ActionTypes.POSTS_LOADING
});

export const postsFailed = (errmess) => ({
    type: ActionTypes.POSTS_FAILED,
    payload: errmess
});

export const addPosts = (posts) => ({
    type: ActionTypes.ADD_POSTS,
    payload: posts
});

export const deletePost = (postId) => ({
    type: ActionTypes.DELETE_POST,
    payload: postId
})

export const fetchLikes = () => (dispatch) => {

    return firestore.collection('likes').get()
        .then(snapshot => {
            let likes = [];
            snapshot.forEach(doc => {
                const data = doc.data()
                const _id = doc.id
                likes.push({_id, ...data });
            });
            return likes;
        })
        .then(likes => dispatch(addLikes(likes)))
        .catch(error => dispatch(likesFailed(error.message)));
}

export const likesFailed = (errmess) => ({
    type: ActionTypes.LIKES_FAILED,
    payload: errmess
});

export const addLikes = (likes) => ({
    type: ActionTypes.ADD_LIKES,
    payload: likes
});

export const likePost = (postId) => (dispatch) => {

    var user = auth.currentUser;

    if(!user)
        return;

    return firestore.collection('likes').add({

        postId: postId,
        userId: user.uid,
        createdAt: firebasestore.FieldValue.serverTimestamp(),
        updatedAt: firebasestore.FieldValue.serverTimestamp()
      })
      .then(docRef => {
        firestore.collection('likes').doc(docRef.id).get()
            .then(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    const _id = doc.id;
                    let like = {_id, ...data};
                    dispatch(addLike(like))
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            });
    })
    .catch(error => { console.log('Post likes ', error.message);
        Alert.alert(null, 'Your like could not be added\nError: '+ error.message); })
}

export const addLike = (like) => ({
    type: ActionTypes.ADD_LIKE,
    payload: like
});

export const likeRemove = (likeId) => (dispatch) => {

    firestore.collection('likes').doc(likeId).delete()
    .then(() => dispatch(deleteLike(likeId)))
    .catch((er) => Alert.alert(null, err.message));
} 

export const deleteLike = (likeId) => ({
    type: ActionTypes.DELETE_LIKE,
    payload: likeId
})
  
export const fetchComments = () => (dispatch) => {

    return firestore.collection('comments').get()
        .then(snapshot => {
            let comments = [];
            snapshot.forEach(doc => {
                const data = doc.data()
                const _id = doc.id
                comments.push({_id, ...data });
            });
            return comments;
        })
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const commentPost = (postId, comment) => (dispatch) => {

    var user = auth.currentUser;

    if(!user)
        return;

    return firestore.collection('comments').add({

        author: {
            '_id': user.uid,
            'firstname' : user.displayName ? user.displayName : user.email
        },
        postId: postId,
        comment: comment,
        dateTime: Date.now(),
        createdAt: firebasestore.FieldValue.serverTimestamp(),
        updatedAt: firebasestore.FieldValue.serverTimestamp()
      })  
      .then(docRef => {
        firestore.collection('comments').doc(docRef.id).get()
            .then(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    const _id = doc.id;
                    let comment = {_id, ...data};
                    dispatch(addComment(comment))
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            });
    })
    .catch(error => { console.log('Post likes ', error.message);
        Alert.alert(null, 'Your like could not be added\nError: '+ error.message); })
}

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const commentRemove = (commentId) => (dispatch) => {

    firestore.collection('comments').doc(commentId).delete()
    .then(() => dispatch(deleteComment(commentId)))
    .catch((er) => Alert.alert(null, err.message));
} 

export const deleteComment = (commentId) => ({
    type: ActionTypes.DELETE_COMMENT,
    payload: commentId
})

export const deleteBloodRequest = (docId) => (dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }

    return firestore.collection('bloodRequests').doc(docId).delete()
    .then(() => {
        dispatch(fetchBloodRequests());
        Alert.alert('Removal Successful!!', 'Blood Request Successfuly removed.');
    })
    .catch((error) => {
        Alert.alert("Deletion Unsuccessful!!", error.message);
    })
};

export const addBloodRequest = (bloodRequest) => ({
    type: ActionTypes.ADD_BLOOD_REQUEST,
    payload: bloodRequest
});

export const postBloodRequest = (bloodRequest) => (dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }

    return firestore.collection('bloodRequests').add({
        author: {
            '_id': auth.currentUser.uid,
            'firstname' : auth.currentUser.displayName ? auth.currentUser.displayName : auth.currentUser.email
        },
        
        name: bloodRequest.name,
        age: bloodRequest.age,
        bloodgroup: bloodRequest.bloodgroup,
        units: bloodRequest.units,
        contactholder: bloodRequest.contactholder,
        contactnumber: bloodRequest.contactnumber,
        dateTime: bloodRequest.dateTime,
        date: bloodRequest.date,
        time: bloodRequest.time,
        dateTimeNow: Date.now(),
        locality: bloodRequest.locality,
        city: bloodRequest.city,
        state: bloodRequest.state,
        country: bloodRequest.country,
        info: bloodRequest.info,
        createdAt: firebasestore.FieldValue.serverTimestamp(),
        updatedAt: firebasestore.FieldValue.serverTimestamp()
    })
    .then(docRef => {

        firestore.collection('users').get()
        .then(snapshot => {

            var users = [];
            snapshot.forEach(doc => {
                const data = doc.data()
                const _id = doc.id
                users.push({_id, ...data });
            });
            return users;
        })
        .then(async (users) => {

            for(var i=0;i<users.length;i++) {
                await firestore.collection('bloodRequests').doc(docRef.id).collection('responses')
                .doc(users[i].uid.toString()).set({
                    viewed: false,
                    accepted: false
                })
                .then(() => (console.log('added')))
                .catch((error) => (console.log(error.message)));
            }

            return docRef;
        })
        .then((docRef) => {
                    firestore.collection('bloodRequests').doc(docRef.id).get()
                    .then(doc => {
                        if (doc.exists) {
                            const data = doc.data();
                            const _id = doc.id;
                            let bloodRequest = {_id, ...data};
                            firestore.collection('bloodRequests').doc(_id).collection('responses').get()
                            .then(snapshot => {

                                var responses = [];
                                snapshot.forEach(doc => {
                                    const data = doc.data()
                                    const _id = doc.id
                                    responses.push({_id, ...data });
                                });
                                return responses;
                            })
                            .then((responses) => bloodRequest.responses = responses)
                            .catch((err) => console.log(err.message));

                            return bloodRequest;
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                        }
                    })
                    .then((bloodRequest) => {
                        dispatch(addBloodRequest(bloodRequest));
                    })
                    .catch((err) => console.log(err.message));
            })
            .catch(error => { console.log('Post bloodRequests ', error.message);
                Alert.alert('Blood-Request Post Unsuccessful!!',error.message); })
        })
        .catch((err) => console.log(err.message));

}

export const fetchBloodRequests = () => (dispatch) => {

    dispatch(bloodRequestsLoading(true));
    return firestore.collection('bloodRequests').get()
        .then(snapshot => {
            let bloodRequests = [];
            snapshot.forEach(doc => {
                const data = doc.data()
                const _id = doc.id

                firestore.collection('bloodRequests').doc(_id).collection('responses').get()
                .then(snapshot => {

                    var responses = [];
                    snapshot.forEach(doc => {
                        const data = doc.data()
                        const _id = doc.id
                        responses.push({_id, ...data });
                    });
                    return responses;
                })
                .then((responses) => bloodRequests.push({_id,responses, ...data }))
                .catch((err) => console.log(err.message));
            });
            return bloodRequests;
        })
        .then(bloodRequests => dispatch(addBloodRequests(bloodRequests)))
        .catch(error => dispatch(bloodRequestsFailed(error.message)));
}

export const bloodRequestsFailed = (errmess) => ({
    type: ActionTypes.BLOOD_REQUESTS_FAILED,
    payload: errmess
});

export const addBloodRequests = (bloodRequests) => ({
    type: ActionTypes.ADD_BLOOD_REQUESTS,
    payload: bloodRequests
});

export const bloodRequestsLoading = () => ({
    type: ActionTypes.BLOOD_REQUESTS_LOADING,
});

