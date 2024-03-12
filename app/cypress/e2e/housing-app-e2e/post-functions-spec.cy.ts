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

  const generateRandomCost = (length = 4) => {
    const numbers = '123456789';
    let cost = '';
    for (let i = 0; i < length; i++) {
        cost += numbers.charAt(Cypress._.random(0, numbers.length - 1));
    }
    return cost;
  }

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

    })

    beforeEach(() => {
        cy.visit('http://localhost:5173/project-team-03/');
        cy.contains('Off-Campus Housing').should('be.visible');
        randomTitle = generateRandomName();
        randomContent = generateRandomName(12);
        randomAddress = generateRandomName(12);
        randomCost = generateRandomCost();
    });


    it('Feed loads when navigating to posts', () => {
        cy.registerUser(randomEmail, randomPassword, randomName, randomName);
        cy.loginUser(randomEmail, randomPassword);
        cy.get('#see-posts').click();
        cy.contains('Community Posts').should('be.visible');
        cy.url().should('include', '/posts');
    })

    it('Seeing Community posts fails when user isnt logged in', () => {
        cy.get('#see-posts').click();
        cy.get('#toast', { timeout: 1000 })
            .should('exist')
            .contains(/log in to view posts/i);
    })

    it('Adds post successfully', () => {
        cy.loginUser(randomEmail, randomPassword);
        cy.get('#see-posts').click();
        cy.get('#add-posts').click();

        cy.get('#type').select('Roommate');
        cy.get('#title').type(randomTitle);
        cy.get('#content').type(randomContent);
        cy.get('#cost').type(randomCost);
        cy.get('#address').type(randomAddress);
        cy.contains('Submit').click();

        cy.contains(randomTitle).should('be.visible');
        cy.contains(randomContent).should('be.visible');
        cy.contains(randomCost).should('be.visible');
        cy.contains(randomAddress).should('be.visible');
    })

    it('Deletes post successfully', () => {
        cy.loginUser(randomEmail, randomPassword);
        cy.get('#see-posts').click();
        cy.get('#add-posts').click();

        cy.get('#type').select('Roommate');
        cy.get('#title').type(randomTitle);
        cy.get('#content').type(randomContent);
        cy.get('#cost').type(randomCost);
        cy.get('#address').type(randomAddress);
        cy.contains('Submit').click();

        cy.contains(randomTitle).should('be.visible');
        cy.contains(randomContent).should('be.visible');
        cy.contains(randomCost).should('be.visible');
        cy.contains(randomAddress).should('be.visible');

        cy.contains(randomTitle).parent().find('#delete-post').click({ force: true });
        cy.get('#delete-btn').click({ force: true });

        cy.contains(randomTitle).should('not.exist');
        cy.contains(randomContent).should('not.exist');
        cy.contains(randomCost).should('not.exist');
        cy.contains(randomAddress).should('not.exist');
    })

    it('Adding a post fails when a field is missing', () => {
        cy.loginUser(randomEmail, randomPassword);
        cy.get('#see-posts').click();
        cy.get('#add-posts').click();

        cy.get('#type').select('Roommate');
        cy.get('#content').type(randomContent);
        cy.get('#cost').type(randomCost);
        cy.get('#address').type(randomAddress);
        cy.contains('Submit').click();

        cy.get('#toast', { timeout: 1000 })
            .should('exist')
            .contains(/must be completed/i);

        cy.contains(randomContent).should('not.exist');
        cy.contains(randomCost).should('not.exist');
        cy.contains(randomAddress).should('not.exist');
    })

    it('Adding a post fails when the cost isnt numerical', () => {
        cy.loginUser(randomEmail, randomPassword);
        cy.get('#see-posts').click();
        cy.get('#add-posts').click();

        randomCost = generateRandomName(3);

        cy.get('#type').select('Roommate');
        cy.get('#title').type(randomTitle);
        cy.get('#content').type(randomContent);
        cy.get('#cost').type(randomCost);
        cy.get('#address').type(randomAddress);
        cy.contains('Submit').click();

        cy.get('#toast', { timeout: 1000 })
            .should('exist')
            .contains(/must be a valid number/i);

        cy.contains(randomTitle).should('not.exist');
        cy.contains(randomContent).should('not.exist');
        cy.contains(randomCost).should('not.exist');
        cy.contains(randomAddress).should('not.exist');
    })

    it('If a user logs out, they should be redirected to home page', () => {
        cy.loginUser(randomEmail, randomPassword);
        cy.get('#see-posts').click();
        cy.get('#logout').click();
        cy.get('#logout-btn').click();
        cy.contains('Community Posts').should('not.exist');
        cy.contains('Off-Campus Housing').should('be.visible');
    })
})