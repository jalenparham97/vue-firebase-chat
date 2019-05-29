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

import firebase from '../../../src/db/firebase'
import db from '../../../src/db/db'

// UI Commands
Cypress.Commands.add('signout', () => {
  if (firebase.auth().currentUser) {
    firebase
      .auth()
      .signOut()
      .then(console.log('signed out'))
    firebase
      .auth()
      .currentUser.delete()
      .then(console.log('user deleted'))
  }
})

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
  if (email === '') {
    cy.get('input[name=displayName]').type(displayName)
    cy.get('input[name=password]').type(password)
    cy.get('input[name=verifyPassword]').type(password)
    cy.get('button[type=submit]').click()
  } else if (displayName === '') {
    cy.get('input[name=email]').type(email)
    cy.get('input[name=password]').type(password)
    cy.get('input[name=verifyPassword]').type(password)
    cy.get('button[type=submit]').click()
  } else if (password === '') {
    cy.get('input[name=displayName]').type(displayName)
    cy.get('input[name=email]').type(email)
    cy.get('button[type=submit]').click()
  } else {
    cy.get('input[name=displayName]').type(displayName)
    cy.get('input[name=email]').type(email)
    cy.get('input[name=password]').type(password)
    cy.get('input[name=verifyPassword]').type(password)
    cy.get('button[type=submit]').click()
  }
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

Cypress.Commands.add('createWorkspace', workspaceName => {
  cy.get('input[name=workspaceName]').type(workspaceName)
  cy.get('button[type=submit]').click()
})

// Firebase Commands
Cypress.Commands.add('resetDb', reset => {
  const workspacesRef = db.collection('workspaces')
  const usersRef = db.collection('users')

  if (reset === 'workspaces') {
    workspacesRef.get().then(snapShot => {
      snapShot.docs.forEach(workspace => {
        if (workspace.exists) {
          const channelsRef = db.collection(
            `workspaces/${workspace.id}/channels`
          )
          channelsRef.get().then(snapShot => {
            snapShot.docs.forEach(channel => {
              if (channel.exists) {
                channel.ref.delete()
                workspace.ref.delete()
              }
            })
            console.log('Reset: ', reset)
            console.log('workspaces data deleted')
          })
        }
      })
    })
  } else {
    workspacesRef.get().then(snapShot => {
      snapShot.docs.forEach(workspace => {
        if (workspace.exists) {
          const channelsRef = db.collection(
            `workspaces/${workspace.id}/channels`
          )
          channelsRef.get().then(snapShot => {
            snapShot.docs.forEach(channel => {
              if (channel.exists) {
                channel.ref.delete()
                const messagesRef = db.collection(
                  `workspaces/${workspace.id}/channels/${channel.id}/messages`
                )
                messagesRef.get().then(snapShot => {
                  snapShot.docs.forEach(message => {
                    if (message.exists) {
                      message.ref.delete()
                      workspace.ref.delete()
                    }
                  })
                })
              }
            })
            console.log('Reset: ', reset)
            console.log('workspaces data deleted')
          })
        }
      })
    })
  }

  usersRef.get().then(snapShot => {
    snapShot.forEach(user => {
      if (user.exists) {
        // user.ref.delete()
        const workspacesRef = db.collection(`users/${user.id}/workspaces`)
        workspacesRef.get().then(snapShot => {
          snapShot.docs.forEach(workspace => {
            if (workspace.exists) {
              user.ref.delete()
              workspace.ref.delete()
            }
          })
          console.log('Users data deleted')
        })
      }
    })
  })
})
