const functions = require('firebase-functions');
var fetch = require('node-fetch');

const admin = require('firebase-admin');
const { event } = require('firebase-functions/lib/providers/analytics');
admin.initializeApp(functions.config().firebase);

exports.sendPushNotification = functions.firestore.document('users/{id}')
.onCreate( (snap, context) => {

    var newValue = snap.data();
    var messages = [];
    var expoToken = newValue.expoToken.data;

    if(expoToken) {

        messages.push({
            "to": expoToken,
            "message": "new user created"
        })
    }

    fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        header: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(messages)
    })
})
