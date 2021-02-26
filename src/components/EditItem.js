import React, {useState} from "react"

const EditItem = (props) => {
  console.log(props)
  const item = props.pageProperties
  const kohde = "editShoppingList"
  //{selectPageProperties(props.sender)}
  //{selectPage(kohde)}

  return (
    <div> Tuote: <br/>
          Nimi: {item.itemName} <br/>
          Määrä: {item.itemAmount} <br/>
          Tiedot: {item.itemNote} <br/>
          <button>muuta</button>
          <button onClick={()=>{
            {props.selectPageProperties(props.sender)}
            {props.selectPage(kohde)}
          }}>takaisin</button>
    </div>
  )
}

export default EditItem
