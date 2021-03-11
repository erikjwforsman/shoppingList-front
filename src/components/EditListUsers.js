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


  console.log(props)

  //Nykyiset käyttäjät miinus itse
  const vali = props.pageProperties.listMembers.filter(m => m.username !== props.user.username)
  const chekki = vali.map(m => m.username)
  //console.log("vali",vali)
  //console.log("chekki", chekki)
  //Käyttäjän kontaktit


  const canBeAdded = vali.filter(a => a.username )
  //console.log(canBeAdded)
  const canBeRemoved = []

  const sisaan=(props.userContacts)
  // console.log(sisaan)
  // const ass = sisaan.map(u => u.username)
  // console.log("TÄSSÄ:",ass)
  const voiLisata=sisaan.filter(u => !chekki.includes(u.username))
  //console.log(voiLisata)

//{props.userContacts.map(c => c.username)}<br/>

  return(
    <div>
    omat kontaktit: {props.userContacts.map(u => u.username)} <br/>
    nykyiset käyttäjät: {props.pageProperties.listMembers.map(m => m.username)}<br/>
    Poista Listan käyttäjistä: <br/>{vali.map(v => <button key={v.id} onClick={()=>console.log("Poistettu")}>{v.username}</button>)}<br/>

    Lisää listan käyttäjäksi: <br/>{voiLisata.map(c => <button key={c.id} onClick={()=>console.log("Lisätty")}>{c.username}</button>)}<br/>

      Täällä voit editoida käyttäjiä
      <button>Takaisin</button>
    </div>
  )
}

export default EditListUsers
