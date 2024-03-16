describe('Housing Map Test', function () {
  beforeEach(() => {
    // Visit Housing Catalog Page
    cy.visit('http://localhost:5173/project-team-03/');
  });

  it('check that housing map exists', () => {
    cy.get('#housing-map')
      .should('be.visible');
  });

  const housingId_1 = "f584c9c0-34ab-4978-8be8-06b62c87fa6c";
  const housingId_2 = "23d5c330-ae33-47d5-ae6e-7df67baa56a0";
  const housingId_3 = "a78aca8d-249b-46e5-8601-1ad61160f954";

  it('check that markers exist for housing items', () => {
    // Housing Item 1
    cy.get(`[title=marker-${housingId_1}`)
      .should('be.visible');

    // Housing Item 2
    cy.get(`[title=marker-${housingId_2}`)
      .should('be.visible');

    // Housing Item 3
    cy.get(`[title=marker-${housingId_3}`)
      .should('be.visible');
  });

  it('check that marker click launches HousingView', () => {
    // Housing Item 1
    cy.get(`[title=marker-${housingId_1}`)
      .click({ force: true });
    cy.url()
      .should('include', `http://localhost:5173/project-team-03/#/housings/${housingId_1}`);
  });

  it('check that marker hover launches infoWindow', () => {
    // Housing Item 1
    cy.get(`[title=marker-${housingId_1}`)
      .trigger('mouseover', { force: true });
    cy.get(`#info-window-${housingId_1}`)
      .should('be.visible');

    // Housing Item 2
    cy.get(`[title=marker-${housingId_2}`)
      .trigger('mouseover', { force: true });
    cy.get(`#info-window-${housingId_2}`)
      .should('be.visible');

    // Housing Item 3
    cy.get(`[title=marker-${housingId_3}`)
      .trigger('mouseover', { force: true });
    cy.get(`#info-window-${housingId_3}`)
      .should('be.visible');
  });

  it('check that infoWindow close button works', () => {
    // Housing Item 1
    cy.get(`[title=marker-${housingId_1}`)
      .trigger('mouseover', { force: true });
    cy.get(`#info-window-${housingId_1}`)
      .should('be.visible');
    cy.get('.gm-ui-hover-effect').click();
    cy.get(`#info-window-${housingId_1}`).should('not.exist');

    // Housing Item 2
    cy.get(`[title=marker-${housingId_2}`)
      .trigger('mouseover', { force: true });
    cy.get(`#info-window-${housingId_2}`)
      .should('be.visible');
    cy.get('.gm-ui-hover-effect').click();
    cy.get(`#info-window-${housingId_2}`).should('not.exist');

    // Housing Item 3
    cy.get(`[title=marker-${housingId_3}`)
      .trigger('mouseover', { force: true });
    cy.get(`#info-window-${housingId_3}`)
      .should('be.visible');
      cy.get('.gm-ui-hover-effect').click();
      cy.get(`#info-window-${housingId_3}`).should('not.exist');
  });
})