import React, {useState} from "react"
import RemoveItem from "./RemoveItem"
import {gql, useMutation} from "@apollo/client"
import {REMOVE_ITEM, FIND_USER, FIND_LIST} from "../queries"
//  //  //  //  //
// Korjaa poiston ongelma:
// Cache data may be lost when replacing the items field of a Shopping_list object.
//
// To address this problem (which is not a bug in Apollo Client), define a custom merge function for the Shopping_list.items field, so InMemoryCache can safely merge these objects:
//
//   existing: [{"__ref":"Item:60473d26a230ac235f2b76c9"},{"__ref":"Item:60474653a230ac235f2b76cb"}]
//   incoming: [{"__ref":"Item:60473d26a230ac235f2b76c9"}]
//
// For more information about these options, please refer to the documentation:
//
//   * Ensuring entity objects have IDs: https://go.apollo.dev/c/generating-unique-identifiers
//   * Defining custom merge functions: https://go.apollo.dev/c/merging-non-normalized-objects

//  //  //  //  //



const Item = (props) => {
  const [removeItem] = useMutation(REMOVE_ITEM,{
    refetchQueries: [
      {
        query: FIND_USER,
        variables: {nameToSearch: props.username}
      },
      {
        query: FIND_LIST,
        variables: {listId: props.listId}
      }
    ]
  })
  const [expanded, setExpansion] = useState(null)
  const [onCart, pickUp] = useState(false)

  const toggleExpansion = () =>{
    setExpansion(!expanded)
  }

  const togglePickUp = () => {
    pickUp(!onCart)
    props.onCartCallback(props.item.id)
  }

  console.log(props.listId)

  const editPage = "editItem"
  const removeItemPage = "removeItem"

  const finalizeRemoval = async(event) => {
    await removeItem({ variables: {listId:props.curSender.id, itemId:props.item.id}})

  }

  const showItemDetails = () => {
    if (props.open===true){
      return  <div>
                <div>{props.item.itemName} {props.item.itemAmount}
                  <button onClick={() => {
                    {finalizeRemoval()}
                  }}>Poista</button>

                  <button onClick={() =>{
                    {props.selectPageProperties(props.item)}
                    {props.selectSender(props.curSender)}
                    {props.selectPage(editPage)}
                  }}>Muokkaa</button>
                </div>

                <div>{props.item.itemNote}</div>
              </div>
    }

    if (!props.item.itemNote){
      if(onCart) {
        return <div><s>{props.item.itemName} {props.item.itemAmount}</s><button onClick={togglePickUp}>Poista korista</button></div>
      }
      return (<div>{props.item.itemName} {props.item.itemAmount}<button onClick={togglePickUp}>Lisää koriin</button></div>)
    }

    if (!expanded){
      if(onCart) {
        return <div><s>{props.item.itemName} {props.item.itemAmount}</s><button onClick={toggleExpansion}>Auki</button><button onClick={togglePickUp}>Poista korista</button></div>
      }
      return (<div>{props.item.itemName} {props.item.itemAmount}<button onClick={toggleExpansion}>Auki</button><button onClick={togglePickUp}>Lisää koriin</button></div>)

    } else {
      if(onCart) {
        return (
          <div>
            <div><s>{props.item.itemName} {props.item.itemAmount}</s><button onClick={toggleExpansion}>Kiinni</button><button onClick={togglePickUp}>Poista korista</button></div>
            <div>{props.item.itemNote}</div>
          </div>
        )
      }
      return (
        <div>
          <div>{props.item.itemName} {props.item.itemAmount}<button onClick={toggleExpansion}>Kiinni</button><button onClick={togglePickUp}>Lisää koriin</button></div>
          <div>{props.item.itemNote}</div>
        </div>
      )
    }




  }

  //console.log(props)

  return(
    <div>{showItemDetails()}</div>
  )
}
export default Item
