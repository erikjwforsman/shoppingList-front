import React, {useState, useEffect} from "react"

const Contacts = (props) => {
  const [expanded, setExpansion] = useState(false)

  const toggleExpansion = () => {
    setExpansion(!expanded)
  }

  const listOfContacts = props.contacts.map(c =>c.username)
  console.log(listOfContacts)

  const showContacts = () => {
    if (expanded) {
      return(
        <div>
          <button onClick={toggleExpansion}>Pienennä</button>
          { props.contacts.map(c =><span key={c.id}> {c.username} </span>) }
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
