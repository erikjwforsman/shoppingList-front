import React, {useState, useEffect} from "react"
import { gql, useQuery,useApolloClient } from "@apollo/client"
import LoginForm from "./components/LoginForm"
import User from "./components/User"
import { FIND_USER } from "./queries"
//import Contacts from "./components/Contacts"
//import ShoppingList from "./components/ShoppingList"

import Main from "./components/Main"
import EditShoppingList from "./components/EditShoppingList"
import AddNewList from "./components/AddNewList"
import EditItem from "./components/EditItem"
import RemoveItem from "./components/RemoveItem"
import RemoveList from "./components/RemoveList"
import EditListUsers from "./components/EditListUsers"



const App = () => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  //const [id, setId] = useState(null)
  const [page, setPage] = useState("main")
  const [pageProperties, setPageProperties] = useState(null)
  const [sender, setSender] = useState(null)
  const [kontti, setKontti] = useState(null)
  const client = useApolloClient()

  const result = useQuery(FIND_USER, {
    variables: {nameToSearch: user},
  }) //Lisää jossain vaiheessa pollaus

  //console.log(user)

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

  //console.log(result.data)

  const logOut = () => {
    setToken(null)
    setUser(null)
    localStorage.clear()
    client.resetStore()
  }

//  if(user === "Lena"){
  //  logOut()
  //}

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

    if (page === "editShoppingList") return (<EditShoppingList selectPage={selectPage} selectPageProperties={selectPageProperties} pageProperties={pageProperties} selectSender={selectSender} username={user} kontti={kontti} selectKontti={selectKontti}/>)

    if (page === "editItem") return (<EditItem selectPage={selectPage} selectPageProperties={selectPageProperties} pageProperties={pageProperties} selectSender={selectSender} sender={sender} username={user} selectKontti={selectKontti}/>)

    if (page === "removeItem") return (<RemoveItem selectPage={selectPage} selectPageProperties={selectPageProperties} pageProperties={pageProperties} selectSender={selectSender} sender={sender}  username={user}/>)

    if (page === "removeList") return (<RemoveList selectPage={selectPage} selectPageProperties={selectPageProperties} pageProperties={pageProperties} selectSender={selectSender} sender={sender} username={user}/>)

    if (page === "editListUsers") return (<EditListUsers selectPage={selectPage} pageProperties={pageProperties} userContacts={contacts} user={uberUser}/>)
  }

  //console.log(result.data.findUser)

  //Hätäuloskirjautuminen esim. null-ongelmaan
  //if (user==="Erik"){
    //logOut()
  //}

  const shopping_lists = result.data.findUser.user_shopping_lists
  const contacts = result.data.findUser.userContacts
  //console.log(result.data.findUser)

  const uberUser = {username:result.data.findUser.username, id:result.data.findUser.id}

  //console.log(id)

  const selectPage = (paikka) => {
    setPage(paikka)
  }

  const selectPageProperties = (uniikki) => {
    setPageProperties(uniikki)
  }

  const selectSender = (testi) => {
    setSender(testi)
  }

  const selectKontti = (asiaa) => {
    setKontti(asiaa)
  }


  return (
    <div>
      <div>
        {user}
        <button onClick={logOut} >logout</button>

      </div>
      <div>
        <Choice />
      </div>
    </div>
  )
}


export default App;
