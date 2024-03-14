import { generateRandomName, generateRandomPassword } from "./user-register-login-spec.cy";

const generateRandomPrice = (length = 4) => {
  const numbers = '123456789';
  let cost = '';
  for (let i = 0; i < length; i++) {
      cost += numbers.charAt(Cypress._.random(0, numbers.length - 1));
  }
  return cost;
}

describe('Testing post filtering feature', () => {
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
    // Navigate to posts feed
    cy.visit('/'); //visits base url from config file
    // cy.registerUser(randomEmail, randomPassword, randomName, randomName);
    // cy.loginUser(randomEmail, randomPassword);
  });

  it('Filters items by price', () => {
    cy.loginUserByRef(randomEmail, randomPassword);
    // Apply filter for location
    cy.get('#filter-button').click();
    cy.get('#price').select('$');
    cy.contains('Submit').click();

      // Verify that only posts with selected location are displayed
      cy.get('#price-tag').each(($housingItem) => {
        // Within each post-footer
        cy.wrap($housingItem).within(() => {
          // Check for the type
          cy.contains('$').should('exist');
        });
      });
  });

  it('Filters items by distance', () => {
    cy.loginUserByRef(randomEmail, randomPassword);
    // Apply filter for location
    cy.get('#filter-button').click();
    const price = generateRandomPrice();
    cy.get('#distance').type(price);
    cy.contains('Submit').click();

    // Verify that only posts with selected location are displayed
    cy.get('#distance-tag').each(($housingItem) => {
      cy.wrap($housingItem).within(() => {
        // Get the text containing the cost value
          // Extract and parse the cost value from the text
          expect(Number(price)).to.be.lessThan(Number(price));
      });
    });
  });

  it('Search-bar for posts', () => {
    cy.loginUserByRef(randomEmail, randomPassword);
    cy.get('#username').type(randomName);
    cy.get('#housing-name').each(($housingItem) => {
      // Within each post-footer
      cy.wrap($housingItem).within(() => {
        // Check for the type
        cy.contains(randomName).should('be.visible');
      });
    });
  });

  // Add more tests for other filter criteria as needed
});