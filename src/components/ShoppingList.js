import React, {useState} from "react"
import Item from "./Item"
import {gql, useMutation} from "@apollo/client"
import {REMOVE_MANY, REMOVE_ITEM} from "../queries"


const ShoppingList = (props) => {
  const [expanded, setExpansion] = useState(null)
  const [page, setPage] = useState("")
  const [removeMany] = useMutation(REMOVE_MANY)
  const [removeItem] = useMutation(REMOVE_ITEM)

  let itemsToBeRemoved = []

  const toggleExpansion = () => {
    setExpansion(!expanded)
  }
  const onCartCallback = (itemId) => {
    if (!itemsToBeRemoved.includes(itemId)){
      itemsToBeRemoved.push(itemId)
    } else {
      itemsToBeRemoved = itemsToBeRemoved.filter(item => item !== itemId)
    }
  }

  const removeItems = async() => {
    if (itemsToBeRemoved.length<1){
      console.log("Tämäkin toimii")
    } else {
      for (const i of itemsToBeRemoved){
        await removeItem({ variables: {listId:props.shoppingList.id, itemId: i} })
      }
    //js muuttaa arrayn olioksi ja se ei sovi gql:n tyyppiin?
    //await removeMany({variables: {listId:props.shoppingList.id, itemIds:itemsToBeRemoved}})
    itemsToBeRemoved=[]
    }
  }

  const listMembers = props.shoppingList.listMembers.map(m => m.username)
  //console.log(listMembers)

  const siirtymä = "editShoppingList"

  const showItems = () => {
    if (expanded){
      return (
        <div>
        {props.shoppingList.listName}
        <button onClick={toggleExpansion}>Sulje</button>
        <button onClick={() =>{
          {props.selectPageProperties(props.shoppingList)}
          {props.selectPage(siirtymä)}
        }}>Editoi listaa</button>
        <div>
        <div>
          {
            listMembers.length >1 ?
            <div>Listan käyttäjät:
              {listMembers.map((member, index) => ( (index ? ', ': '') + member ))}
            </div>
            : null
          }
        </div>
        {props.shoppingList.items.map( item =>
          <div key={item.id}>
            <Item item={item} onCartCallback={onCartCallback}/>
          </div>
        )}
        </div>
        <button onClick={()=>{removeItems()}}>Päivitä poimitut tuottet</button>
        </div>
      )
    }
    return (
      <div>
        {props.shoppingList.listName} <button onClick={toggleExpansion}>Laajenna</button>
      </div>
    )
  }

  return(
    <div>{showItems()}</div>
  )
}

export default ShoppingList
