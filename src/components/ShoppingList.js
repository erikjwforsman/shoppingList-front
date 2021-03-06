import React, {useState} from "react"
import Item from "./Item"
import {gql, useMutation, useQuery } from "@apollo/client"
import {FIND_LIST,REMOVE_MANY, REMOVE_ITEM, FIND_USER, } from "../queries"
import styles from "../AppStyles.module.css"


const ShoppingList = (props) => {

  const resultList = useQuery(FIND_LIST,{
    variables:{ listId: props.listId}
  })

  const [expanded, setExpansion] = useState(null)
  const [page, setPage] = useState("")

  const [removeMany] = useMutation(REMOVE_MANY, {
    refetchQueries:[
      {
        query: FIND_LIST,
        variables: {listId: props.listId}
      }
    ]
  })
  const [removeItem] = useMutation(REMOVE_ITEM, {
    refetchQueries:[
      {
        query: FIND_LIST,
        variables: {listId: props.listId}
      }
    ]
  })


{/* Korjaa tämä jossain vaiheessa

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


  const toggleExpansion = () => {
    setExpansion(!expanded)
  }

  let itemsToBeRemoved = []
  const listMembers = resultList.data.findList.listMembers.map(m => m.username)

  const onCartCallback = (itemId) => {
    if (!itemsToBeRemoved.includes(itemId)){
      itemsToBeRemoved.push(itemId)
    } else {
      itemsToBeRemoved = itemsToBeRemoved.filter(item => item !== itemId)
    }
  }

  const removeItems = async() => {
    //Tässä bugi, korjaa jossain vaiheessa // KORJATTU
    //Eli rivin 101 id ei vissiin ehdi mukaan
    //aiheutuu kun automaattinen refetch pärähtää ennen viimeisen poistoa => Tuo REMOVE_MANY?
    if (itemsToBeRemoved.length<1) {
      window.alert("Et ole valinnut poistettavia tuotteita")
    } else {

      await removeMany({variables: {listId: resultList.data.findList.id, itemIds: itemsToBeRemoved}})
      itemsToBeRemoved.length = 0
      console.log(itemsToBeRemoved)
    }
  }


  const siirtymä = "editShoppingList"

  console.log(resultList.data.findList.items)

  const showItems = () => {



    if (expanded){
      return (
        <div>
        {/* Tyyli: avattu lista yläpuolikas */}
        <div className={styles.whenListOpenned}>
        <button className={styles.closeListButton} onClick={toggleExpansion}>{resultList.data.findList.listName} sulje</button>
        <button className={styles.editListButton} onClick={() =>{
          {props.selectPageProperties(resultList.data.findList)}
          {props.selectPage(siirtymä)}
        }}>Editoi listaa</button><br/>
        </div>

        {/* Tyyli: avattu lista alapuolikas
          Listan käyttäjät mihin???
          */}
        <div className={styles.listanTausta}>
        <div style={{marginLeft:5}}>
          {
            listMembers.length >1 ?
            <div>Listan käyttäjät:
              {listMembers.map((member, index) => ( (index ? ', ': '') + member ))}
            </div>
            : null
          }
        </div>
        <div style={{marginLeft:5}}>
          &#x1F6D2;
        </div>
        {resultList.data.findList.items.map( item =>
          <div key={item.id}>
            <Item item={item} onCartCallback={onCartCallback} />
          </div>
        )}
        </div>

        {/* Tyyli: poista useita listalta */}
        <div className={styles.whenListOpenned}>
        <button className={styles.removeMany} onClick={()=>{removeItems()}}>Päivitä poimitut tuottet</button>
        </div>
        </div>
      )
    }
    return (
      <div >
         <button className={styles.openListButton} onClick={toggleExpansion}>{resultList.data.findList.listName} avaa</button>
      </div>
    )
  }

  return(
    <div>{showItems()}</div>
  )
}

export default ShoppingList
