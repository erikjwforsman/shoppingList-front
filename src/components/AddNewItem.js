import React, {useState} from "react"

const AddNewItem = () => {
  const [expanded, setExpansion] = useState(null)

  const toggleExpansion = () => {
    setExpansion(!expanded)
  }

  if(!expanded){
    return (
      <div>
        <button onClick={() => toggleExpansion()}>Lisää tuote</button>
      </div>
    )
  }
  return (
    <div>
      <button onClick={() => toggleExpansion()}>Peru tuote</button><br/>
      Nimi: tähän<br/>
      Määrä: tähän <br/>
      Lisätiedot: tähän <br/>
      <button>Lisää tuote listalle</button>


    </div>
  )
}

export default AddNewItem
