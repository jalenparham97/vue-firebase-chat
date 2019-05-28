/// <reference types="Cypress" />

describe('Api Database Testing', () => {
  beforeEach(() => cy.resetDb())

  describe('comments', () => {
    it('should get comments from typicode api', () => {
      cy.request('https://jsonplaceholder.typicode.com/comments').then(
        response => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.length(500)
          expect(response).to.have.property('headers')
          expect(response).to.have.property('duration')
        }
      )
    })
  })

  describe('Firestore Operations', () => {})
})
