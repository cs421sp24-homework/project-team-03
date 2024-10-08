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


    it('Feed loads when navigating to posts', () => {
        cy.get('#see-posts').click();
        cy.contains('I am looking for...').should('be.visible');
        cy.url().should('include', '/posts');
    })

    it('Seeing Community posts fails when user isnt logged in', () => {
        cy.logoutUser();
        cy.get('#see-posts').click();
        cy.get('#toast', { timeout: 1000 })
            .should('exist')
            .contains(/log in to view posts/i);
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

    it('Adding an image while creating a post saves', () => {
        cy.get('#see-posts').click();
        cy.get('#add-posts').click();

        cy.get('#type').select('Roommate');
        cy.get('#next').click({ force: true });

        cy.get('#title').type(randomTitle);
        cy.get('#content').type(randomContent);

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
        cy.get('#next').click({ force: true });

        cy.get('#title').type(randomTitle);
        cy.get('#content').type(randomContent);

        //Browse
        const img = 'cypress/fixtures/House_Test_Image.jpeg';

        cy.get('input[type=file]').selectFile(img, { action: 'drag-drop' , force: true})
        cy.contains('Submit').click();

        cy.get('.min-w-0 > img').should('be.visible');
        cy.contains(randomName).parent().parent().parent().find('#post-actions').click({ force: true });
        cy.get('#delete-btn').click({ force: true });
        
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

    it('Edit post successfully', () => {
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
        cy.get('#edit-post').click({ force: true });

        const updatedTitle = 'Updated Title';
        const updatedContent = 'Updated Content';

        cy.get('#newTitle').clear().type(updatedTitle); 
        cy.get('#newContent').clear().type(updatedContent); 

        cy.contains('Save').click();

        cy.contains(updatedTitle).should('be.visible');
        cy.contains(updatedContent).should('be.visible');

        cy.contains(randomName).parent().parent().parent().find('#post-actions').click({ force: true });
        cy.get('#delete-btn').click({ force: true });
    })

    it('Edit post successfully with adding an image', () => {
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
        cy.get('#edit-post').click({ force: true });

        const updatedTitle = 'Updated Title';
        const updatedContent = 'Updated Content';

        cy.get('#newTitle').clear().type(updatedTitle); 
        cy.get('#newContent').clear().type(updatedContent); 

        const img = 'cypress/fixtures/House_Test_Image.jpeg';
        cy.get('[name="file"]').selectFile(img, {force: true});
        cy.contains('Save').click();

        //cy.get('input[type=file]').selectFile(img, { action: 'drag-drop' , force: true})

        //cy.get('.min-w-0 > img').should('be.visible');

        //cy.contains('Save').click();

        cy.contains(updatedTitle).should('be.visible');
        cy.contains(updatedContent).should('be.visible');

        cy.contains(randomName).parent().parent().parent().find('#post-actions').click({ force: true });
        cy.get('#delete-btn').click({ force: true });
    })



    it('Edit post fails when a field is empty', () => {
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
        cy.get('#edit-post').click({ force: true });

        const updatedTitle = 'Updated Title';
        const updatedContent = 'Updated Content';

        cy.get('#newTitle').clear(); 
        cy.get('#newContent').clear().type(updatedContent); 

        cy.contains('Save').click();

        cy.get('#toast', { timeout: 1000 })
            .should('exist')
            .contains(/cannot be empty/i);

        cy.contains(updatedTitle).should('not.exist');

        cy.contains('Cancel').click();

        cy.contains(randomName).parent().parent().parent().find('#post-actions').click({ force: true });
        cy.get('#delete-btn').click({ force: true });
    })

    it('Dragging an image when editting a post successfully loads', () => {
        // Create post
        cy.get('#see-posts').click();
        cy.get('#add-posts').click();

        cy.get('#type').select('Roommate');
        cy.get('#next').click({ force: true });

        cy.get('#title').type(randomTitle);
        cy.get('#content').type(randomContent);
        cy.contains('Submit').click();

        // Edit post
        cy.contains(randomName).parent().parent().parent().find('#post-actions').click({ force: true });
        cy.get('#edit-post').click({ force: true });

        const updatedTitle = 'Updated Title';
        const updatedContent = 'Updated Content';

        cy.get('#newTitle').clear().type(updatedTitle);
        cy.get('#newContent').clear().type(updatedContent); 

        //Browse
        const img = 'cypress/fixtures/House_Test_Image.jpeg';

        cy.get('input[type=file]').selectFile(img, { action: 'drag-drop' , force: true})
        cy.contains('Save').click();

        cy.get('.min-w-0 > img').should('be.visible');
        cy.contains(randomName).parent().parent().parent().find('#post-actions').click({ force: true });
        cy.get('#delete-btn').click({ force: true });
        
    })


    it('Adding a post fails when a field is missing', () => {
        cy.get('#see-posts').click();
        cy.get('#add-posts').click();

        cy.get('#type').select('Roommate');
        cy.get('#next').click({ force: true });

        cy.get('#content').type(randomContent);
        cy.contains('Submit').click();

        cy.get('#toast', { timeout: 1000 })
            .should('exist')
            .contains(/must be completed/i);

        cy.contains(randomContent).should('not.exist');
    })

    it('Adding a post fails when the cost isnt numerical', () => {
        cy.get('#see-posts').click();
        cy.get('#add-posts').click();

        randomCost = generateRandomName(3);

        cy.get('#type').select('Sublet');
        cy.get('#next').click({ force: true });

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
        cy.get('#see-posts').click();
        cy.get('#user-actions').click();
        cy.logoutUser();
        cy.contains('Community Posts').should('not.exist');
        cy.contains('Off-Campus Housing').should('be.visible');
    })
})