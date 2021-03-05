import React from "react"

const EditListUsers = (props) => {
  console.log(props)

  //omat kontaktit: {props.userContacts.map(u => u.username)} <br/>

  //console.log(typeof(props.pageProperties.listMembers[0].username))
  const vali = props.pageProperties.listMembers.filter(m => m.username !== props.user.username)
  console.log(vali)
  const canBeAdded = vali.filter(a => a.username )
  const canBeRemoved = []

  return(
    <div>
    omat kontaktit: {props.userContacts.map(u => u.username)} <br/>
    nykyiset käyttäjät: {props.pageProperties.listMembers.map(m => m.username)}<br/>
    Poista Listan käyttäjistä: <br/>{vali.map(v => <button key={v.id}>{v.username}</button>)}<br/>

      Täällä voit editoida käyttäjiä
      <button>Takaisin</button>
    </div>
  )
}

export default EditListUsers
