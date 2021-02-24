import React, {useEffect, useState}  from "react"
import { FIND_USER } from "../queries"
import { gql, useQuery,useApolloClient, useLazyQuery } from "@apollo/client"


const User =  ({user}) => {

//  const [curUser, setUser] = useState(null)
  //const [findUser, result] = useLazyQuery(FIND_USER)

console.log("user:",user)

  const result = useQuery(FIND_USER, {
    variables: {nameToSearch: user}
  })



  //const [loading, error, data] = useQuery(FIND_USER)//, {
//    variables: {username: "Erik"}
  //})


  if(result.loading){
    return <p>loading...</p>
  }
  //const result = useQuery(FIND_USER)

//  if(result.loading){
    //return <div>loading...</div>
  //}

//  const showUser = (user) => {
  //  findUser({ variables: { username: user } })
  //}

  //useEffect(() => {
    //if(result.data){
      //console.log(result.data.findUser)
      //setUser(result.data.findUser)
    //}
  //}, [result.data])

  //  console.log(result.data.findUser)

    //const curUser = result.data.findUser

    //console.log(curUser)

    console.log(result.data)
    const shopping_lists = result.data.findUser.user_shopping_lists
    console.log(shopping_lists)
    const contacts = result.data.findUser.userContacts
    console.log(contacts)

  return (
    <div>
      Sinulla on {result.data.findUser.user_shopping_lists.length} ostolistaa
      <h3>Listasi:</h3>
      {shopping_lists.map(l =>
        <div key={l.id}>
          {l.listName} <button onClick={()=>console.log(`${l.listName} avautuu`)}>avaa</button>
          <br/>
          Käyttäjät: {l.listMembers.map(member => member.username)}
          <br/>
          {l.items.map(item =>
            <div key={item.id}>
              {item.itemName} {item.itemAmount} <br/>
              {item.itemNote}
            </div>
          )}
          <p></p>
        </div>

      )}


      <h3>Kontaktisi:</h3>
      {contacts.map(c =>
        <div key={c.id}>
          *{c.username}
        </div>
      )}

    </div>


  )
}

export default User
