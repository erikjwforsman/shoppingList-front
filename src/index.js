import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, gql } from '@apollo/client'
import { setContext } from 'apollo-link-context'

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem("shopping_list-user-token")
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` :null,
    }
  }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

const query = gql`
  query{
    findUser(username:"Erik"){
      username
      id
      userContacts{
        id
        username
      }
      user_shopping_lists{
        listName
        items{
          itemName
          itemNote
          itemAmount
          id
        }
      }
    }
  }
`

client.query({ query })
  .then((response) => {
    console.log(response.data)
  })

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
    </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
