import { generateRandomName } from "../../support/helpers";

describe('test emailing app developers', () => {

    let randomName;
    let randomEmail;

    before(() => {
        // Generate the credentials before all tests run
        randomName = generateRandomName();
        randomEmail = randomName + "@jhu.edu";
    });

    beforeEach(() => {
        cy.visit('/');
        cy.contains('Off-Campus Housing').should('be.visible');        
    });

    it('A user can contact the app dev', () => {

        cy.get('#contact').click();
        cy.get('#name').type(randomName);
        cy.get('#email').type(randomEmail);
        cy.get('#subject').type("Test Contact");
        cy.get('#message').type("Want to Input Another Housing");
        cy.contains('Submit').click();
        cy.get('#toast', { timeout: 3000 })
            .should('exist')
            .contains(/Email sent/i);
        
    })

    it('sending email fails when all inputs are not filled', () => {

        cy.get('#contact').click();
        cy.get('#email').type(randomEmail);
        cy.get('#subject').type("Test Contact");
        cy.get('#message').type("Want to Input Another Housing");
        cy.contains('Submit').click();
        cy.get('#toast', { timeout: 3000 })
            .should('exist')
            .contains(/missing fields/i);
        
    })
})