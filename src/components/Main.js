import React, {useState, useEffect} from "react"
import { gql, useQuery,useApolloClient } from "@apollo/client"
import Contacts from "./Contacts"
import ShoppingList from "./ShoppingList"
//import { FIND_USER } from "../queries"


const Main = (props) => {

  return(
    <div>
    <Contacts user={props.user} contacts={props.contacts}/>
      <div>
        Sinulla on {props.shopping_lists.length} ostolistaa
        <h3>Listasi:</h3>
        {props.shopping_lists.map(l =>
          <ShoppingList key={l.id} shoppingList={l} selectPage={props.selectPage} selectPageProperties={props.selectPageProperties} selectSender={props.selectSender}/>
        )}
      </div>
    </div>
  )
}

{/*
  return (
    <div>
      <div>
      <Contacts user={user} contacts={contacts}/>
      <button onClick={logOut} >logout</button>
      </div>
      <div>
        Sinulla on {result.data.findUser.user_shopping_lists.length} ostolistaa
        <h3>Listasi:</h3>
        {shopping_lists.map(l =>
          <ShoppingList key={l.id} shoppingList={l}/>
        )}
      </div>
    </div>
  )
  */}

export default Main
