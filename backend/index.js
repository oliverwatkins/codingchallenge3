import { ApolloServer } from 'apollo-server';

import typeDefs from './typeDefs.js'
import resolvers from './resolvers.js'

// const mongoose = require('mongoose')
import mongoose from 'mongoose'

const MONGO_DB = "mongodb+srv://owatkins3:trillion1@cluster0.7xdqmaq.mongodb.net/?retryWrites=true&w=majority"


// import typeDefs from 'src/typeDefs'
// import resolvers from 'src/resolvers'
// const typeDefs = require('./src/typeDefs')
// const resolvers = require('./src/resolvers')



// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

mongoose.connect(MONGO_DB, {useNewUrlParser: true}).then(() => {
    console.log("here")
    return server.listen({port: 5000});
}).then((res) => {
    console.log("here2")

    });






console.log(`🚀  Server ready `);

