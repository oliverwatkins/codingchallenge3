import {ApolloServer} from 'apollo-server';

import typeDefs from './src/types/typeDefs.js'
import resolvers from './src/resolvers/resolvers.js'

import mongoose from 'mongoose'

const MONGO_DB = "mongodb+srv://owatkins3:trillion1@cluster0.7xdqmaq.mongodb.net/?retryWrites=true&w=majority"

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

mongoose.connect(MONGO_DB, {useNewUrlParser: true}).then(() => {
    console.log("...connecting to mongo")
    return server.listen({port: 5000});
}).then((res) => {
    console.log("connected to mongo")
    console.log(`🚀  Server ready `);
});

