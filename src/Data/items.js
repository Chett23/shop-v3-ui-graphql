export const getItems = () => 
  fetch("http://shop-v2-helio.herokuapp.com/items")
  .then(items => {
    return items.json()
  }).catch((err) => {
    return err
  })

export const addToInventory = (item) => 
  fetch('http://shop-v2-helio.herokuapp.com/items', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(item),
  }).then(inventory => inventory)

export const RemoveFromInventory = (id) =>
  fetch(`http://shop-v2-helio.herokuapp.com/items/${id}`,{
  method: "DELETE"
  })
  .then(inventory => inventory)