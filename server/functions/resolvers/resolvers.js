// Connect to firebase database, which we created in step 3
const admin = require("../database/database"); 

// Here Firebase returns an object and GraphQL is expecting an array, so we need to extract the values.

const resolvers = {
    Query: {
        userAccounts: () =>
            admin
            .database()
            .ref("/userAccounts")
            .once("value")
            .then(snap => snap.val())
            .then(val => Object.keys(val).map(key => val[key])),
        
        // userAccount: (_,args) => {
        //     console.log(`ARGUMENT ID: ${args.id}`)
        //     admin
        //     .database()
        //     .ref(`/userAccounts`)
        //     .equalTo(args.id)
        //     .once("value")
        //     .then(snap => snap.val())
        //     .then(val => Object.keys(val).map(key => val[key]))
        // }
    }
  };

 module.exports = resolvers;