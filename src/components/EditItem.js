import React, {useState} from "react"
import {gql, useMutation} from "@apollo/client"
import {EDIT_ITEM, FIND_LIST} from "../queries"

const EditItem = (props) => {
  const [itemName, setItemName] = useState(props.pageProperties.itemName)
  const [itemAmount, setItemAmount] = useState(props.pageProperties.itemAmount === null ? "" : props.pageProperties.itemAmount)
  const [itemNote, setItemNote] = useState(props.pageProperties.itemNote === null ? "" : props.pageProperties.itemNote)

  const [changeItem] = useMutation(EDIT_ITEM, {
    refetchQueries: [{
      query: FIND_LIST,
      variables: {listId: props.pageProperties.id}
    }]
  })

  const item = props.pageProperties

  const submit = async(event) => {
    event.preventDefault()
    if (itemNote.length>40){
      console.log("Viestin tulee olla alle 40 merkkiä pitkä")
      window.alert("Viestin tulee olla alle 40 merkkiä pitkä")
    } else if (itemName.length>25) {
      window.alert("Tuotteen nimen tulee olla alle 25 merkkiä pitkä")
    } else if (itemAmount.length>15) {
      window.alert("Määrän tulee olla alle 15 merkkiä pitkä")
    }

    else {
    props.selectHookItem({itemId:item.id ,itemName, itemNote, itemAmount})
    props.selectPageProperties(props.sender)
    props.selectPage(choosePage)
    }
  }

  const choosePage = "editShoppingList"

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
        {props.selectPage(choosePage)}
      }}>takaisin</button>
    </div>
  )
}

export default EditItem
