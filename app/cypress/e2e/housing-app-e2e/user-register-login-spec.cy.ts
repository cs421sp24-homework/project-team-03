export const generateRandomPassword = (length = 8) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0; i < length; i++) {
      password += chars.charAt(Cypress._.random(0, chars.length - 1));
  }
  return password;
}

export const generateRandomName = (length = 6) => {
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
  let incorrectEmail;
  let incorrectPassword;

  before(() => {
    // Generate the credentials before all tests run
    randomName = generateRandomName();
    randomEmail = randomName + "@jhu.edu";
    randomPassword = generateRandomPassword(10);
    incorrectPassword = generateRandomPassword(7);
    incorrectEmail = randomName + "@gmail.com";
  });

  beforeEach(() => {
    cy.visit('/'); //visits base url from config file
    //just in case deployed website is down due to render, waits a minute
    //active check: at least 1 housing item shows up
    cy.get(':nth-child(1) > a > .p-5', { timeout: 60000 })
      .should('be.visible');
  });

  it('user registration fails with a password less than 8 characters', () => {
    cy.registerUser(randomEmail, incorrectPassword, randomName, randomName);
    //assert that a failure registration toast pops up
    cy.get('#toast', { timeout: 1000 })
      .should('exist')
      .contains(/failed to register/i);
  });

  it('user registration fails with a non @jhu.edu email', () => {
    cy.registerUser(incorrectEmail, randomPassword, randomName, randomName);
    //assert that a failure registration toast pops up
    cy.get('#toast', { timeout: 1000 })
      .should('exist')
      .contains(/failed to register/i);
  });

  it('allows a user to register with proper credentials', () => {
    cy.registerUser(randomEmail, randomPassword, randomName, randomName);
    //assert that a successful registration toast pops up
    cy.get('#toast', { timeout: 1000 })
      .should('exist')
      .contains(/registration successful/i);
  });

  it('allows a user to log in with proper credentials', () => {
    cy.loginUser(randomEmail, randomPassword);
    //assert that the red 'logout' button pops up
    cy.get(':nth-child(4) > .inline-flex').should('be.visible');
    cy.wait(5000); // Waits in milliseconds
    //check that the user page shows the proper user details
    cy.visit(`/#/users/${randomName}`);
    cy.get('.pt-10 > .flex > div').should('have.text', `${randomName} ${randomName}`);
  });
})