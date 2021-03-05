import React from "react"
import {gql, useMutation} from "@apollo/client"
import {REMOVE_ITEM, FIND_USER} from "../queries"

const RemoveItem = (props) => {
  const [removeItem] = useMutation(REMOVE_ITEM,{
    refetchQueries: [
      {
      query: FIND_USER,
      variables: {nameToSearch: props.username}
      }
    ]
  })

  //props.sender => lista
  //props.pageProperties.itemName => itemName
  const item = props.pageProperties
  const lista = props.sender
  const kohde = "editShoppingList"
  console.log(item)
  console.log(lista)
  const finalizeRemoval = async(event) => {
    //event.preventDefault()
    await removeItem({ variables:{listId:lista.id, itemId:item.id} })
  }

  return (
    <div>
      Haluatko varmasti tämän tuotteen listalta {lista.listName}?<br/>
      {item.itemName}<br/>
      {item.itemAmount}<br/>
      {item.itemNote}<br/>
      <button onClick = {() => {
        {finalizeRemoval()}
      }}>Poista</button>

      <button onClick = {() => {
        {props.selectPageProperties(props.sender)}
        {props.selectPage(kohde)}
      }}>Peru poisto</button>

    </div>
  )
}

export default RemoveItem
