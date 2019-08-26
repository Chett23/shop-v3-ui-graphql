import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import {
  // Deployment, 
  Dev
} from './Data/ApiURL';
import App from './App';
import './index.scss'
import * as serviceWorker from './serviceWorker';



const httpLink = createHttpLink({
  uri: Dev
});

const authLink = setContext((_, { headers }) => {
  const user = JSON.parse(sessionStorage.getItem('userData'));
  return {
    headers: {
      ...headers,
      authorization: user ? `Bearer ${user.token}` : ""
    }
  }
})


export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
  , document.getElementById('root'));

serviceWorker.unregister();