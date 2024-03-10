const generateRandomPassword = (length = 8) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0; i < length; i++) {
      password += chars.charAt(Cypress._.random(0, chars.length - 1));
  }
  return password;
}

const generateRandomName = (length = 6) => {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  let name = '';
  for (let i = 0; i < length; i++) {
      name += letters.charAt(Cypress._.random(0, letters.length - 1));
  }
  return name;
}


describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://cs421sp24-homework.github.io/project-team-03/')
    const randomName = generateRandomName();
    const randomEmail = randomName + "@jhu.edu";
    const randomPassword = generateRandomPassword(10);
    //randomly generated nodes 
    cy.get(':nth-child(4) > .border').click()
    cy.get('#email').type(randomEmail);
    cy.get('#password').type(randomPassword);
    cy.get('#firstName').type(randomName);
    cy.get('#lastName').type(randomName);
    cy.contains('Save').click();
    cy.contains('EMILY', {timeout: 10000})
      .should('be.visible') // Asserts that the element is visible
      .and('contain', 'Registration Successful'); // Chained assertion
    cy.pause();
// maybe you can use the class selector on that div (div.toast-title.ng-star-inserted)
// default timeout is 6000
// increase it until it is caught by Cypress
  })
})