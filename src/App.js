import React, {useState, useEffect} from "react"
import { gql, useQuery,useApolloClient } from "@apollo/client"
import LoginForm from "./components/LoginForm"
import User from "./components/User"
import { FIND_USER } from "./queries"

import Main from "./components/Main"
import Contacts from "./components/Contacts"
import EditShoppingList from "./components/EditShoppingList"
import AddNewList from "./components/AddNewList"
import EditItem from "./components/EditItem"
import RemoveList from "./components/RemoveList"
import EditListUsers from "./components/EditListUsers"
import Credits from "./components/Credits"


import styles from "./AppStyles.module.css"

const App = () => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [page, setPage] = useState("main")
  const [pageProperties, setPageProperties] = useState(null)
  const [sender, setSender] = useState(null)
  const [hookItem, setItemHook] = useState(null)
  const client = useApolloClient()

  const result = useQuery(FIND_USER, {
    variables: {nameToSearch: user},
  }) //Lisää jossain vaiheessa pollaus

  useEffect(() => {
    const token = localStorage.getItem("shopping_list-user-token")
    const user = localStorage.getItem("user")

    if (token) {
      setToken(token)
    }
    if (user) {
      setUser(user)
    }

  }, [])

  if(result.loading){
    return <p>loading...</p>
  }

  console.log(result.data)

  const logOut = () => {
    setToken(null)
    setUser(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return(
      <div>
        <h2>Login</h2>
        <LoginForm setToken={setToken} setUser={setUser} />
      </div>

    )
  }

  const Choice = () => {
    if (page === "main") return(<Main shopping_lists={shopping_lists} contacts={contacts} id={result.data.findUser.id} user={user} selectPage={selectPage} selectPageProperties={selectPageProperties} selectSender={selectSender}/>)

    if (page === "editShoppingList") return (<EditShoppingList selectPage={selectPage} selectPageProperties={selectPageProperties} pageProperties={pageProperties} selectSender={selectSender} username={user} hookItem={hookItem} />)

    if (page === "editItem") return (<EditItem selectPage={selectPage} selectPageProperties={selectPageProperties} pageProperties={pageProperties} selectSender={selectSender} sender={sender} username={user} selectHookItem={selectHookItem}/>)

    if (page === "removeList") return (<RemoveList selectPage={selectPage} selectPageProperties={selectPageProperties} pageProperties={pageProperties} selectSender={selectSender} sender={sender} username={user}/>)

    if (page === "editListUsers") return (<EditListUsers selectPage={selectPage} pageProperties={pageProperties} selectPageProperties={selectPageProperties} userContacts={contacts} user={user} />)
  }

  const shopping_lists = result.data.findUser.user_shopping_lists
  const contacts = result.data.findUser.userContacts

  const selectPage = (paikka) => {
    setPage(paikka)
  }

  const selectPageProperties = (uniikki) => {
    setPageProperties(uniikki)
  }

  const selectSender = (testi) => {
    setSender(testi)
  }

  const selectHookItem = (asiaa) => {
    setItemHook(asiaa)
  }

  //console.log(styles.testi)

  return (
    <div >
    {/*Appin yläosan asetukset tänne*/}
      <div className={styles.tin}>
        <h3>{user}
        <button onClick={logOut} >logout</button></h3>
        <Contacts user={user} contacts={contacts}/>
      </div>
      {/*Appin pääosan taustaväri tänne*/}
      <div className={styles.tausta}>
        <Choice />
      </div>
      <div>
        <Credits />
      </div>
    </div>
  )
}


export default App;
