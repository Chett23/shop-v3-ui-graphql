export const getCart = () =>
  fetch('https://shop-v2-helio.herokuapp.com/cart')
    .then(cart => cart.json())

export const addToCart = (item) =>
  fetch('https://shop-v2-helio.herokuapp.com/cart', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  })
    .then(cart => cart)

export const removeFromCart = (id) =>
  fetch(`https://shop-v2-helio.herokuapp.com/cart/${id}`, {
    method: "DELETE",
  })
    .then(cart => cart)
