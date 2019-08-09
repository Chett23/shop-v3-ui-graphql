import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import {
  // Deployment, 
  Dev
} from './Data/ApiURL';
import App from './App';
import './index.css'
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  uri: `${Dev}`
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
  , document.getElementById('root'));

serviceWorker.unregister();