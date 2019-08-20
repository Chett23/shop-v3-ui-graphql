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
import './index.css'
import * as serviceWorker from './serviceWorker';

let guest = false;

const httpLink = createHttpLink({
  uri: Dev
});

const authLink = setContext((_, {headers}) => {
  const {token} = JSON.parse(sessionStorage.getItem('userData'));
  console.log(token)
  if(token === 'GuestUser') { guest = true}

  console.log(guest)

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App  guest={guest} />
    </Router>
  </ApolloProvider>
  , document.getElementById('root'));

serviceWorker.unregister();