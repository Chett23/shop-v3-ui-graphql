export const login = (credentials) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8080/login`, {
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
  fetch(`http://localhost:8080/login/create`, {
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
  fetch("http://localhost:8080/users")
    .then(items => {
      return items.json()
    }).catch((err) => {
      return err
    })

export const RemoveUser = (id) =>
  fetch(`http://localhost:8080/users/${id}`, {
    method: "DELETE"
  })
    .then(users => users)

export const changePass = (user) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8080/login/users/password-reset`, {
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