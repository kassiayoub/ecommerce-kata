describe('ecommerce kata e2e test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays app title + category filter + Cart link + products', () => {
    cy.get('.title').should('have.text', 'Kata Panier')
    cy.get('.filter').should('have.text', 'Catégorie: ')
    cy.get('#category-select').within(() => {
      cy.get('option').should('have.length', 6);
      cy.get('option').eq(1).should('contain', 'Food');
      cy.get('option').eq(2).should('contain', 'Medecine');
      cy.get('option').eq(3).should('contain', 'Books');
    });
    cy.get('.cart-link').should('have.text', 'Panier: 0')
    cy.get('.product-list app-product').its('length').should('be.gt', 0)
  })

  it('can apply a filter on products', () => {
    //when
    cy.get('#category-select').select('Parfum');
    //then
    cy.get('.product-list app-product').should('have.length', 2);

  })

  it('add product in Cart', () => {
    //when we add first product to cart
    cy.get('.add-button').first().click().click();
    //then
    cy.get('.cart-link').should('have.text', 'Panier: 2')
  })


  it('shows Cart resume', () => {
    //given we add first product to cart
    cy.get('.add-button').first().click().click();
    //when
    cy.get('.cart-link a').click()
    //then
    cy.get('.item-detail').find('span').eq(1).should('have.text', 'Quantité : 2')

    //when i click on delete
    cy.get('.item-detail-red-minus-button').click()
    // then
    cy.get('.cart-empty').should('have.text', 'Panier vide')
  })





})
