import * as ActionTypes from './ActionTypes';
import { auth, firestore, fireauth, firebasestore , storage} from '../firebase/firebase';
import { Alert } from 'react-native';

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

if(creds.blob)
{var image = creds.blob;

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
    creds.imageUrl = downloadURL;

    user.updateProfile({
        displayName: creds.firstname,
        photoURL: downloadURL.toString()
      }).then(function() {
        // Update successful.
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
        // Update successful.
      }).catch(function(error) {
        // An error happened.
      });
}

    return firestore.collection('users').add({
        uid: user.uid,
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
        password: creds.password,
        createdAt: firebasestore.FieldValue.serverTimestamp(),
        updatedAt: firebasestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        dispatch(fetchUsers());
    })
    .catch(error => { console.log('Post comments ', error.message);
        alert(null,error.message); })
}

export const registerUser = (creds, navigation) => (dispatch) => {

            auth.createUserWithEmailAndPassword(creds.email, creds.password)
            .then(() => {
                var user = auth.currentUser;
                this.props.addUser(user, creds);
                
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