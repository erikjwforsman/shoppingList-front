import React, {useState, useEffect} from "react"
import { gql, useQuery,useApolloClient } from "@apollo/client"
import LoginForm from "./components/LoginForm"
import User from "./components/User"
import { FIND_USER } from "./queries"
//Siirto alkaa tästä
import Contacts from "./components/Contacts"
import ShoppingList from "./components/ShoppingList"


const App = () => {

  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
//  const result = useQuery(FIND_USER)
  const client = useApolloClient()

  const result = useQuery(FIND_USER, {
    variables: {nameToSearch: user}
  })



  useEffect(() => {
    const token = localStorage.getItem("shopping_list-user-token")
    const user = localStorage.getItem("user")
    console.log("APPIN User", user)
    if (token) {
      setToken(token)
    }
    if (user) {
      setUser(user)
    }

  }, [])

//  if(result.loading){
  //  return <div>loading...</div>
  //}

  if(result.loading){
    return <p>loading...</p>
  }

  const logOut = () => {
    setToken(null)
    setUser(null)
    console.log("Tyhjennys:", user)
    localStorage.clear()
    client.resetStore()
  }

//  console.log(result.data.findUser)


  if (!token) {
    return(
      <div>
        <h2>Login</h2>
        <LoginForm setToken={setToken} setUser={setUser} />
      </div>

    )
  }

  const shopping_lists = result.data.findUser.user_shopping_lists
  const contacts = result.data.findUser.userContacts


  return (
    <div>
      <button onClick={logOut} >logout</button>
      <div>
        <Contacts user={user} contacts={contacts}/>
        Sinulla on {result.data.findUser.user_shopping_lists.length} ostolistaa
        <h3>Listasi:</h3>
        {shopping_lists.map(l =>

          <ShoppingList key={l.id} shoppingList={l}/>

        )}


      </div>
    </div>
  )
}

export default App;
