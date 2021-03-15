import React, {useState} from "react"
import {gql, useMutation, useQuery} from "@apollo/client"
import {ADD_SHOPPINGLIST, FIND_USER} from "../queries"

import styles from "../AppStyles.module.css"

const AddNewList = (props) => {
  const [expanded, setExpansion] = useState(null)
  const [listName, setListName] = useState("")
  const [createList] =useMutation(ADD_SHOPPINGLIST,{
    refetchQueries: [{
      query: FIND_USER,
      variables: {nameToSearch: props.username}
    }]
  })

  const toggleExpansion = () => {
    setExpansion(!expanded)
  }

  const submit = async(event) => {
    if (listName.length < 2){
      window.alert("Listan nimen tulee olla vähintään kaksi merkkiä pitkä")
      //Tee oma showMessage tyyppinen ratkaisu ja estä reload
    } else {
      event.preventDefault()
      console.log(props.username)
      console.log(listName)
      createList({ variables:{ username: props.username, listName} } )
      setListName("")
    }

  }

  if (!expanded){
    return (
      <div>
        <button className={styles.lisaaLista} onClick={() => {
          toggleExpansion()
          setListName("")
        }}>Lisää lista</button>
      </div>)
  }

  return(
    <div>
      <form onSubmit = {submit} >
        <div className={styles.lisaaListainput}>
          Listan nimi: <input value={listName}
            onChange ={ ({target}) => setListName(target.value) }
          />
        </div>
        <div className={styles.lisaaListaButtons}>
        <button className={styles.lisaaListaButtonLeft} type="submit">Tallenna lista</button>
        <button className={styles.lisaaListaButtonRight} onClick={() => toggleExpansion() }>Peru lista</button><br/>
        </div>
      </form>
    </div>

  )
}

export default AddNewList
