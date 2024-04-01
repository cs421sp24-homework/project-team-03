import { generateRandomPassword, generateRandomName } from '../../support/helpers';

describe('Testing catalog filtering feature', () => {
  let randomName;
  let randomEmail;
  let randomPassword;

  before(() => {
    // Generate the credentials before all tests run
    //must have TELEPHONE BUILDING in catalog to work
    randomName = generateRandomName();
    randomEmail = randomName + "@jhu.edu";
    randomPassword = generateRandomPassword(10);
    cy.visit('/'); //visits base url from config file
    cy.registerUser(randomEmail, randomPassword, randomName, randomName);
    cy.verifyUser(randomEmail, "000000");
  });

  beforeEach(() => {
    // Navigate to posts feed
    cy.visit('/'); //visits base url from config file
    cy.loginUser(randomEmail, randomPassword);
  });

  it('Filters housing items by price', () => {
    // Apply filter for location
    cy.get('#filter-button').click();
    cy.get('#price').select('$$$');
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

  it('Filters housing items by distance', () => {
    // Apply filter for location
    cy.get('#filter-button').click();
    cy.get('#distance').type('0.6');
    cy.contains('Submit').click();

    // Verify that only posts with selected location are displayed
    cy.get('#distance-tag > span').invoke('text').then((text) => {
      // Extract the number using a regular expression
      const numberPattern = /\d+/; // This pattern matches one or more digits
      const number = numberPattern.exec(text)[0];
    
      // Convert the extracted string to a number
      const distance = parseInt(number);
    
      // Now you can use 'distance' in your test
      // For example, you might want to assert that it's a specific value
      cy.wrap(distance).should('be.gte', 0); // Example assertion
    });
    
    cy.get('#distance-tag').each(($housingItem) => {
      cy.wrap($housingItem).within(() => {
        // Get the span containing the distance and extract the text
        cy.get('span').invoke('text').then((text) => {
          // Use regex to extract the first floating-point number from the text
          const distanceMatch = text.match(/[\d.]+/);
    
          // Ensure a match was found and parse it into a floating-point number
          if (distanceMatch) {
            const distance = parseFloat(distanceMatch[0]);
            // Assert that the distance is less than or equal to the expected maximum
            expect(distance).to.be.lte(.6); // Assuming max distance is 1 mile
          } else {
            // If no match was found, throw an error or fail the test
            throw new Error('Distance not found in the element text');
          }
        });
      });
    });    
  });

  it('Search-bar for housing item', () => {
    cy.get('#search-bar').type("Telephone");
    cy.get('#housing-name').each(($housingItem) => {
      // Within each post-footer
      cy.wrap($housingItem).within(() => {
        // Check for the type
        cy.contains("Telephone").should('be.visible');
      });
    });
  });

  // Add more tests for other filter criteria as needed
});