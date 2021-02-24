import { gql } from "@apollo/client"

//findByUsername ($nameToSearch: String!)
//$nameToSearch

export const FIND_USER = gql`
  query findByUsername ($nameToSearch: String!){
    findUser(username:$nameToSearch){
      username
      id
      userContacts{
        id
        username
      }
      user_shopping_lists{
        listName
        id
        listMembers{
          id
          username
        }

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
