import { gql } from "@apollo/client"

//findByUsername ($nameToSearch: String!)
//$nameToSearch

export const FIND_USER = gql`
  query findByUsername ($nameToSearch: String){
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

export const ADD_SHOPPINGLIST = gql`
  mutation addShoppingList($username: String!, $listName:String!){
    addNewList(username: $username, listName:$listName){
      listName
    }
  }
`

export const ADD_ITEM = gql`
  mutation addItem($listName: String!,$itemName: String!, $itemAmount:String, $itemNote:String){
    addItemToList(listName: $listName, itemName: $itemName, itemAmount: $itemAmount, itemNote:$itemNote){
      itemName
    }
  }
`

export const EDIT_ITEM = gql`
  mutation editSelectedItem($itemName:String!, $itemAmount:String, $itemNote:String){
    editItemOnList(itemName:$itemName, itemAmount:$itemAmount, itemNote:$itemNote){
      itemName
    }
  }
`

export const REMOVE_ITEM = gql`
  mutation removeItem($listName:String!, $itemName:String!){
    removeItemFromList(listName:$listName, itemName:$itemName){
      itemName
    }
  }
`
export const REMOVE_LIST = gql`
  mutation removeList($listName:String!){
    deleteList(listName:$listName){
      listName
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
