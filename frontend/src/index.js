import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
    // uri: 'https://flyby-router-demo.herokuapp.com/',
    // uri: 'http://localhost:5000/',
    uri: 'http://localhost:3000/graphql',
    // uri: 'http://localhost:5000/',
    cache: new InMemoryCache(),
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);

