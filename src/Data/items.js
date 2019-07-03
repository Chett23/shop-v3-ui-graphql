export const getItems = () => 
  fetch("http://localhost:8080/items")
  .then(items => {
    return items.json()
  }).catch((err) => {
    return err
  })

export const addToInventory = (item) => 
  fetch('http://localhost:8080/items', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(item),
  }).then(inventory => inventory)

export const RemoveFromInventory = (id) =>
  fetch(`http://localhost:8080/items/${id}`,{
  method: "DELETE"
  })
  .then(inventory => inventory)