import React, {useState} from "react"

const Item = (props) => {
  const [expanded, setExpansion] = useState(null)

  const toggleExpansion = () =>{
    setExpansion(!expanded)
  }

  const showItemDetails = () => {
    if (!expanded){
      return (
        <div>{props.item.itemName} {props.item.itemAmount}<button onClick={toggleExpansion}>Auki</button></div>

      )
    }
    return (
      <div>
        <div>{props.item.itemName} {props.item.itemAmount}<button onClick={toggleExpansion}>Kiinni</button></div>
        <div>{props.item.itemNote}</div>
      </div>
    )
  }

  console.log(props)

  return(
    <div>{showItemDetails()}</div>
  )
}
export default Item
