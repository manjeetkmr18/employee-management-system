const express = require("express")
const { ApolloServer } = require('apollo-server-express');
require('./src/models/db')
const Employee = require('./src/models/employee')
const typeDefs = require('./src/graphql/typeDefs')
const resolvers = require('./src/graphql/resolver')
const app = express()

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.start()
    .then(function () {
        server.applyMiddleware({ app, path: '/graphql', cors: true })
    })

app.use(express.json());

app.listen('4000', function () {
    console.log("Webserver running...")
})
