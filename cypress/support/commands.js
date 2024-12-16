Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Thamires')
    cy.get('#lastName').type('Guireli')
    cy.get('#email').type('thamires@itecsa.com.br')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})

