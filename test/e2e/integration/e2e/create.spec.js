describe('Create page', () => {
  it('create/1 allows users to enter and submit info, with no fixed membership fee', () => {
    cy.visit('/create/1')
    cy.contains('Create a flatbond for client 1')
    cy.contains('Do you have a fixed membership fee?')
    cy.contains('How much is your rent (in pounds)?')
    cy.contains("What's your postcode?")

    cy.get('.ant-input-number-input')
      .clear()
      .type('1000') // 30 000 = 300

    // Click Monthly
    cy.get(
      ':nth-child(1) > .ant-radio-group > .ant-radio-button-wrapper-checked'
    ).click()
    cy.get('#membership-fee').contains('300')

    // Click Weekly
    cy.get(':nth-child(1) > .ant-radio-group > :nth-child(1)').click()
    cy.get('#membership-fee').contains('1200')

    cy.get('#postcode')
      .clear()
      .type('AWS EC2')

    cy.get('#submit').click()
    cy.location('pathname').should('eq', '/details')
  })

  it('create/2 allows users to enter and submit info, with a fixed membership fee', () => {
    cy.visit('/create/2')
    cy.contains('Create a flatbond for client 2')
    cy.contains('Do you have a fixed membership fee?')
    cy.contains('How much is your rent (in pounds)?').should('not.be.visible')
    cy.contains("What's your postcode?")
    cy.get('.ant-input-number-input').should('not.be.visible')

    // Weekly & Monthly rent buttons
    cy.get(
      ':nth-child(1) > .ant-radio-group > .ant-radio-button-wrapper-checked'
    ).should('not.be.visible')
    cy.get(':nth-child(1) > .ant-radio-group > :nth-child(1)').should(
      'not.be.visible'
    )

    cy.get('#postcode')
      .clear()
      .type('AWS')

    cy.get('#submit').click()
    cy.contains('Postcode is too short')

    cy.get('#postcode')
      .clear()
      .type('AWS EC2')

    cy.get('#submit').click()
    cy.location('pathname').should('eq', '/details')
  })
})
