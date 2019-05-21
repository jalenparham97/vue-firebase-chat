import Chance from 'chance'
const chance = new Chance()

describe('Chat App Tests', () => {
  let displayName
  let email
  const password = 'abc123'

  beforeEach(() => {
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
    cy.login(userEmail, password)
    cy.contains('Join a Workspace')
  })

  it('Creates a new Workspace', () => {
    const workspaceName = chance.word({ length: 5 })
    cy.signup(displayName, email, password)
    cy.get('input[name=workspaceName]').type(workspaceName)
    cy.get('button[type=submit]').click()
    cy.contains(workspaceName)
  })

  it('Joins a new Workspace', () => {})
})
