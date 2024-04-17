import { generateRandomPassword, generateRandomName } from '../../support/helpers';

describe('test user profile functionality', () => {
    let randomName;
    let randomEmail;
    let randomPassword;
    let randomBio;
    let secondName;
    let secondEmail;
    let secondPassword;
    let randomMessage;
    let randomSubject;

    before(() => {
        // Generate the credentials before all tests run
        randomName = generateRandomName();
        randomEmail = randomName + "@jhu.edu";
        secondName = generateRandomName();
        secondEmail = secondName + "@jhu.edu";
        secondPassword = generateRandomPassword(10);
        randomPassword = generateRandomPassword(10);
        randomBio = generateRandomName(50);
        randomSubject = generateRandomName(12);
        randomMessage = generateRandomName(50);
        cy.visit('/');
        cy.registerUser(randomEmail, randomPassword, randomName, randomName);
        cy.verifyUser(randomEmail);
    })

    beforeEach(() => {
        cy.visit('/');
        cy.contains('Off-Campus Housing').should('be.visible');
        cy.loginUser(randomEmail, randomPassword);
        
    });

    it('User profile exists', () => {
        cy.wait(5000); // Needs to wait for the user to be in the database
        cy.visit(`/#/users/${randomName}`);
        cy.get('.pt-10 > .flex > div').should('have.text', `${randomName} ${randomName}`);
    })

    it('Cannot access user profile without being logged in', () => {
        cy.logoutUser();
        cy.visit(`/#/users/${randomName}`);
        cy.contains(`No user found`).should('be.visible');
        cy.contains(`${randomName}`).should('not.exist');
    })

    it('A user should not be able to edit another users profile', () => {
        cy.logoutUser();
        cy.registerUser(secondEmail, secondPassword, secondName, secondName);
        cy.verifyUser(secondEmail);
        cy.loginUser(randomEmail, randomPassword);
        cy.wait(1000);
        cy.visit(`/#/users/${secondName}`);
        cy.contains(`#update-profile`).should('not.exist');
    })

    it('A user cannot have an empty firstname or last name', () => {
        cy.wait(1000); // Needs to wait for the user to be in the database
        cy.visit(`/#/users/${randomName}`);
        
        cy.get('#update-profile').click();
        
        cy.get('#firstName').clear()
        cy.get('#lastName').clear()
        cy.get('#bio').clear().type(randomBio);
        cy.get('#next').click({ force: true });
        cy.get('#next').click({ force: true });
        cy.get('#next').click({ force: true });

        // cy.contains('#done').click();
        cy.get('#done').click({ force: true });

        cy.get('#toast', { timeout: 1000 })
            .should('exist')
            .contains(/must be completed/i);
    })

    it('Once a user logs out, they should be returned to the home screen', () => {
        cy.wait(1000); // Needs to wait for the user to be in the database
        cy.visit(`/#/users/${randomName}`);
        cy.get('#logout-dialog').click();
        cy.get('#logout-btn').click();
        cy.contains(`${randomName} ${randomName}`).should('not.exist');
        cy.contains('Off-Campus Housing').should('be.visible');
    });

    it('A user should be able to access their account, from the profile icon', () => {
        cy.wait(5000); // Needs to wait for the user to be in the database
        cy.get('#profile').click();
        cy.get('.pt-10 > .flex > div').should('have.text', `${randomName} ${randomName}`);
    })

    it('Users can edit their profile', () => {
        cy.wait(5000); // Needs to wait for the user to be in the database
        cy.visit(`/#/users/${randomName}`);
        
        cy.get('#update-profile').click();

        cy.get('#firstName').clear().type(secondName);
        cy.get('#lastName').clear().type(secondName);
        cy.get('#bio').clear().type(randomBio);
        cy.get('#next').click({ force: true });

        cy.get('#age').clear().type('100');
        cy.get('#gender').clear().type('Female');
        cy.get('#major').clear().type('Psychology');
        cy.get('#gradYear').clear().type('2030');
        cy.get('#next').click({ force: true });

        cy.get('#stayLength').select('Summer Lease');
        cy.get('#budget').select('<$900');
        cy.get('#idealDistance').select('<0.3 miles');
        cy.get('#petPreference').select('Pet-Friendly');
        cy.get('#next').click({ force: true });

        cy.get('#cleanliness').select('Very Clean');
        cy.get('#smoker').select('Non-Smoker');
        cy.get('#socialPreference').select('Extrovert');
        cy.get('#peakProductivity').select('Early Bird');
        cy.get('#done').click({ force: true });

        cy.contains(`${secondName} ${secondName}`).should('be.visible');
        cy.contains(randomBio).should('be.visible');
        cy.contains('100').should('be.visible');
        cy.contains('Female').should('be.visible');
        cy.contains('Psychology').should('be.visible');
        cy.contains('2030').should('be.visible');
        
        cy.contains('Summer Lease').should('be.visible');
        cy.contains('<$900').should('be.visible');
        cy.contains('<0.3 miles').should('be.visible');
        cy.contains('Pet-Friendly').should('be.visible');

        cy.contains('Very Clean').should('be.visible');
        cy.contains('Non-Smoker').should('be.visible');
        cy.contains('Extrovert').should('be.visible');
        cy.contains('Early Bird').should('be.visible');
    })

    it('Users should see review on profile', () => {
        cy.get('#home').click();
        cy.get(':nth-child(1) > a > .p-5').click();
        cy.url().should('include', '/housings');
        cy.get('#add-review').click();
        // Click the third star
        cy.get('.star-3').click(); 
        //type in content box
        cy.get('#content').type('This place looks alright!');
        //click okay button
        cy.get('#submit').click();
        cy.get('#profile').click();
        cy.contains('This place looks alright!').should('be.visible');


        cy.get('#home').click({ force: true });
        cy.get(':nth-child(1) > a > .p-5').click();
        cy.url().should('include', '/housings');
        cy.get('#review-actions').should('exist');
        //delete the review
        cy.get('#review-actions').click({ force: true });
        cy.get('#delete-review').click({ force: true });
        cy.get('#toast', { timeout: 1000 })
          .should('exist')
          .contains(/success/i);
    })

    it('A user can send an email to another user', () => {
        cy.logoutUser();
        cy.loginUser(randomEmail, randomPassword);
        cy.wait(1000);
        cy.visit(`/#/users/${secondName}`);
        cy.get('#send-email').click();

        cy.get('#name').type(randomName);
        cy.get('#email').type(randomEmail);
        cy.get('#subject').type(randomSubject);
        cy.get('#message').type(randomMessage);
        cy.contains('Submit').click();

        cy.get('#toast', { timeout: 3000 })
      .should('exist')
      .contains(/Email sent/i);
        
    })

    it('A user should have a notification on their inbox once an email is sent to them', () => {
        cy.logoutUser();
        cy.loginUser(secondEmail, secondPassword);

        cy.get('#inbox').should('be.visible');

        cy.get('#notification-count').should('be.visible').invoke('text').then(notificationCount => {
            const count = parseInt(notificationCount, 10);
            expect(count).to.be.greaterThan(0); // Assuming you expect at least one notification
    });

    })

    it('A user should be able to clear notifications on their inbox', () => {
        cy.logoutUser();
        cy.loginUser(secondEmail, secondPassword);

        cy.get('#inbox').click();
        cy.contains('Check your inbox!').should('be.visible');

        cy.get('#clear-inbox').click();
        cy.get('#notification-count').should('not.exist');
    })

})
