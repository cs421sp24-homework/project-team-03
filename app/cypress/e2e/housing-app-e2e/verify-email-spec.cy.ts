import { generateRandomPassword, generateRandomName, generateRandomCost } from '../../support/helpers';

describe('Email Verification', () => {
    let randomName;
    let randomEmail;
    let randomPassword;
    let randomToken;

    beforeEach(() => {
        randomName = generateRandomName();
        randomEmail = randomName + "@jhu.edu";
        randomPassword = generateRandomPassword(10);
        randomToken = generateRandomCost();
        cy.visit('/');
        cy.contains('Off-Campus Housing').should('be.visible');        
    });

    it('sends an email after you register', () => {

        cy.get('#register-dialog').click();
        cy.get('#email').type(randomEmail);
        cy.get('#password').type(randomPassword);
        cy.get('#firstName').type(randomName);
        cy.get('#lastName').type(randomName);

        cy.intercept('POST', `/users/register`).as('register');
        cy.get('button[type=submit]').click()

        cy.contains('Save').click();
    
        cy.get('#toast', { timeout: 10000 })
            .should('exist')
            .contains(/registration successful/i);
    
        cy.log('**register API call**')

        cy.wait('@register').its('request.body').should('deep.equal', {
            email: randomEmail,
            password: randomPassword,
            firstName: randomName,
            lastName: randomName,
            avatar: "",
        })
    })

    it('log in fails when user is not verified', () => {
        cy.registerUser(randomEmail, randomPassword, randomName, randomName);
        cy.loginUser(randomEmail, randomPassword);
        cy.get('#toast', { timeout: 1000 })
            .should('exist')
            .contains(/not verified/i);
    })

    it('email verification failed when wrong token', () => {
        cy.registerUser(randomEmail, randomPassword, randomName, randomName);
        cy.visit(`/#/verify`);
        cy.get('#verify-email-dialog').click();
        cy.get('#email').type(randomEmail);
        cy.get('#token').type(randomToken);
        cy.get('#save').click({ force: true });        
        cy.get('#toast', { timeout: 1000 })
        .should('exist')
        .contains(/failed to verify/i);
        cy.visit('/');

    })

    it('email verification is succesful', () => {
        cy.registerUser(randomEmail, randomPassword, randomName, randomName);
        cy.visit(`/#/verify`);
        cy.get('#verify-email-dialog').click();
        cy.get('#email').type(randomEmail);
        cy.get('#token').type("000000");
        cy.get('#save').click({ force: true });        
        cy.get('#toast', { timeout: 1000 })
        .should('exist')
        .contains(/verification successful/i);
        cy.visit('/');
    })


    it('log in successful after email verification', () => {
        cy.registerUser(randomEmail, randomPassword, randomName, randomName);
        cy.visit(`/#/verify`);
        cy.get('#verify-email-dialog').click();
        cy.get('#email').type(randomEmail);
        cy.get('#token').type("000000");
        cy.get('#save').click({ force: true });        
        cy.get('#toast', { timeout: 1000 })
        .should('exist')
        .contains(/verification successful/i);
        cy.visit('/');
        cy.loginUser(randomEmail, randomPassword);
        cy.contains(/Logout/i);
    })

  })