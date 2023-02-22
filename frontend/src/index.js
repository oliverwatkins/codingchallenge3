import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
    // uri: 'https://flyby-router-demo.herokuapp.com/',
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
});

client
    .query({
        query: gql`
      query GetLocations {
        locations {
          id
          name
          description
          photo
        }
      }
    `,
    })
    .then((result) => console.log(result));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);

