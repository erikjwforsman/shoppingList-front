import React, {useState, useEffect} from "react"

const Contacts = (props) => {
  const [expanded, setExpansion] = useState(false)

  const toggleExpansion = () => {
    setExpansion(!expanded)
  }

  const showContacts = () => {
    if (expanded) {
      return(
        <div>
          <button onClick={toggleExpansion}>Pienennä</button>
          { props.contacts.map(c =><div key={c.id}>*{c.username}</div>) }
        </div>
      )
    }
    return(<div>
        <button onClick={toggleExpansion}>Kontaktit</button>
      </div>)
  }

  return(
    <div>{showContacts()}</div>
  )
}

export default Contacts
