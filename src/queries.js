import { gql } from "@apollo/client"

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
      }
    }
  }

`

export const FIND_LIST = gql`
  query findSpecificList ($listId: String!){
    findList(listId:$listId){
      listName
      id
      items{
        itemName
        id
        itemAmount
        itemNote
      }
      listMembers{
        username
        id
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

export const ADD_USER_TO_LIST = gql`
  mutation addListUser($listId:String!, $nameToAdd:String!){
    addUserToList(listId:$listId, nameToAdd:$nameToAdd){
      listName
    }
  }
`

export const REMOVE_USER_FROM_LIST = gql`
  mutation removeListUser($listId:String!, $username:String!){
    removeUserFromList(listId: $listId, username:$username){
      listName
    }
  }
`

export const ADD_ITEM = gql`
  mutation addItem($listId: String!,$itemName: String!, $itemAmount:String, $itemNote:String){
    addItemToList(listId: $listId, itemName: $itemName, itemAmount: $itemAmount, itemNote:$itemNote){
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

export const REMOVE_MANY = gql`
  mutation removeMany($listId:String!, $itemIds:[String!]){
    removeManyItems(listId: $listId, itemIds:$itemIds){
      listName
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
