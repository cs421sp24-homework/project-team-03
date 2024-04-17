import { generateRandomPassword, generateRandomName, generateRandomCost } from '../../support/helpers';


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
    cy.visit('/'); //visits base url from config file
    cy.registerUser(randomEmail, randomPassword, randomName, randomName); //register once
    cy.verifyUser(randomEmail);
  });

  beforeEach(() => {
    // Navigate to posts feed
    cy.visit('/'); //visits base url from config file
    cy.loginUser(randomEmail, randomPassword);
  });

  it('Feed loads when navigating to posts', () => {
    cy.get('#see-posts').click();
    cy.contains('I am looking for...').should('be.visible');
    cy.url().should('include', '/posts');
})

  it('Adds post successfully', () => {
    randomTitle = generateRandomName();
    randomContent = generateRandomName(12);
    randomAddress = generateRandomName(12);
    randomCost = generateRandomCost();

    cy.get('#see-posts').click();
    cy.get('#add-posts').click();

    cy.get('#type').select('Sublet');
    cy.get('#next').click({ force: true });

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
    randomTitle = generateRandomName();
    randomContent = generateRandomName(12);
    randomAddress = generateRandomName(12);
    randomCost = generateRandomCost();

    cy.get('#see-posts').click();
    cy.get('#add-posts').click();

    cy.get('#type').select('Sublet');
    cy.get('#next').click({ force: true });

    cy.get('#title').type(randomTitle);
    cy.get('#content').type(randomContent);
    cy.get('#cost').type(randomCost);
    cy.get('#address').type(randomAddress);
    cy.contains('Submit').click();

    cy.contains(randomTitle).should('be.visible');
    cy.contains(randomContent).should('be.visible');
    cy.contains(randomCost).should('exist');
    cy.contains(randomAddress).should('be.visible');

    cy.contains('Roommates')
      .next()
      .contains('No Posts to Show')
      .should('be.visible');

    cy.contains('Housing')
      .next()
      .contains('No Posts to Show')
      .should('be.visible');

      cy.contains('Subletting')
      .parent() 
      .find('#post')
      .should('exist'); 

  });

  it('correctly displays the posts with the search bar', () => {

    randomTitle = generateRandomName();
    randomContent = generateRandomName(12);
    randomAddress = generateRandomName(12);
    randomCost = generateRandomCost();

    cy.get('#see-posts').click();
    cy.get('#add-posts').click();

    cy.get('#type').select('Sublet');
    cy.get('#next').click({ force: true });

    cy.get('#title').type(randomTitle);
    cy.get('#content').type(randomContent);
    cy.get('#cost').type(randomCost);
    cy.get('#address').type(randomAddress);
    cy.contains('Submit').click();

    cy.contains(randomTitle).should('be.visible');
    cy.contains(randomContent).should('be.visible');
    cy.contains(randomCost).should('exist');
    cy.contains(randomAddress).should('be.visible');

    cy.get('#search-bar').type(randomTitle);
    cy.contains(randomTitle).should('be.visible');


  });

});

  

  // Add more tests for other filter criteria as needed
