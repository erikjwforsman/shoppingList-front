import React from "react"
import {gql, useMutation} from "@apollo/client"
import {REMOVE_ITEM} from "../queries"

const RemoveItem = (props) => {
  const [removeItem] = useMutation(REMOVE_ITEM)
  //props.sender => lista
  //props.pageProperties.itemName => itemName
  const item = props.pageProperties
  const lista = props.sender
  const kohde = "editShoppingList"

  const finalizeRemoval = async(event) => {
    //event.preventDefault()
    await removeItem({ variables:{listName:lista.listName, itemName:item.itemName} })
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
