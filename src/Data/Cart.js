export const getCart = () => 
  fetch('http://localhost:5000/cart')
  .then(cart => cart.json())

export const addToCart = (item) => 
  fetch('http://localhost:5000/cart', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(item),
  }).then(cart => cart)

export const removeFromCart = (id) =>
  fetch(`http://localhost:5000/cart/${id}`,{
    method: "DELETE",
  })
  .then(cart => cart)