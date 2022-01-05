describe('Test case to check add to cart and discount', () => {
  it('Add to cart test', () => {
    // load base url
    cy.visit('/')
    // goto chairs page and assert url
    cy.get('a[href*="/department/chairs"]').first().click()
    cy.url().should('include', '/department/chairs')
    // validation for out of stock chairs 
    cy.xpath("//div[@class='status status--red']/..").should(($outOfStock) => {
      $outOfStock.get(1).click()
    })
    cy.xpath("//*[@class='modal-sold-out modal-sold-out--is-open']//*[.='Continue shopping']")
    .should('have.text','Continue shopping').click()
    // checking for the first chair in stock and adding to cart
    cy.xpath("//div[@class='product-card-container']//a[contains(@href,'product/')]//div//div").first().should('have.text','In stock').click()
    cy.url().should('include', '/chairs/product/')
    cy.xpath("//*[@class='purchase-button']").click()
    // assert cart has 1 product
    cy.xpath("//a[contains(@href,'cart')]//div[@class='menu-item-large']").should('have.text', 'Cart (1)')

    // goto sofa section
    cy.get('a[href*="/department/sofas"]').first().click()
    cy.url().should('include', '/department/sofas')
    // select a sofa to add to cart
    const sofaName = "Black Velvet Sectional"
    cy.xpath("//div[@class='description']//div[contains(.,\""+sofaName+"\")]/../..").click()
    cy.url().should('include', '/sofas/product/')
    cy.xpath("//*[@class='purchase-button']").click()
    // assert cart has 2 product
    cy.xpath("//a[contains(@href,'cart')]//div[@class='menu-item-large']").should('have.text', 'Cart (2)').click()

    //verifying items in cart
    cy.xpath("//*[.='Items']/../..//div//div[@class='product']//div[@class='product-description']//div[contains(.,'Chair')]").should('exist');
    cy.xpath("//*[.='Items']/../..//div//div[@class='product']//div[@class='product-description']//div[contains(.,\""+sofaName+"\")]").should('exist');


    // assertions for chair price and sofa price
    cy.get('.product-price').should(($price) => {
      let chairPrice = $price.get(0).innerText;
      let sofaPrice = $price.get(1).innerText;
      expect(chairPrice).to.eq("$250.00")
      expect(sofaPrice).to.eq("$1450.00")

    })
    // assertion for order value 
    cy.xpath("//*[@class='summary']//div[@class='lines']//div[.='Order value']/../div").should(($orderValue) => {
      let totalPrice = $orderValue.get(1).innerText;
      expect(totalPrice).to.eq("$1700.00")
    })
    // assertion for total price
    cy.xpath("//div[@class='line line-total']//div[.='Total']/../div").should(($total) => {
      let totalPrice = $total.get(1).innerText;
      expect(totalPrice).to.eq("1927.00")
    })
  })

 it('Discount coupon test', () => {
     //visit base url and goto cart section
     cy.visit('/')
     cy.get('.cart').click()
     // Adding random discount code
     cy.get('.discount').type("asdad")
     cy.xpath("//div[@class='discount']//div[contains(.,'Apply')]").click()
     // assert error text
     cy.get('.discount-toast').should('have.text', 'Coupon is invalid')
  })

})
