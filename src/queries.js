import { gql } from "@apollo/client"

export const FIND_USER = gql`
  query findUser($username:String!){
    findUser(username:$username){
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!){
    login(username: $username, password: $password){
      value
    }
  }
`
