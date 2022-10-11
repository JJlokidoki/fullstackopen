// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('Auth', ({ username, name, password }) => {
  cy.request('POST', 'http://localhost:3003/api/users/auth', { username, name, password })
})

Cypress.Commands.add('Login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/users/login', { username, password })
    .then( ({ body}) => {
      localStorage.setItem('user', JSON.stringify(body))
    })
})

Cypress.Commands.add('CreateBlog', ({ title, author, url, likes }) => {
  const token = JSON.parse(localStorage.getItem('user')).token
  const options = {
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    headers: {
      authorization: 'Baerer ' + token
    },
    body: { title, author, url, likes }
  }
  cy.request(options)
  cy.reload()
})