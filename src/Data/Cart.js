export const getCart = () => 
  fetch('http://shop-v2-helio.herokuapp.com/cart')
  .then(cart => cart.json())

export const addToCart = (item) => 
  fetch('http://shop-v2-helio.herokuapp.com/cart', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(item),
  })
  .then(cart => cart)

export const removeFromCart = (id) =>
  fetch(`http://shop-v2-helio.herokuapp.com/cart/${id}`,{
    method: "DELETE",
  })
  .then(cart => cart)