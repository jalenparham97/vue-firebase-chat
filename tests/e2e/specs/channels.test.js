/// <reference types="Cypress" />

import Chance from 'chance'
const chance = new Chance()

describe('Channels and Messages Tests', () => {
  let channel
  const message = chance.sentence({ words: 5 })
  const workspaceName = 'Chat'
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
  })

  it('Creates a new channel', () => {
    cy.joinWorkspace(workspaceName)
    cy.createChannel(channel)
  })

  it('Creates a new message', () => {
    cy.joinWorkspace(workspaceName)
    cy.get('input[name=chatInput]').type(message)
    cy.get('#chat-form').submit()
  })
})
