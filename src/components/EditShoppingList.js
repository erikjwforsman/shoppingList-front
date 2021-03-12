import React from "react"
import Item from "./Item"
import AddNewItem from "./AddNewItem"
import EditListUsers from "./EditListUsers"
import {gql, useQuery, useMutation} from "@apollo/client"
import {FIND_LIST, REMOVE_ITEM} from "../queries"


const EditShoppingList = (props) => {

  const listResult = useQuery(FIND_LIST,{
    variables:{ listId: props.pageProperties.id}
  })

  if(listResult.loading){
    return <p>loading...</p>
  }

  const callBackRemove = () => {
    console.log("callback poisto")
  }

  const koti = "main"
  const removeList = "removeList"
  const editListUsers = "editListUsers"
  const shoppingList = listResult.data.findList

  return (
    <div>
      <button onClick={()=>{
        {props.selectPageProperties(null)}
        {props.selectPage(koti)}
      }}>takaisin</button><br/>

      Täällä voit editoida listaasi: "{shoppingList.listName}"<br/>

      <div>
        <button onClick={()=>{
          {props.selectPageProperties(shoppingList)}
          {props.selectPage(editListUsers)}
        }}>Muokkaa käyttäjiä</button>

        <button onClick={()=>{
          {props.selectPageProperties(shoppingList)}
          {props.selectPage(removeList)}
        }}>Poista lista</button>

        {
          shoppingList.listMembers.length >1 ?
          <div>Listan käyttäjät: {shoppingList.listMembers.map((member, index) => ( (index ? ', ': '') + member.username ))} </div>
          : <div>listaa ei ole jaettu muille</div>
        }
      </div>

      <div>
        Listan tuotteet:
        {shoppingList.items.map( item =>
          <div key={item.id}>
            <Item item={item} open={true} selectPage={props.selectPage} listId={props.pageProperties.id} selectPageProperties={props.selectPageProperties} curSender={shoppingList} selectSender={props.selectSender} hookItem={props.hookItem} />
          </div>
        )}
      </div>
      <AddNewItem listId={props.pageProperties.id} username={props.username}/>
    </div>
  )
}

export default EditShoppingList
