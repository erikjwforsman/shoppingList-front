import React, {useState} from "react"
import {gql, useMutation, useQuery} from "@apollo/client"
import {ADD_SHOPPINGLIST, FIND_USER, FIND_LIST} from "../queries"

const AddNewList = (props) => {
  const [expanded, setExpansion] = useState(null)
  const [listName, setListName] = useState("")
  const [createList] =useMutation(ADD_SHOPPINGLIST,{
    refetchQueries: [
      {
        query: FIND_USER,
        variables: {nameToSearch: props.username}
      },
  //    {
    //    query: FIND_LIST,
      //  variables: {listId: props.listId}
      //}
    ]
  })

  console.log(props)
  const toggleExpansion = () => {
    setExpansion(!expanded)
  }

  //createList({ variables:{ username: props.username, listName} } )


  const submit = async(event) => {
    event.preventDefault()
    console.log(props.username)
    console.log(listName)
    createList({ variables:{ username: props.username, listName} } )
    setListName("")

  }

  //console.log(props)

  if (!expanded){
    return  <div>
    <button onClick={() => {
      toggleExpansion()
      setListName("")
    }}>Lisää lista</button>
            </div>
  }

  return(
    <div>
      <button onClick={() => toggleExpansion() }>Peru lista</button><br/>
      <form onSubmit = {submit}>
        <div>
          Listan nimi: <input value={listName}
            onChange ={ ({target}) => setListName(target.value) }
          />
        </div>
        <button>Tallenna lista</button>
      </form>
    </div>

  )
}

export default AddNewList
