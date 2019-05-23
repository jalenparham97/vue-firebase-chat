/// <reference types="Cypress" />

import Chance from 'chance'
const chance = new Chance()

describe('Workspaces Tests', () => {
  let displayName
  let email
  const password = 'abc123'
  const userEmail = 'jborne@gmail.com'
  const workspaceName = chance.word({ length: 5 })
  const loginLink = true

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
    displayName = chance.name()
    email = chance.email()
  })

  it('Creates a new Workspace', () => {
    cy.signup(displayName, email, password)
    cy.get('input[name=workspaceName]').type(workspaceName)
    cy.get('button[type=submit]').click()
    cy.contains(workspaceName)
  })

  it('Joins a new Workspace', () => {
    cy.login(userEmail, password, loginLink)
    cy.joinWorkspace(workspaceName)
    cy.get('.sidebar')
      .find('h3')
      .should($h3 => {
        expect($h3).to.have.length(1)
        expect($h3).to.contain(workspaceName)
      })
  })

  it('Changes workspace', () => {
    cy.login(userEmail, password, loginLink)
    cy.joinWorkspace(workspaceName)
    cy.get('div.search > .ml-3').click()
    cy.get('.sidebar > .middle > :nth-child(2) > .content').click()
    cy.get('.sidebar > h3').should('not.contain', workspaceName)
  })
})
