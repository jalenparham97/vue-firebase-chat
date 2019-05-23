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

  it('Creates a new message', () => {
    cy.get('input[name=chatInput]').type(message)
    cy.get('#chat-form').submit()
  })

  it('Should have active class', () => {
    cy.get(
      '[data-v-8ceea188=""][data-v-240ac9f2=""] > .ui > :nth-child(3)'
    ).click()
    cy.get(
      '[data-v-8ceea188=""][data-v-240ac9f2=""] > .ui > :nth-child(3)'
    ).should('have.class', 'active')
  })
})
