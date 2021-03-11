import React from "react"
import {gql, useQuery, useMutation} from "@apollo/client"
import {FIND_LIST, ADD_USER_TO_LIST, REMOVE_USER_FROM_LIST} from "../queries"

const EditListUsers = (props) => {
  //Ota oma kysely ja kytke mutaatio tänne tai edelliseen
  const [addUser] = useMutation(ADD_USER_TO_LIST,{
    refetchQueries: [
      {
        query:FIND_LIST,
        variables: {listId:props.pageProperties.id}
      }
    ]
  })
  const [removeUser] = useMutation(REMOVE_USER_FROM_LIST, {
    refetchQueries: [
      {
        query:FIND_LIST,
        variables: {listId:props.pageProperties.id}
      }
    ]
  })
{/*
  Paikallinen päivitys kesken. Joko
  A) Kokoa komponentiin query
    tai
  B) Luo hetkellinen muutos komponenttiin
  */}
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

  //Nykyiset käyttäjät miinus itse
  const vali = props.pageProperties.listMembers.filter(m => m.username !== props.user.username)
  const chekki = vali.map(m => m.username)
  //console.log("vali",vali)
  //console.log("chekki", chekki)
  //Käyttäjän kontaktit

  const addUserHere = async (listId, username) => {
    await addUser({variables: {listId: listId, nameToAdd:username}})
  }

  const removeUserHere = async (listId, username) => {
    await removeUser({variables: {listId: listId, username:username}})
  }

  const canBeAdded = vali.filter(a => a.username )
  //console.log(canBeAdded)
  const canBeRemoved = []

  const sisaan=(props.userContacts)
  // console.log(sisaan)
  // const ass = sisaan.map(u => u.username)
  // console.log("TÄSSÄ:",ass)
  const voiLisata=sisaan.filter(u => !chekki.includes(u.username))
  //console.log(voiLisata)
  const senderList = props.pageProperties.id
//{props.userContacts.map(c => c.username)}<br/>
const kohde = "editShoppingList"

  return(
    <div>
    omat kontaktit: {props.userContacts.map(u => u.username)} <br/>
    nykyiset käyttäjät: {props.pageProperties.listMembers.map(m => m.username)}<br/>
    Poista Listan käyttäjistä: <br/>{vali.map(v => <button key={v.id} onClick={()=>{
      console.log("Poistettu")
      removeUserHere(senderList, v.username)
    }}>{v.username}</button>)}<br/>

    Lisää listan käyttäjäksi: <br/>{voiLisata.map(c => <button key={c.id} onClick={()=>{
      //addUserHere(listId= senderList, username=c.username)
      addUserHere(senderList, c.username)

    }}>{c.username}</button>)}<br/>

      Täällä voit editoida käyttäjiä
      <button onClick={()=>{
        props.selectPageProperties(props.pageProperties)
        props.selectPage(kohde)
      }}>Takaisin</button>
    </div>
  )
}

export default EditListUsers
