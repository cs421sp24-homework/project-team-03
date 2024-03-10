describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://cs421sp24-homework.github.io/project-team-03/')
    //randomly generated nodes 
    cy.get(':nth-child(4) > .border').click()
    cy.get('#email').type('testing@jhu.edu');
    cy.get('#password').type("1234567");
    cy.get('#firstName').type("1234567");
    cy.get('#lastName').type("1234567");
    cy.contains('Save').click();
    cy.contains('Registration Successful')
      .should('be.visible') // Asserts that the element is visible
      .and('contain', 'Registration Successful'); // Chained assertion
  })
})