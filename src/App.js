import React, {useState, useEffect} from "react"
import { gql, useQuery,useApolloClient } from "@apollo/client"
import LoginForm from "./components/LoginForm"
import User from "./components/User"
//import { FIND_USER } from "./queries"


const App = () => {

  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
//  const result = useQuery(FIND_USER)
  const client = useApolloClient()


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


  return (
    <div>
      <button onClick={logOut} >logout</button>
      <User user={user}/>
    </div>
  )
}

export default App;
