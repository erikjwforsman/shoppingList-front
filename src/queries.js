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
  mutation editSelectedItem($itemId:String!,$itemName:String!, $itemAmount:String, $itemNote:String){
    editItemOnList(itemId:$itemId, itemName:$itemName, itemAmount:$itemAmount, itemNote:$itemNote){
      itemName
    }
  }
`

export const REMOVE_ITEM = gql`
  mutation removeItem($listId:String!, $itemId:String!){
    removeItemFromList(listId:$listId, itemId:$itemId){
      itemName
    }
  }
`
export const REMOVE_LIST = gql`
  mutation removeList($listId:String!){
    deleteList(listId:$listId){
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
