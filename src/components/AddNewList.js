import React, {useState} from "react"

const AddNewList = () => {
  const [expanded, setExpansion] = useState(null)

  const toggleExpansion = () => {
    setExpansion(!expanded)
  }

  if (!expanded){
    return  <div>
              <button onClick={()=>toggleExpansion()}>Lisää lista</button>
            </div>
  }
  return(
    <div>
      <button onClick={() => toggleExpansion()}>Peru lista</button><br/>
      Tähän listään listan nimi <button>Tallenna lista</button>
    </div>

  )
}

export default AddNewList
