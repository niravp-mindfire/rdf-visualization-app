import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Buffer } from 'buffer';
window.Buffer = Buffer;

// Create an Apollo Client
const client = new ApolloClient({
  uri: 'https://rdf-visualization-app.onrender.com/graphql', // Your GraphQL server endpoint
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}> {/* Wrap App with ApolloProvider */}
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
