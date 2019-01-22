describe('Details page', () => {
  it('shows the info of the user just submitted from create/1', () => {
    cy.visit('/create/1')
    cy.get('.ant-input-number-input')
      .clear()
      .type('1000') // 30 000 = 300

    // Click Monthly
    cy.get(
      ':nth-child(1) > .ant-radio-group > .ant-radio-button-wrapper-checked'
    ).click()

    cy.get('#postcode')
      .clear()
      .type('AWS EC2')

    cy.get('#submit').click()
    cy.location('pathname').should('eq', '/details')

    cy.get('.ant-card-head-title').contains('Client 1')
    cy.get('.ant-card-body').contains('Postcode:')
    cy.get('.ant-card-body').contains('AWS EC2')
    cy.get('.ant-card-body').contains('Rent:')
    cy.get('.ant-card-body').contains('£300.00')
    cy.get('.ant-card-body').contains('Membership fee:')
    cy.get('.ant-card-body').contains('£1000.00')

    cy.get('#back').click()
    cy.location('pathname').should('eq', '/create/1')
  })

  it.only('shows the info of the user just submitted from create/2', () => {
    cy.visit('/create/2')

    cy.get('#postcode')
      .clear()
      .type('AWS EC2')

    cy.get('#submit').click()
    cy.location('pathname').should('eq', '/details')

    cy.get('.ant-card-head-title').contains('Client 2')
    cy.get('.ant-card-body').contains('Postcode:')
    cy.get('.ant-card-body').contains('AWS EC2')
    cy.get('.ant-card-body').contains('Rent:').should('not.be.visible')
    cy.get('.ant-card-body').contains('£800.00').should('not.be.visible')
    cy.get('.ant-card-body').contains('Membership fee:')
    cy.get('.ant-card-body').contains('£180.00')

    cy.get('#back').click()
    cy.location('pathname').should('eq', '/create/1')
  })
})
