import React from "react"
import Item from "./Item"
import AddNewItem from "./AddNewItem"
import EditListUsers from "./EditListUsers"
import {gql, useQuery} from "@apollo/client"
import {FIND_LIST} from "../queries"


const EditShoppingList = (props) => {

  const listResult = useQuery(FIND_LIST,{
    variables:{ listId: props.pageProperties.id}
  })
  //console.log(listResult.data.findList.items.length)

  //console.log(typeof(props.pageProperties.id))

  //console.log(props.pageProperties.id)

  if(listResult.loading){
    return <p>loading...</p>
  }

  const koti = "main"
  const removeList = "removeList"
  const editListUsers = "editListUsers"
  const shoppingList = props.pageProperties
  //console.log(shoppingList.listMembers)

  return (
    <div>
    <button onClick={()=>{
      {props.selectPageProperties(null)}
      {props.selectPage(koti)}
    }}>takaisin</button><br/>
    Täällä voit editoida listaasi: "{shoppingList.listName}"<br/>
    Sinulla on {listResult.data.findList.items.length} tuotetta listallasi
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
        <div>Listan käyttäjät:
          {shoppingList.listMembers.map((member, index) => ( (index ? ', ': '') + member.username ))}

        </div>
        : <div>listaa ei ole jaettu muille</div>
      }
    </div>

    <div>
      Listan tuotteet:
      {shoppingList.items.map( item =>
        <div key={item.id}>
          <Item item={item} open={true} selectPage={props.selectPage} selectPageProperties={props.selectPageProperties} curSender={shoppingList} selectSender={props.selectSender}/>
        </div>
      )}
    </div>

      <AddNewItem listId={props.pageProperties.id} username={props.username}/>

    </div>
  )
}

export default EditShoppingList
