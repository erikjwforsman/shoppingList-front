import React from "react"
import Item from "./Item"
import AddNewItem from "./AddNewItem"

const EditShoppingList = (props) => {
  console.log(props)
  const koti = "main"
  const removeList = "removeList"
  const shoppingList = props.pageProperties
  //console.log(shoppingList.listMembers)
  return (
    <div>
    <button onClick={()=>{
      {props.selectPageProperties(null)}
      {props.selectPage(koti)}
    }}>takaisin</button><br/>
    Täällä voit editoida listaasi: "{shoppingList.listName}"<br/>
    <div>
    <button>Lisää käyttäjä</button>
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

      <AddNewItem listName={props.pageProperties.listName} username={props.username}/>

    </div>
  )
}

export default EditShoppingList
