import { generateRandomPassword, generateRandomName } from '../../support/helpers';

describe('Testing upvoting feature', () => {
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
    cy.verifyUser(randomEmail);
  });

  beforeEach(() => {
    cy.visit('/'); //visits base url from config file
    //just in case deployed website is down due to render, waits a minute
    //active check: at least 1 housing item shows up
    cy.get(':nth-child(1) > a > .p-5', { timeout: 60000 })
      .should('be.visible');
    cy.loginUser(randomEmail, randomPassword);
  });

  it('Create a review', () => {
    cy.get(':nth-child(1) > a > .p-5').click();
    cy.url().should('include', '/housings');
    //review dialog
    cy.get('#add-review').click();
    // Click the third star
    cy.get('.star-3').click(); 
    //type in content box
    cy.get('#content').type('This place looks alright!');
    //click okay button
    cy.get('#submit').click();
    cy.get('.ml-2');
    return
  });

  it('Create a second review', () => {
    cy.get(':nth-child(1) > a > .p-5').click();
    cy.url().should('include', '/housings');
    //review dialog
    cy.get('#add-review').click();
    // Click the third star
    cy.get('.star-3').click(); 
    //type in content box
    cy.get('#content').type('This place looks alright!');
    //click okay button
    cy.get('#submit').click();
    cy.get('.ml-2');
    return
  });

  it('Click on the upvote button of the second review and check that the count incremented by 1', () => {
    cy.get(':nth-child(1) > a > .p-5').click();
    cy.url().should('include', '/housings');
    // Select the second review's upvote button
    cy.get('.max-w').eq(2).find('#upvote-button').then(($button) => {
        let initialUpvoteCount = 0;

        if ($button.text().trim() !== '') {
            // Extract the initial upvote count from the button text
            initialUpvoteCount = parseInt($button.text().match(/\d+/)[0]);
        }

        // Click the upvote button
        cy.get($button).click();

        // Calculate the updated upvote count
        const updatedUpvoteCount = initialUpvoteCount + 1;

        // Verify that the button text contains the updated upvote count
        cy.get($button).should('contain', updatedUpvoteCount);
    });
  });

  it('Default sorting should be by recency', () => {
    cy.get(':nth-child(1) > a > .p-5').click();
    cy.url().should('include', '/housings');

    let timestampValue;
    let timestampValue2;

    // Wait for the first timestamp to be updated
    cy.get('.max-w').eq(2).find('#timestamp').should('not.have.text', '').then(($timestamp) => {
        timestampValue = $timestamp.text().trim();
    });

    // Wait for the second timestamp to be updated
    cy.get('.max-w').eq(3).find('#timestamp').should('not.have.text', '').then(($timestamp) => {
        timestampValue2 = $timestamp.text().trim();
    });

    // Retry the comparison until both timestamps are valid and the comparison can be made
    cy.wrap(null).should(() => {
        if (!timestampValue || !timestampValue2) {
            // If either timestamp is not available yet, retry until both are available
            throw new Error('Timestamp values are not available yet');
        }

        // Convert timestamp values to milliseconds since epoch
        const storedTimestamp = new Date(timestampValue).getTime();
        const storedTimestamp2 = new Date(timestampValue2).getTime();
        // Perform comparison
        expect(storedTimestamp).to.be.greaterThan(storedTimestamp2);
    });
});

  it('Sort by popularity', () => {
    cy.get(':nth-child(1) > a > .p-5').click();
    cy.url().should('include', '/housings');

    cy.get('#sort').select('popularity');

    cy.get('.max-w').eq(2).find('#upvote-button').should('contain', '1');
    cy.get('.max-w').eq(3).find('#upvote-button').should('contain', '');
    
  })

  it('Sort by popularity and then by recency', () => {
    cy.get(':nth-child(1) > a > .p-5').click();
    cy.url().should('include', '/housings');

    cy.get('#sort').select('popularity');
    cy.get('#sort').select('recency');

    let timestampValue;
    let timestampValue2;

    // Wait for the first timestamp to be updated
    cy.get('.max-w').eq(2).find('#timestamp').should('not.have.text', '').then(($timestamp) => {
        timestampValue = $timestamp.text().trim();
    });

    // Wait for the second timestamp to be updated
    cy.get('.max-w').eq(3).find('#timestamp').should('not.have.text', '').then(($timestamp) => {
        timestampValue2 = $timestamp.text().trim();
    });

    // Retry the comparison until both timestamps are valid and the comparison can be made
    cy.wrap(null).should(() => {
        if (!timestampValue || !timestampValue2) {
            // If either timestamp is not available yet, retry until both are available
            throw new Error('Timestamp values are not available yet');
        }

        // Convert timestamp values to milliseconds since epoch
        const storedTimestamp = new Date(timestampValue).getTime();
        const storedTimestamp2 = new Date(timestampValue2).getTime();
        // Perform comparison
        expect(storedTimestamp).to.be.greaterThan(storedTimestamp2);
    });
});




  it('Delete second review', () => {
    cy.get(':nth-child(1) > a > .p-5').click();
    cy.url().should('include', '/housings');
    //since the user created this review, it should see the review actions
    cy.get('#review-actions').should('exist');
    //delete the review
    cy.get('#review-actions').click();
    cy.get('#delete-review').click();
});

it('Delete first review', () => {
  cy.get(':nth-child(1) > a > .p-5').click();
  cy.url().should('include', '/housings');
  //since the user created this review, it should see the review actions
  cy.get('#review-actions').should('exist');
  //delete the review
  cy.get('#review-actions').click();
  cy.get('#delete-review').click();
});


  // Add more tests for other filter criteria as needed
});