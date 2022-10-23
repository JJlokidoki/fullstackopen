describe('Login form', function() {
  let user
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    user = {
      username: 'testUsername',
      name: 'testName',
      password: 'testPassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/auth', user)
  })

  it('Login form is shown', function() {
    cy.get('#root')
      .contains('log in to application')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.contains('Login').click()
      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrong')
      cy.contains('Login').click()
      cy.get('.error')
        .contains('Invalid user or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

})