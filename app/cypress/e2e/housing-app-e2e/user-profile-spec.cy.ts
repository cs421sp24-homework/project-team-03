const generateRandomPassword = (length = 8) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Cypress._.random(0, chars.length - 1));
    }
    return password;
  }
  
  const generateRandomName = (length = 6) => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let name = '';
    for (let i = 0; i < length; i++) {
        name += letters.charAt(Cypress._.random(0, letters.length - 1));
    }
    return name;
  }


describe('test user profile functionality', () => {
    let randomName;
    let randomEmail;
    let randomPassword;
    let randomBio;
    let secondName;
    let secondEmail;
    let secondPassword;

    before(() => {
        // Generate the credentials before all tests run
        randomName = generateRandomName();
        randomEmail = randomName + "@jhu.edu";
        secondName = generateRandomName();
        secondEmail = secondName + "@jhu.edu";
        secondPassword = generateRandomPassword(10);
        randomPassword = generateRandomPassword(10);
        randomBio = generateRandomName(50);
    })

    beforeEach(() => {
        cy.visit('/');
        cy.contains('Off-Campus Housing').should('be.visible');
        
    });

    it('User profile exists', () => {
        cy.registerUser(randomEmail, randomPassword, randomName, randomName);
        cy.loginUser(randomEmail, randomPassword);
        cy.wait(1000); // Needs to wait for the user to be in the database
        cy.visit(`/users/${randomName}`);
        cy.get('.pt-10 > .flex > div').should('have.text', `${randomName} ${randomName}`);
    })

    it('Cannot access user profile without being logged in', () => {
        cy.visit(`/users/${randomName}`);
        cy.contains(`No user found`).should('be.visible');
        cy.contains(`${randomName}`).should('not.exist');
    })

    it('Users can edit their profile', () => {
        cy.loginUser(randomEmail, randomPassword);
        cy.wait(1000); // Needs to wait for the user to be in the database
        cy.visit(`/users/${randomName}`);
        
        cy.get('#edit-profile').click();

        cy.get('#firstName').clear().type(secondName);
        cy.get('#lastName').clear().type(secondName);
        cy.get('#bio').clear().type(randomBio);
        cy.contains('Save').click();

        cy.contains(`${secondName} ${secondName}`).should('be.visible');
        cy.contains(randomBio).should('be.visible');
    })

    it('A user should not be able to edit another users profile', () => {
        cy.registerUser(secondEmail, secondPassword, secondName, secondName);
        cy.loginUser(randomEmail, randomPassword);
        cy.wait(1000);
        cy.visit(`/users/${secondName}`);
        cy.contains(`#edit-profile`).should('not.exist');
    })

    it('A user cannot have an empty firstname or last name', () => {
        cy.loginUser(randomEmail, randomPassword);
        cy.wait(1000); // Needs to wait for the user to be in the database
        cy.visit(`/users/${randomName}`);
        
        cy.get('#edit-profile').click();
        
        cy.get('#firstName').clear()
        cy.get('#lastName').clear()
        cy.get('#bio').clear().type(randomBio);
        cy.contains('Save').click();

        cy.get('#toast', { timeout: 1000 })
            .should('exist')
            .contains(/cannot be empty/i);
    })

    it('Once a user logs out, they should be returned to the home screen', () => {
        cy.loginUser(randomEmail, randomPassword);
        cy.wait(1000); // Needs to wait for the user to be in the database
        cy.visit(`/users/${randomName}`);
        cy.get('#logout').click();
        cy.get('#logout-btn').click();
        cy.contains(`${randomName} ${randomName}`).should('not.exist');
        cy.contains('Off-Campus Housing').should('be.visible');
    });

    it('A user should be able to access their account, from the profile icon', () => {
        cy.loginUser(randomEmail, randomPassword);
        cy.wait(1000); // Needs to wait for the user to be in the database
        cy.get('#profile').click();
        cy.get('.pt-10 > .flex > div').should('have.text', `${randomName} ${randomName}`);
    })

})
