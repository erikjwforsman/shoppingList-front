import React, { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"

import { LOGIN } from "../queries"

const LoginForm = ({ setToken, setUser }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if(result.data) {
      const token = result.data.login.value
      const user = username
      setToken(token)
      setUser(user)
      localStorage.setItem("shopping_list-user-token", token)
      localStorage.setItem("user", user)
    }
  }, [result.data])

  const submit = async (event) =>{
    event.preventDefault()
    await login({variables: {username, password} })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type="password"
            value={password}
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
