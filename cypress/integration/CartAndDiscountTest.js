import * as util from '../support/utils.js';


describe('Test case to check add to cart and discount', () => {
  beforeEach(function () {
    cy.visit('/')
    cy.fixture('inputdata').then((input) => {
      this.input = input
    })
  })

  it('Add to cart test', function () {

    // goto chairs page and assert url
    cy.get('a[href*="/department/chairs"]').first().click()
    cy.checkforPageLoad()
    cy.checkUrlContains('/department/chairs')

    // validation for out of stock chairs 
    cy.getElementByHtml('.status.status--red', 'Sold out').click()
    cy.getElementByHtml('.modal-sold-out--is-open > .modal-sold-out-content > .modal-button', 'Continue shopping').click()

    // checking for the first chair in stock and adding to cart
    util.addFirstElementInStockToCart()
    cy.checkUrlContains('/chairs/product/')
    util.assertCountInCart(1)

    // goto sofa section
    cy.get('a[href*="/department/sofas"]').first().click()
    cy.checkUrlContains('department/sofas')

    // checking for the first sofa in stock and adding to cart
    util.addFirstElementInStockToCart()
    cy.checkUrlContains('/sofas/product/')
    util.assertCountInCart(2)

    //verifying items in cart
    cy.getElementByHtml('.cart > .menu-item-large-container > .menu-item-large', 'Cart (2)').click()
    cy.get('.product-description').should('have.length', 2).each(($el, index) => {
      cy.assertElementContainsText($el, this.input.productNames[index])
      cy.assertElementContainsText($el, this.input.productPrice[index])
    })

    //assert total order value
    cy.assertElementContainsText('.line-total', this.input.total)
  })

  it('Discount coupon test', function () {

    cy.get('.cart').click()

    // Adding random discount code
    cy.get('.discount').type("asdad")
    cy.getElementByHtml('.discount > div', 'Apply').click()

    // assert error text
    cy.assertElementText('.discount-toast', 'Coupon is invalid')
  })

})
