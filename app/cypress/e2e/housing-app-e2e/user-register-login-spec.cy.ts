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


describe('user register + login', () => {
  let randomName;
  let randomEmail;
  let randomPassword;

  before(() => {
    // Generate the credentials before all tests run
    randomName = generateRandomName();
    randomEmail = randomName + "@jhu.edu";
    randomPassword = generateRandomPassword(10);
  });

  beforeEach(() => {
    cy.visit('http://localhost:5173/project-team-03/');
    cy.get(':nth-child(1) > a > .p-5', { timeout: 60000 })
      .should('be.visible');
  });

  it('allows a user to register with proper credentials', function() {
    //click the register button
    cy.get(':nth-child(4) > .border').click();
    // enter in information into register dialog
    cy.get('#email').type(randomEmail);
    cy.get('#password').type(randomPassword);
    cy.get('#firstName').type(randomName);
    cy.get('#lastName').type(randomName);
    cy.contains('Save').click();
    //assert that a successful registration toast pops up
    cy.get('#toast', { timeout: 1000 })
      .should('exist')
      .contains(/registration successful/i);
  });

  it('allows a user to log in with proper credentials', function(){
      //click the login button 
    cy.get(':nth-child(4) > .bg-primary').click();
    // Enter login credentials
    cy.get('#email').type(randomEmail);
    cy.get('#password').type(randomPassword);
    cy.get('#login').click();
    //assert that the red 'logout' button pops up
    cy.get(':nth-child(4) > .inline-flex').should('be.visible');
  });
  
})