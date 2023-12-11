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
    describe('and several notes exist',() => {
      beforeEach(() => {
        cy.createNote({ content : 'first note',important : false })
        cy.createNote({ content : 'second note',important : false })
        cy.createNote({ content : 'third note',important : false })
      })
      it('one of those can be made important', () => {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain','make not important')
      })
    })
  })
})