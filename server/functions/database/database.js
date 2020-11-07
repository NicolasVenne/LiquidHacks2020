const admin = require("firebase-admin");

// To generate a private key file for your service account:
// 1. In the Firebase console, open Settings > Service Accounts.
// 2. Click Generate New Private Key, then confirm by clicking Generate Key.
// 3. Store the JSON file in the `functions/resources/` directory

var serviceAccount = require("../resources/scrim-of-legends-firebase-adminsdk-4bf1b-cef96f1cb0.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

module.exports = admin;