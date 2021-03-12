import React from "react"
import {gql, useMutation} from "@apollo/client"
import {REMOVE_LIST} from "../queries"

const RemoveList = (props) => {
  const [removeList] = useMutation(REMOVE_LIST)

  const listToBeRemoved = props.pageProperties

  const finalizeRemoval = async() => {
    await removeList({ variables:{listId:listToBeRemoved.id} })
    window.location.reload()
  }

  const returnTo="editShoppingList"

  return(
    <div>
      Haluatko varmasti poistaa listan {listToBeRemoved.listName}?<br/>
      <button onClick={() => {
        {finalizeRemoval()}
      }}
      >Poista</button>

      <button onClick={()=>{
        {props.selectPageProperties(props.pageProperties)}
        {props.selectPage(returnTo)}
      }}
      >Peru poisto</button>
    </div>
  )
}
export default RemoveList
