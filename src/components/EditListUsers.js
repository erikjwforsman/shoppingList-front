import React from "react"
import {gql, useQuery, useMutation} from "@apollo/client"
import {FIND_LIST, ADD_USER_TO_LIST, REMOVE_USER_FROM_LIST} from "../queries"

const EditListUsers = (props) => {
  const result = useQuery(FIND_LIST, {variables: {listId:props.pageProperties.id}})

  const [addUser] = useMutation(ADD_USER_TO_LIST,{
    refetchQueries: [{
      query:FIND_LIST,
      variables: {listId:props.pageProperties.id}
    }]
  })
  const [removeUser] = useMutation(REMOVE_USER_FROM_LIST, {
    refetchQueries: [{
      query:FIND_LIST,
      variables: {listId:props.pageProperties.id}
    }]
  })

  if(result.loading){
    return <p>loading...</p>
  }

{/* Sama haaste poistossa
  Cache data may be lost when replacing the listMembers field of a Shopping_list object.

To address this problem (which is not a bug in Apollo Client), define a custom merge function for the Shopping_list.listMembers field, so InMemoryCache can safely merge these objects:

  existing: [{"__ref":"User:604355bd4ec7a9839e653ef4"},{"__ref":"User:6049e3d1846ff62c1aa82939"}]
  incoming: [{"__ref":"User:604355bd4ec7a9839e653ef4"}]

For more information about these options, please refer to the documentation:

  * Ensuring entity objects have IDs: https://go.apollo.dev/c/generating-unique-identifiers
  * Defining custom merge functions: https://go.apollo.dev/c/merging-non-normalized-objects

  */}
  console.log(props)
  const currentlyOnList = result.data.findList.listMembers.filter(m => m.username !== props.user)
  const currentlyOnListNames = currentlyOnList.map(m => m.username)

  const possibleUsers=(props.userContacts)
  const canBeAddToUsers=possibleUsers.filter(u => !currentlyOnListNames.includes(u.username))
  const senderList = props.pageProperties.id

  const addUserHere = async (listId, username) => {
    await addUser({variables: {listId: listId, nameToAdd:username}})
  }

  const removeUserHere = async (listId, username) => {
    await removeUser({variables: {listId: listId, username:username}})
  }

  const choosePage = "editShoppingList"

  return(
    <div>
    omat kontaktit: {props.userContacts.map(u => u.username)} <br/>

    Poista listan nykyinen käyttäjä: <br/>{currentlyOnList.map(v => <button key={v.id} onClick={()=>{
      removeUserHere(senderList, v.username)
    }}>{v.username}</button>)}<br/>

    Lisää listan käyttäjäksi: <br/>{canBeAddToUsers.map(c => <button key={c.id} onClick={()=>{
      addUserHere(senderList, c.username)
    }}>{c.username}</button>)}<br/>

      Täällä voit editoida käyttäjiä
      <button onClick={()=>{
        props.selectPageProperties(props.pageProperties)
        props.selectPage(choosePage)
      }}>Takaisin</button>
    </div>
  )
}

export default EditListUsers
