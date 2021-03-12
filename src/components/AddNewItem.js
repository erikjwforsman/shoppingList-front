import React, {useState} from "react"
import {gql, useMutation} from "@apollo/client"
import {ADD_ITEM, FIND_USER, FIND_LIST} from "../queries"

const AddNewItem = (props) => {
  const [expanded, setExpansion] = useState(null)
  const [itemName, setItemName] = useState("")
  const [itemAmount, setItemAmount] = useState("")
  const [itemNote, setItemNote] = useState("")
  const [createItem] = useMutation(ADD_ITEM, {
   refetchQueries: [{
      query: FIND_LIST,
      variables: {listId: props.listId}
    }]
  })

  const toggleExpansion = () => {
    setExpansion(!expanded)
  }

  const submit = async(event) => {
    event.preventDefault()
    console.log(props.listId)
    console.log(itemName)
    console.log(itemAmount)
    console.log(itemNote)
    createItem({ variables: { listId: props.listId, itemName, itemAmount, itemNote }})
    setItemName("")
    setItemAmount("")
    setItemNote("")
  }

  if(!expanded){
    return (
      <div>
        <button onClick={() => toggleExpansion()}>Lisää tuotteita</button>
      </div>
    )
  }
  return (
    <div>
      <button onClick={() => {
        toggleExpansion()
        setItemName("")
        setItemAmount("")
        setItemNote("")
      }}>Peru tuote</button><br/>
      <form onSubmit={submit}>
        <div>
          Tuotteen nimi: <input value={itemName}
            onChange={ ({target}) => setItemName(target.value) }
          />
        </div>
        <div>
          Tuotteen määrä: <input value ={itemAmount}
            onChange={({target})=> setItemAmount(target.value)}
          />
        </div>
        <div>
          Lisätiedot: <input value={itemNote}
            onChange={ ({target})=> setItemNote(target.value)}
          />
        </div>
        <button>Lisää tuote listalle</button>
      </form>
    </div>
  )
}

export default AddNewItem
