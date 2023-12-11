describe('Note App',() => {

  beforeEach(() => {
    cy.request('POST','http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST','http://localhost:3001/api/users',user)
    cy.visit('http://localhost:5173/')
  })

  it('Front page can be opened', () => {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('Log in form can be opened',() => {
    cy.contains('log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
    cy.contains('Matti Luukkainen logged in')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })
    it('a new note can be created',() => {
      cy.contains('Create a new note')
      cy.get('#new-note').type('a note created by cypress')
      cy.get('#save-button').click()
      cy.contains('a note created by cypress')
    })
    describe('and a note exists',() => {
      beforeEach(() => {
        cy.contains('Create a new note')
        cy.get('#new-note').type('another note cypress')
        cy.get('#save-button').click()
      })
      it('it can be made not important', () => {
        cy.contains('another note cypress')
          .contains('make not important')
          .click()
        cy.contains('another note cypress')
          .contains('make important')
      })
    })
  })
})