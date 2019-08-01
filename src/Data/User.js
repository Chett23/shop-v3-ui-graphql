export const login = (credentials) => new Promise((resolve, reject) => {
  fetch(`https://shop-v2-helio.herokuapp.com/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials),
  })
    .then(user => {
      resolve(user.json())
    }).catch(err => {
      console.log(err)
      reject(err)
    })
})

export const createUser = (user) => new Promise((resolve, reject) => {
  fetch(`https://shop-v2-helio.herokuapp.com/login/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(user),
  })
    .then(user => {
      resolve(user.json())
    }).catch(err => {
      reject(err)
    })
})

export const getUsers = () =>
  fetch("https://shop-v2-helio.herokuapp.com/users")
    .then(items => {
      return items.json()
    }).catch((err) => {
      return err
    })

export const RemoveUser = (id) =>
  fetch(`https://shop-v2-helio.herokuapp.com/users/${id}`, {
    method: "DELETE"
  })
    .then(users => users)

export const changePass = (user) => new Promise((resolve, reject) => {
  fetch(`https://shop-v2-helio.herokuapp.com/login/users/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(user),
  })
    .then(user => {
      resolve(user.json())
    }).catch(err => {
      reject(err)
    })
})