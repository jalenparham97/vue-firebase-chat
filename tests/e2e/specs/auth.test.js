/// <reference types="Cypress" />

import Chance from 'chance'
const chance = new Chance()

describe('Authentication Tests', () => {
  let displayName = chance.name()
  let email = chance.email()
  const password = 'abc123'
  const loginLink = true

  beforeEach(() => {
    cy.resetDb()
    cy.clearLocalStorage()
    cy.visit('/')
  })

  context('Route Guards', () => {
    it('route gaurd to signup page', () => {
      cy.url().should('include', 'signup')
    })
  })

  context('Login / Signup Flow', () => {
    it('signs up a new user', () => {
      cy.signup(displayName, email, password)
      cy.contains('Create a new Workspace')
    })

    it('logs in an existing user', () => {
      cy.login(email, password, loginLink)
      cy.contains('Join a Workspace')
    })
  })

  context('Error Handling', () => {
    it('should give required displayName error', () => {
      cy.signup('', email, password)
      cy.get(':nth-child(1) > span').should('be.visible')
    })

    it('should give required email error', () => {
      cy.signup(displayName, '', password)
      cy.get(':nth-child(2) > span').should('be.visible')
    })

    it('should give required password error', () => {
      cy.signup(displayName, email, '')
      cy.get(':nth-child(3) > span').should('be.visible')
    })

    it('should give passwords do not match error', () => {
      cy.get('input[name=displayName]').type(displayName)
      cy.get('input[name=email]').type(email)
      cy.get('input[name=password]').type(password)
      cy.get('input[name=verifyPassword]').type('abc')
      cy.get(':nth-child(4) > span').should('be.visible')
      cy.get(':nth-child(4) > span').should('contain', 'Passwords do not match')
    })

    it('should give errors for empty form', () => {
      cy.get('button[type=submit]').click()
      cy.get(':nth-child(1) > span').should('be.visible')
      cy.get(':nth-child(2) > span').should('be.visible')
      cy.get(':nth-child(3) > span').should('be.visible')
    })

    it('should show warning message for existing user', () => {
      cy.signup(displayName, email, password)
      cy.get('.warning').should('be.visible')
      cy.signout()
    })
  })
})
