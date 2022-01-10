export const addFirstElementInStockToCart = () => {
    cy.getElementByHtml('.status', 'In stock').click()
    cy.getElementByHtml('.purchase-button', 'Add to cart').click()
}

export const assertCountInCart = (count) => {
    cy.assertElementText('.cart > .menu-item-large-container > .menu-item-large', 'Cart (' + count + ')')
}