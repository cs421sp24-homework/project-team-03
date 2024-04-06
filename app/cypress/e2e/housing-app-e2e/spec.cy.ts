import { generateRandomPassword, generateRandomName, generateRandomCost } from '../../support/helpers';

describe('test post functionality', () => {
    let randomName;
    let randomEmail;
    let randomPassword;
    let randomTitle;
    let randomContent;
    let randomAddress;
    let randomCost

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


    it('Adding an image while creating a post saves', () => {
        cy.get('#see-posts').click();
        cy.get('#add-posts').click();

        cy.get('#type').select('Roommate');
        cy.get('#title').type(randomTitle);
        cy.get('#content').type(randomContent);
        cy.get('#cost').type(randomCost);
        cy.get('#address').type(randomAddress);

        //Browse
        const img = 'cypress/fixtures/House_Test_Image.jpeg';
        cy.get('[name="file"]').selectFile(img, {force: true});
        cy.contains('Submit').click();

        cy.get('input[type=file]').selectFile(img, { action: 'drag-drop' , force: true})

        cy.get('.min-w-0 > img').should('be.visible');
        cy.contains(randomName).parent().parent().parent().find('#post-actions').click({ force: true });
        cy.get('#delete-btn').click({ force: true });
        
    })

    it('Dragging an image when adding a post successfully loads', () => {
        cy.get('#see-posts').click();
        cy.get('#add-posts').click();

        cy.get('#type').select('Roommate');
        cy.get('#title').type(randomTitle);
        cy.get('#content').type(randomContent);
        cy.get('#cost').type(randomCost);
        cy.get('#address').type(randomAddress);

        //Browse
        const img = 'cypress/fixtures/House_Test_Image.jpeg';

        cy.get('input[type=file]').selectFile(img, { action: 'drag-drop' , force: true})
        cy.contains('Submit').click();

        cy.get('.min-w-0 > img').should('be.visible');
        cy.contains(randomName).parent().parent().parent().find('#post-actions').click({ force: true });
        cy.get('#delete-btn').click({ force: true });
        
    })
})