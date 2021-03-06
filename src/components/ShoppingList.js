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
        query: FIND_LIST,
        variables: {listId: props.listId}
      }
    ]
  })

{/* Mysteerivirheen ohjeet poistettaessa useita:

  Cache data may be lost when replacing the items field of a Shopping_list object.

To address this problem (which is not a bug in Apollo Client), define a custom merge function for the Shopping_list.items field, so InMemoryCache can safely merge these objects:

  existing: [{"__ref":"Item:60435cd94ec7a9839e653f0a"},{"__ref":"Item:604363394ec7a9839e653f0f"}]
  incoming: [{"__ref":"Item:604363394ec7a9839e653f0f"}]

For more information about these options, please refer to the documentation:

  * Ensuring entity objects have IDs: https://go.apollo.dev/c/generating-unique-identifiers
  * Defining custom merge functions: https://go.apollo.dev/c/merging-non-normalized-objects


  */}

  if (resultList.loading){
    return <div>loading...</div>
  }

  const itemsToBeRemoved = []

//console.log(typeof(props.listId))
  console.log(props);
  console.log(resultList.data.findList.id)

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

//MUUTETTAVA => shoppingList
  const removeItems = async() => {
    if (itemsToBeRemoved.length<1){
      console.log("Tämäkin toimii")
    } else {
      for (const i of itemsToBeRemoved){
        await removeItem({ variables: {listId:resultList.data.findList.id, itemId: i} })
      }
    //js muuttaa arrayn olioksi ja se ei sovi gql:n tyyppiin?
    //await removeMany({variables: {listId:props.shoppingList.id, itemIds:itemsToBeRemoved}})
      itemsToBeRemoved.length = 0
    }
  }

  //Valmis
  //const listMembers = props.shoppingList.listMembers.map(m => m.username)
  const listMembers = resultList.data.findList.listMembers.map(m => m.username)

  //console.log(listMembers)

  const siirtymä = "editShoppingList"

  const showItems = () => {
    if (expanded){
      return (
        <div>

        <button onClick={toggleExpansion}>{resultList.data.findList.listName} sulje</button>
        <button onClick={() =>{
          {props.selectPageProperties(resultList.data.findList)}
          {props.selectPage(siirtymä)}
        }}>Editoi listaa</button><br/>
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
        {resultList.data.findList.items.map( item =>
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
         <button onClick={toggleExpansion}>{resultList.data.findList.listName} avaa</button>
      </div>
    )
  }

  return(
    <div>{showItems()}</div>
  )
}

export default ShoppingList
