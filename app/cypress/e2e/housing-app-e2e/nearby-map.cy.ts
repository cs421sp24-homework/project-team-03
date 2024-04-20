  describe('Nearby Stores Map Test', function () {
    beforeEach(() => {
      // Visit Housing Catalog Page
      cy.visit('/#/housings/c6323b35-3ff5-424c-a8c6-af20730c1cd3'); //visits broadview
      cy.get('#nearby-map-button').click()
    });
  
    it('check that housing map exists', () => {
      cy.get('#housing-map-individual')
        .should('be.visible');
    });
  
    const housingId_1 = "c6323b35-3ff5-424c-a8c6-af20730c1cd3";
    const store_1 = "Family Dollar";
    const store_2 = "MOM's Organic Market";
    const store_3 = "Punjab Groceries & Halal Meat";
    const safeStoreId = `info-window-39\\.336278--76\\.622024`;
    const restaurant_1 = 'Cypriana';
    const restaurant_2 = 'Ambassador Dining Room';
    const restaurant_3 = 'One World Cafe';

  
    it('check that markers exist for the nearby stores', () => {
      // Store 1
      cy.get(`[title="marker-${store_1}"]`, { timeout: 10000 })
        .should('be.visible');

        cy.get(`[title="marker-${store_2}"]`, { timeout: 10000 })
        .should('be.visible');
        cy.get(`[title="marker-${store_3}"]`, { timeout: 10000 })
        .should('be.visible');
    });
  
    it('check that marker hover launches infoWindow', () => {

        // Housing Item 1
        cy.get(`[title=marker-${housingId_1}`)
            .trigger('mouseover', { force: true });
        cy.get(`#info-window-${housingId_1}`)
            .should('be.visible');
      //Store Item
      cy.get(`[title="marker-${store_1}"]:first`)
        .trigger('mouseover', { force: true });
      cy.get(`#${safeStoreId}`)
        .should('be.visible');
    });
  
    it('check that infoWindow close button works', () => {
      // Housing Item 1
      cy.get(`[title="marker-${store_1}"]:first`)
        .trigger('mouseover', { force: true });
      cy.get(`#${safeStoreId}`, { timeout: 10000 })
        .should('be.visible');
      cy.get('.gm-ui-hover-effect').click();
      cy.get(`#${safeStoreId}`).should('not.exist');
  
    });

    it('change category to restaurants 4for nearby places', () => {
      cy.get('#select-category').select('Restaurants');
      cy.contains('Nearby Places').should('be.visible');

      cy.contains(`${restaurant_1}`).should('be.visible');
      cy.contains(`${restaurant_2}`).should('be.visible');
      cy.contains(`${restaurant_3}`).should('be.visible');
    });


  })