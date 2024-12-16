///<reference types="Cypress" />

beforeEach(() => {
    cy.visit('./src/index.html');
})

describe('Central de Atendimento ao Cliente TAT', () => {
    it('verifica o título da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste.'
        cy.get('#firstName').type('Thamires')
        cy.get('#lastName').type('Guireli')
        cy.get('#email').type('thamires@itecsa.com.br')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible').contains('Mensagem enviada com sucesso.')

    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Thamires')
        cy.get('#lastName').type('Guireli')
        cy.get('#email').type('thamires@itecsa,com.br')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('campo telefone continua vazio se preenchido com valor nao-numerico', () => {
        cy.get('#phone').type('asbdbdbd').should('have.value', '')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Thamires')
        cy.get('#lastName').type('Guireli')
        cy.get('#email').type('thamires@itecsa.com.br')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('Thamires')
            .should('have.value', 'Thamires')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Guireli')
            .should('have.value', 'Guireli')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('thamires@itecsa.com.br')
            .should('have.value', 'thamires@itecsa.com.br')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('988071036')
            .should('have.value', '988071036')
            .clear()
            .should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('youtube')
            .should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('Mentoria')
            .should('have.value', 'mentoria')
    })
    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })
    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('[type="radio"]').check('feedback')
            .should('have.value', 'feedback')
    })
    it('marca cada tipo de atendimento', () => {
        cy.get('[type="radio"]').check()
            .should('have.length', 3)
            .each(($radio) => {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })
    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing').should('be.visible')
    })
    it('testa a página da política de privacidade de forma independente', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
            .title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    })
    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json',{action: 'drag-drop'})
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () =>{
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
    })
})
