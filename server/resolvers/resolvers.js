// Connect to firebase database, which we created in step 3
const { db } = require("../database/database"); 

// Here Firebase returns an object and GraphQL is expecting an array, so we need to extract the values.

const resolvers = {
    Query: {
        userAccounts: async () => {
            const userAccounts = await db.collection('userAccounts').get()
            return userAccounts.docs.map(userAccount => userAccount.data())
        },
        userAccount: async (_,args) => {
            const userAccount = await db.collection('userAccounts').doc(args.id).get();
            return userAccount.data()
        }
    }
  };

 module.exports = resolvers;