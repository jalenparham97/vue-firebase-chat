// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password, loginLink) => {
  if (loginLink) {
    cy.get('#login-link').click()
    cy.get('input[name=email]').type(email)
    cy.get('input[name=password]').type(password)
    cy.get('button[type=submit]').click()
  } else {
    cy.get('input[name=email]').type(email)
    cy.get('input[name=password]').type(password)
    cy.get('button[type=submit]').click()
  }
})

Cypress.Commands.add('signup', (displayName, email, password) => {
  cy.get('input[name=displayName]').type(displayName)
  cy.get('input[name=email]').type(email)
  cy.get('input[name=password]').type(password)
  cy.get('input[name=verifyPassword]').type(password)
  cy.get('button[type=submit]').click()
  cy.contains('Create a new Workspace')
})

Cypress.Commands.add('createChannel', channel => {
  cy.get('.channel-plus').click()
  cy.get('input[name=channelName]').type(channel.name)
  cy.get('input[name=channelDetails]').type(channel.details)
  cy.get('button[name=submit-btn]').click()
})

Cypress.Commands.add('joinWorkspace', workspaceName => {
  cy.get('input[name=workspaceName]').type(workspaceName)
  cy.get('form').submit()
})
