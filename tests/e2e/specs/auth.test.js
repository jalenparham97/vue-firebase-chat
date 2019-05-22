/// <reference types="Cypress" />

import Chance from 'chance'
const chance = new Chance()

describe('Authentication Tests', () => {
  let displayName
  let email
  const password = 'abc123'
  const loginLink = true

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
    displayName = chance.name()
    email = chance.email()
  })

  it('route gaurd to signup page', () => {
    cy.url().should('include', 'signup')
  })

  it('signs up a new user', () => {
    cy.signup(displayName, email, password)
  })

  it('logs in an existing user', () => {
    const userEmail = 'jborne@gmail.com'
    cy.login(userEmail, password, loginLink)
    cy.contains('Join a Workspace')
  })
})
