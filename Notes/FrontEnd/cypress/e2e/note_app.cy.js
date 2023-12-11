describe('Note App',() => {

  beforeEach(() => {
    cy.request('POST',`${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST',`${Cypress.env('BACKEND')}/users`,user)
    cy.visit('')
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

  it('login fails with wrong password',() => {
    cy.contains('log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain','wrong user name or password')
      .and('have.css','color','rgb(255, 0, 0)')
      .and('have.css','border-style','solid')
    cy.contains('Matti Luukkainen logged in').should('not.exist')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username :'mluukkai',password: 'salainen' })
    })
    it('a new note can be created',() => {
      cy.contains('Create a new note')
      cy.get('#new-note').type('a note created by cypress')
      cy.get('#save-button').click()
      cy.contains('a note created by cypress')
    })
    describe('and a note exists',() => {
      beforeEach(() => {
        cy.createNote({
          content : 'another note cypress',
          important : true
        })
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