const generateRandomCost = (length = 4) => {
  const numbers = '123456789';
  let cost = '';
  for (let i = 0; i < length; i++) {
      cost += numbers.charAt(Cypress._.random(0, numbers.length - 1));
  }
  return cost;
}

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

describe('Testing post filtering feature', () => {
  let randomName;
  let randomEmail;
  let randomPassword;
  let randomTitle;
  let randomContent;
  let randomAddress;
  let randomCost;

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

  it('Feed loads when navigating to posts', () => {
    cy.registerUserByRef(randomEmail, randomPassword, randomName, randomName);
    cy.loginUserByRef(randomEmail, randomPassword);
    cy.get('#see-posts').click();
    cy.contains('Community Posts').should('be.visible');
    cy.url().should('include', '/posts');
})

  it('Adds post successfully', () => {
    cy.loginUserByRef(randomEmail, randomPassword);
    randomTitle = generateRandomName();
    randomContent = generateRandomName(12);
    randomAddress = generateRandomName(12);
    randomCost = generateRandomCost();

    cy.get('#see-posts').click();
    cy.get('#add-post-button').click();

    cy.get('#type').select('Roommate');
    cy.get('#title').type(randomTitle);
    cy.get('#content').type(randomContent);
    cy.get('#cost').type(randomCost);
    cy.get('#address').type(randomAddress);
    cy.contains('Submit').click();

    cy.contains(randomTitle).should('be.visible');
    cy.contains(randomContent).should('be.visible');
    cy.contains(randomCost).should('exist');
    cy.contains(randomAddress).should('be.visible');
})


  it('Filters posts by type', () => {
    cy.loginUserByRef(randomEmail, randomPassword);
    cy.get('#see-posts').click();
    // Apply filter for location
    cy.get('#filter-button').click();
    cy.get('#type').select('Roommate');
    cy.contains('Submit').click();

      // Verify that only posts with selected location are displayed
      cy.get('#post-footer').each(($postFooter) => {
        // Within each post-footer
        cy.wrap($postFooter).within(() => {
          // Check for the type
          cy.contains('Type: Roommate').should('exist');
        });
      });
  });

  it('Filters posts by type', () => {
    cy.loginUserByRef(randomEmail, randomPassword);
    cy.get('#see-posts').click();
    // Apply filter for location
    cy.get('#filter-button').click();
    cy.get('#maxCost').type(randomCost);
    cy.contains('Submit').click();

    // Verify that only posts with selected location are displayed
    cy.get('#post-footer').each(($postFooter) => {
      cy.wrap($postFooter).within(() => {
        // Get the text containing the cost value
        cy.get('.mr-4').contains('Cost:').invoke('text').then((costText) => {
          // Extract and parse the cost value from the text
          const cost = Number(costText.replace('Cost: $', '').trim());
          expect(cost).to.be.greaterThan(0);
        });
      });
    });
  });

  it('Search-bar for posts', () => {
    cy.loginUserByRef(randomEmail, randomPassword);
    cy.get('#see-posts').click();
    cy.get('#username').type(randomName);
    cy.get('#username-area').each(($postFooter) => {
      // Within each post-footer
      cy.wrap($postFooter).within(() => {
        // Check for the type
        cy.contains(randomName).should('be.visible');
      });
    });
  });

  // Add more tests for other filter criteria as needed
});
