import React, {useState} from "react"

const Item = (props) => {
  const [expanded, setExpansion] = useState(null)
  const [onCart, pickUp] = useState(null)

  const toggleExpansion = () =>{
    setExpansion(!expanded)
  }

  const togglePickUp = () => {
    pickUp(!onCart)
  }

  console.log(props)

  const editPage = "editItem"

  const showItemDetails = () => {
    if (props.open===true){
      return  <div>
                <div>{props.item.itemName} {props.item.itemAmount}
                  <button>Poista</button>
                  <button onClick={() =>{
                    {props.selectPageProperties(props.item)}
                    {props.selectSender(props.curSender)}
                    {props.selectPage(editPage)}


                  }
                  }>Muokkaa</button>
                </div>

                <div>{props.item.itemNote}</div>
              </div>
    }

    if (!props.item.itemNote){
      if(onCart) {
        return <div><s>{props.item.itemName} {props.item.itemAmount}</s><button onClick={togglePickUp}>Poista korista</button></div>
      }
      return (<div>{props.item.itemName} {props.item.itemAmount}<button onClick={togglePickUp}>Lisää koriin</button></div>)
    }

    if (!expanded){
      if(onCart) {
        return <div><s>{props.item.itemName} {props.item.itemAmount}</s><button onClick={toggleExpansion}>Auki</button><button onClick={togglePickUp}>Poista korista</button></div>
      }
      return (<div>{props.item.itemName} {props.item.itemAmount}<button onClick={toggleExpansion}>Auki</button><button onClick={togglePickUp}>Lisää koriin</button></div>)

    } else {
      if(onCart) {
        return (
          <div>
            <div><s>{props.item.itemName} {props.item.itemAmount}</s><button onClick={toggleExpansion}>Kiinni</button><button onClick={togglePickUp}>Poista korista</button></div>
            <div>{props.item.itemNote}</div>
          </div>
        )
      }
      return (
        <div>
          <div>{props.item.itemName} {props.item.itemAmount}<button onClick={toggleExpansion}>Kiinni</button><button onClick={togglePickUp}>Lisää koriin</button></div>
          <div>{props.item.itemNote}</div>
        </div>
      )
    }




  }

  //console.log(props)

  return(
    <div>{showItemDetails()}</div>
  )
}
export default Item
