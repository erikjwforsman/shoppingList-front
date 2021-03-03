import React from "react"
import {gql, useMutation} from "@apollo/client"
import {REMOVE_LIST} from "../queries"

const RemoveList = (props) => {
  const [removeList] = useMutation(REMOVE_LIST)

  const lista = props.pageProperties
  console.log(lista)
  const kohde="editShoppingList"

  const finalizeRemoval = async() => {
    await removeList({ variables:{listId:lista.id} })
    window.location.reload()
  }

  return(
    <div>
      Haluatko varmasti poistaa listan {lista.listName}?<br/>
      <button onClick={() => {
        {finalizeRemoval()}
      }}
      >Poista</button>

      <button onClick={()=>{
        {props.selectPageProperties(props.pageProperties)}
        {props.selectPage(kohde)}
      }}
      >Peru poisto</button>
    </div>
  )
}
export default RemoveList
