import React, {useState} from "react"
import Item from "./Item"

const ShoppingList = (props) => {
  const [expanded, setExpansion] = useState(null)

  const toggleExpansion = () => {
    setExpansion(!expanded)
  }

  const listMembers = props.shoppingList.listMembers.map(m => m.username)
  console.log(listMembers)

  const showItems = () => {
    if (expanded){
      return (
        <div>
        {props.shoppingList.listName}
        <button onClick={toggleExpansion}>Sulje</button>
        <button>Editoi listaa</button>
        <button>Lisää Tuote</button>
        <div>
        <div>
          {
            listMembers.length >1 ?
            <div>Listan käyttäjät:
              {listMembers.map((member, index) => ( (index ? ', ': '') + member ))}
            </div>
            : null
          }
        </div>
        {props.shoppingList.items.map( item =>
          <div key={item.id}>
            <Item item={item}/>
          </div>
        )}
        </div>
        <button>Päivitä poimitut tuottet</button>
        </div>
      )
    }
    return (
      <div>
        {props.shoppingList.listName} <button onClick={toggleExpansion}>Laajenna</button>
      </div>
    )
  }

  return(
    <div>{showItems()}</div>
  )
}

export default ShoppingList
