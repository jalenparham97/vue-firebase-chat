/// <reference types="Cypress" />

import Chance from 'chance'
const chance = new Chance()

describe('Channels and Messages Tests', () => {
  let channel
  const message = chance.sentence({ words: 5 })
  const workspaceName = 'Borne'
  const email = 'jborne@gmail.com'
  const password = 'abc123'
  const loginLink = false

  beforeEach(() => {
    cy.visit('/login')
    cy.login(email, password, loginLink)
    channel = {
      name: chance.word({ length: 5 }),
      details: chance.sentence({ words: 5 })
    }
    cy.joinWorkspace(workspaceName)
  })

  it('Creates a new channel', () => {
    cy.createChannel(channel)
  })

  it('Channel should have active class', () => {
    cy.get(
      '#app > section > div > div.sidebar-container > div.sidebar > div:nth-child(3) > div > div:nth-child(3)'
    ).click()
    cy.get(
      '#app > section > div > div.sidebar-container > div.sidebar > div:nth-child(3) > div > div:nth-child(3)'
    ).should('have.class', 'active')
  })

  it('Creates a new message', () => {
    cy.get('input[name=chatInput]').type(message)
    cy.get('#chat-form').submit()
  })
})
