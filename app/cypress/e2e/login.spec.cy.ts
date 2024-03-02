describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://cs421sp24-homework.github.io/project-team-03/')
  })
})

// login.spec.cy.ts
describe('Login Test', () => {
  it('successfully logs in', () => {
    cy.visit('https://cs421sp24-homework.github.io/project-team-03/')
    // Visit the login page
    cy.get(':nth-child(3) > .bg-primary').click
    cy.get(':nth-child(3) > .bg-primary').dblclick() // Double click on button

  // Wait for the dialog box to be visible
  cy.get('.dialog-box-selector').should('be.visible');

  // Type into input fields in the dialog box
  cy.get('.dialog-box-selector input[name="username"]').type('myusername');
  cy.get('.dialog-box-selector input[name="password"]').type('mypassword');

  // Click the submit button in the dialog box
  cy.get('.dialog-box-selector button[type="submit"]').click();

  // Add your assertions here
  cy.get('.success-message').should('be.visible');
    // Fill in the login credentials
    cy.get('input[name=email]').type('user@example.com'); // Use the selector for your email input
    cy.get('input[name=password]').type('userpassword'); // Use the selector for your password input

    // Submit the login form
    cy.get('form').submit(); // Use the selector for your form

    // Assert that the login was successful
    // This should be an element or a URL change that indicates a successful login
    cy.url().should('include', '/dashboard'); // Update with the path you expect upon successful login
    // You can also check for the existence of a logout button, a welcome message, etc.
    cy.get('button').contains('Logout'); // Update with the selector for an element unique to a logged-in state
  });
});
