import React, {useState, useEffect} from "react"
import { gql, useQuery,useApolloClient } from "@apollo/client"
import Contacts from "./Contacts"
import ShoppingList from "./ShoppingList"
import AddNewList from "./AddNewList"


const Main = (props) => {
  return(
    <div>
      <div>

        <br/>
        <h3>Listasi:</h3>
        {props.shopping_lists.map(l =>
          <ShoppingList key={l.id} shoppingList={l} selectPage={props.selectPage} selectPageProperties={props.selectPageProperties} selectSender={props.selectSender} username={props.user} listId={l.id}/>
        )}
      </div>
      <br/>
      <AddNewList username={props.user}/>
    </div>
  )
}


export default Main
