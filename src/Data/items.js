export const getItems = () => 
  fetch("http://localhost:5000/items")
  .then(items => {
    return items.json()
  }).catch((err) => {
    return err
  })