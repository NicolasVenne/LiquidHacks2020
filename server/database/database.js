const admin = require("firebase-admin");

// To generate a private key file for your service account:
// 1. In the Firebase console, open Settings > Service Accounts.
// 2. Click Generate New Private Key, then confirm by clicking Generate Key.
// 3. Store the JSON file in the `functions/resources/` directory

var serviceAccount = null;

if (process.env.NODE_ENV === 'production'){
    console.log("PRODUCTION!!!")
    serviceAccount = {
        "type": "service_account",
        "project_id": "scrim-of-legends",
        "private_key_id": process.env.private_key_id,
        "private_key": process.env.private_key.replace(/\\n/g, '\n'),
        "client_email": process.env.client_email,
        "client_id": process.env.client_id,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4bf1b%40scrim-of-legends.iam.gserviceaccount.com"
      }
} else {
    serviceAccount = require("../resources/scrim-of-legends-firebase-adminsdk-4bf1b-cff0a4ee65.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = {
  db: admin.firestore(),
  admin
}