import React from "react"
import { FIND_USER } from "../queries"
import { gql, useQuery,useApolloClient } from "@apollo/client"


const User = ({user}) => {
  const result = useQuery(FIND_USER)

  if(result.loading){
    return <div>loading...</div>
  }

    console.log(result.data.findUser)

    const curUser = result.data.findUser

    console.log(curUser)

  return (
    <div>
      Olet kirjautunut sisälle nimellä {curUser.username}
      <br/>
      Sinulla on {curUser.user_shopping_lists.length} ostoslistaa
      <br/>
      {curUser.user_shopping_lists[0].items[0].itemName}
    </div>
  )
}

export default User
