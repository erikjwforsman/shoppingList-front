import React, {useState} from "react"
import Item from "./Item"
import {gql, useMutation, useQuery } from "@apollo/client"
import {FIND_LIST,REMOVE_MANY, REMOVE_ITEM, FIND_USER, } from "../queries"


const ShoppingList = (props) => {

  const resultList = useQuery(FIND_LIST,{
    variables:{ listId: props.listId}
  })

  const [expanded, setExpansion] = useState(null)
  const [page, setPage] = useState("")

  const [removeMany] = useMutation(REMOVE_MANY)
  const [removeItem] = useMutation(REMOVE_ITEM, {
    refetchQueries:[
      {
        query: FIND_USER,
        variables: {nameToSearch:props.username}
      }
    ]
  })

  let itemsToBeRemoved = []

console.log(typeof(props.listId))
  console.log(resultList.data)

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

        <button onClick={toggleExpansion}>{props.shoppingList.listName} sulje</button>
        <button onClick={() =>{
          {props.selectPageProperties(props.shoppingList)}
          {props.selectPage(siirtymä)}
        }}>Editoi listaa</button><br/>
        Tämä on resultListista lista {resultList.data.findList.id}
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
         <button onClick={toggleExpansion}>{props.shoppingList.listName} avaa</button>
      </div>
    )
  }

  return(
    <div>{showItems()}</div>
  )
}

export default ShoppingList
