/// <reference types="Cypress" />

import Chance from 'chance'
const chance = new Chance()

describe('Workspaces Tests', () => {
  const displayName = chance.name()
  const email = chance.email()
  const password = 'abc123'
  const workspaceName = chance.word({ length: 5 })
  const reset = 'workspaces'
  const loginLink = true

  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it('Creates a new Workspace', () => {
    cy.visit('/')
    cy.signup(displayName, email, password)
    cy.createWorkspace(workspaceName)
    cy.contains(workspaceName)
  })

  it('Joins a new Workspace', () => {
    cy.visit('/')
    cy.login(email, password, loginLink)
    cy.joinWorkspace(workspaceName)
    cy.get('.sidebar')
      .find('h3')
      .should($h3 => {
        expect($h3).to.have.length(1)
        expect($h3).to.contain(workspaceName)
      })
  })

  it('Changes workspace', () => {
    const newWorkspaceName = chance.word({ length: 5 })
    cy.login(email, password, loginLink)
    // cy.visit('/new/workspace')
    cy.createWorkspace(newWorkspaceName)
    cy.get('div.search > .ml-3').click()
    cy.get('.sidebar > .middle > .item > .content').click()
    cy.get('.sidebar > h3').should('not.contain', newWorkspaceName)
    cy.signout()
    cy.resetDb(reset)
  })
})
