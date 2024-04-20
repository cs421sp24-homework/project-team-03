import { generateRandomPassword, generateRandomName, generateRandomCost } from '../../support/helpers';

describe('test post functionality', () => {
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
        cy.registerUser(randomEmail, randomPassword, randomName, randomName);
        cy.verifyUser(randomEmail);
    })

    beforeEach(() => {
        cy.visit('/');
        cy.contains('Off-Campus Housing').should('be.visible');
        randomTitle = generateRandomName();
        randomContent = generateRandomName(12);
        randomAddress = generateRandomName(12);
        randomCost = generateRandomCost();
        cy.loginUser(randomEmail, randomPassword);
    });


    it('Feed loads when navigating to posts', () => {
        cy.get('#see-posts').click();
        cy.contains('I am looking for...').should('be.visible');
        cy.url().should('include', '/posts');
    })

  it('Adds post successfully', () => {
    cy.get('#see-posts').click();
    cy.get('#add-posts').click();

    cy.get('#type').select('Roommate');
    cy.get('#next').click({ force: true });

    cy.get('#title').type(randomTitle);
    cy.get('#content').type(randomContent);
    cy.contains('Submit').click();

    cy.contains(randomTitle).should('be.visible');
    cy.contains(randomContent).should('be.visible');
    cy.contains(randomName).parent().parent().parent().find('#post-actions').click({ force: true });
    cy.get('#edit-post').should('exist');
    cy.get('#delete-btn').click({ force: true });
    
  })

  it('Favorites a post successfully', () => {



    
  })

  it('Deletes post successfully', () => {
    cy.get('#see-posts').click();
    cy.get('#add-posts').click();

    cy.get('#type').select('Roommate');
    cy.get('#next').click({ force: true });

    cy.get('#title').type(randomTitle);
    cy.get('#content').type(randomContent);
    cy.contains('Submit').click();

    cy.contains(randomTitle).should('be.visible');
    cy.contains(randomContent).should('be.visible');

    cy.contains(randomName).parent().parent().parent().find('#post-actions').click({ force: true });
    cy.get('#delete-btn').click({ force: true });

    cy.contains(randomTitle).should('not.exist');
    cy.contains(randomContent).should('not.exist');
  })
})