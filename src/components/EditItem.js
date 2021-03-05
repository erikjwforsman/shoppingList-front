import React, {useState} from "react"
import {gql, useMutation} from "@apollo/client"
import {EDIT_ITEM, FIND_USER} from "../queries"

const EditItem = (props) => {
  const [itemName, setItemName] = useState(props.pageProperties.itemName)
  const [itemAmount, setItemAmount] = useState(props.pageProperties.itemAmount === null ? "" : props.pageProperties.itemAmount)
  const [itemNote, setItemNote] = useState(props.pageProperties.itemNote === null ? "" : props.pageProperties.itemNote)

  const [changeItem] = useMutation(EDIT_ITEM, {
    refetchQueries: [
      {
      query: FIND_USER,
      variables: {nameToSearch: props.username}
      }
    ]
  })


  console.log(props)
  const item = props.pageProperties
  const kohde = "editShoppingList"
  //{selectPageProperties(props.sender)}
  //{selectPage(kohde)}

  const submit = async(event) => {
    event.preventDefault()
    console.log(itemName)
    console.log(itemAmount)
    console.log(itemNote)
    //pääsee tähän asti
    await changeItem({ variables: {itemId:item.id ,itemName, itemNote, itemAmount}  })
    //props.selectPageProperties(props.sender)
    //props.selectPage(kohde)
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Tuotteen nimi: <input value={itemName}
            onChange={ ({target}) => setItemName(target.value) }
          />
        </div>
        <div>
          Tuotteen määrä: <input value={itemAmount}
            onChange={({target})=> setItemAmount(target.value)}
          />
        </div>
        <div>
          Lisätiedot: <input value={itemNote}
            onChange={ ({target}) => setItemNote(target.value)}
          />
        </div>
        <button>muuta</button>
      </form>
      <button onClick={()=>{
        {props.selectPageProperties(props.sender)}
        {props.selectPage(kohde)}
      }}>takaisin</button>
    </div>
  )
}

export default EditItem
