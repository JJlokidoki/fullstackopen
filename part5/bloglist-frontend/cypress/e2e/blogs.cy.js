describe('When logged in', function() {
  const blog = {
    title: 'title', 
    author: 'author', 
    url: 'url'
  }
  let user
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    user = {
      username: 'testUsername',
      name: 'testName',
      password: 'testPassword'
    }
    cy.Auth(user)
    cy.Login(user)
    cy.visit('http://localhost:3000')
  })

  it('A blog can be created', function() {
    cy.contains('create blog').click()
    cy.get('.blogForm').should('be.visible')
    cy.get('#title').type('testTitle')
    cy.get('#author').type('testAuthor')
    cy.get('#url').type('testUrl')
    cy.get('.blogForm').contains('create').click()
    cy.get('.blogForm').should('not.be.visible')
    cy.get('.success')
      .contains('a new blog testTitle by testAuthor added')
      .should('have.css', 'color', 'rgb(0, 128, 0)')
    cy.get('.blog').should('have.length', 1)
  })

  it('A blog can be liked', function() {
    cy.CreateBlog(blog)
    cy.get('.collapsed').contains('view').click()
    cy.get('.likes').contains('0')
    cy.get('.expanded').contains('like').click()
    cy.get('.likes').contains('1')
  })

  it('A blog can be deleted', function() {
    cy.CreateBlog(blog)
    cy.get('.collapsed').contains('view').click()
    cy.get('.expanded').contains('remove').click()
    cy.on('window:confirm', () => true)
    cy.get('.blog').should('have.length', 0)
  })

  it('Proper blogs ordering by likes', function() {
    const thirdBlog = { ...blog, likes: 1, title: 'third' }
    cy.CreateBlog(thirdBlog)
    const secondBlog = { ...blog, likes: 2, title: 'second' }
    cy.CreateBlog(secondBlog)
    const firstBlog = { ...blog, likes: 3, title: 'first' }
    cy.CreateBlog(firstBlog)
    cy.get('.blog').eq(0).should('contain', 'first')
    cy.get('.blog').eq(1).should('contain', 'second')
    cy.get('.blog').eq(2).should('contain', 'third')
    cy.get('.blog').eq(1).contains('view').click()
    cy.get('.blog').eq(1).contains('like').click()
    cy.wait(300)
    cy.get('.blog').eq(1).contains('like').click()
    cy.wait(300)
    cy.get('.blog').eq(0).should('contain', 'second')
    cy.get('.blog').eq(1).should('contain', 'first')
  })

})