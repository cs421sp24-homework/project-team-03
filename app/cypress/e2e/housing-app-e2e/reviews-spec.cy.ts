import { generateRandomName, generateRandomPassword } from "./user-register-login-spec.cy";
  
  describe('reviews', () => {
    let randomName;
    let randomEmail;
    let randomPassword;
  
    before(() => {
      // Generate the credentials before all tests run
      randomName = generateRandomName();
      randomEmail = randomName + "@jhu.edu";
      randomPassword = generateRandomPassword(10);
      cy.visit('/'); //visits base url from config file
      cy.registerUser(randomEmail, randomPassword, randomName, randomName); //register once
    });
  
    beforeEach(() => {
      cy.visit('/'); //visits base url from config file
      //just in case deployed website is down due to render, waits a minute
      //active check: at least 1 housing item shows up
      cy.get(':nth-child(1) > a > .p-5', { timeout: 60000 })
        .should('be.visible');
      cy.loginUser(randomEmail, randomPassword);
    });
  

    it('clicking on a housing item leads to the apartment page with reviews', () => {
        cy.get(':nth-child(1) > a > .p-5').click();
        cy.url().should('include', '/housings');
        return; //prevent an infinite loop ??
    });

    it('logged in user can create a review', () => {
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
        //check that the review's content matches what was inputted
        //check the user is correct
        cy.get('#username-area').should('have.text', `${randomName} ${randomName}`);
        // Check the first three stars are 'selected' of the first available review
        cy.get(':nth-child(1) > .border-b > .flex-grow > .items-center > :nth-child(2) > :nth-child(1)').should('have.text', '★');
        cy.get(':nth-child(1) > .border-b > .flex-grow > .items-center > :nth-child(2) > :nth-child(2)').should('have.text', '★');
        cy.get(':nth-child(1) > .border-b > .flex-grow > .items-center > :nth-child(2) > :nth-child(3)').should('have.text', '★');
        // Check the remaining stars are 'unselected'
        cy.get(':nth-child(1) > .border-b > .flex-grow > .items-center > :nth-child(2) > :nth-child(4)').should('have.text', '☆');
        cy.get(':nth-child(1) > .border-b > .flex-grow > .items-center > :nth-child(2) > :nth-child(5)').should('have.text', '☆');
        //checks the content matches
        cy.get('.px-4.py-3 > p')
            .should('exist')
            .contains(/This place looks alright!/i);
        //the review count
        cy.get('.ml-2');
        return;
    });

    it('after creating a review, the review count is 1 with 3 stars', () => {
        cy.get(':nth-child(1) > a > .p-5').click();
        cy.url().should('include', '/housings');
        cy.wait(3000); //wait for realtime
        cy.get('.mt-4 > :nth-child(3) > div > :nth-child(1)').should('have.text', '★');
        cy.get('.mt-4 > :nth-child(3) > div > :nth-child(2)').should('have.text', '★');
        cy.get('.mt-4 > :nth-child(3) > div > :nth-child(3)').should('have.text', '★');
        cy.get('.mt-4 > :nth-child(3) > div > :nth-child(4)').should('have.text', '☆');
        cy.get('.mt-4 > :nth-child(3) > div > :nth-child(5)').should('have.text', '☆');
        cy.get('.ml-2')
          .should('exist')
          .contains(/1 reviews/i);
    });


    it('after creating a review, a user can delete their review', () => {
        cy.get(':nth-child(1) > a > .p-5').click();
        cy.url().should('include', '/housings');
        //since the user created this review, it should see the review actions
        cy.get('#review-actions').should('exist');
        //delete the review
        cy.get('#review-actions').click();
        cy.get('#delete-review').click();
        cy.get('#toast', { timeout: 1000 })
          .should('exist')
          .contains(/success/i);
    });

    it('after deleting a review, the review count is 0 with 0 stars', () => {
        //click on a housing item in the catalog main page
        cy.get(':nth-child(1) > a > .p-5').click();
        cy.url().should('include', '/housings');
        cy.wait(3000); //wait for realtime
        cy.get('.mt-4 > :nth-child(3) > div > :nth-child(1)').should('have.text', '☆');
        cy.get('.mt-4 > :nth-child(3) > div > :nth-child(2)').should('have.text', '☆');
        cy.get('.mt-4 > :nth-child(3) > div > :nth-child(3)').should('have.text', '☆');
        cy.get('.mt-4 > :nth-child(3) > div > :nth-child(4)').should('have.text', '☆');
        cy.get('.mt-4 > :nth-child(3) > div > :nth-child(5)').should('have.text', '☆');
        //check review count
        cy.get('.ml-2')
          .should('exist')
          .contains(/0 reviews/i);
    });

    it('a logged out user can see housing page but no reviews', () => {
        cy.logoutUser();
        cy.get(':nth-child(1) > a > .p-5').click();
        cy.url().should('include', '/housings');
        cy.get('.text-center')
          .should('exist')
          .contains(/You must be logged in to see reviews/i);
        return; //prevent an infinite loop ??
    });


})