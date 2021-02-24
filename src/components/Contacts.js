import React, {useState, useEffect} from "react"

const Contacts = (props) => {
  const [expanded, setExpansion] = useState(false)

  const toggleExpansion = () => {
    setExpansion(!expanded)
  }

  console.log("PROPSIT", props.user)

  const showContacts = () => {
    console.log(props.user)
    if (expanded) {
      return(<div>
        <div>{props.user} <button onClick={toggleExpansion}>Pienennä</button></div>
        {props.contacts.map(c =>
          <div key={c.id}>
            *{c.username}
          </div>
        )}

      </div>)
    }
    return(<div>
      <div>{props.user} <button onClick={toggleExpansion}>Kontaktit</button></div>
      </div>)
  }

  return(
    <div>{showContacts()}</div>
  )
}

export default Contacts
