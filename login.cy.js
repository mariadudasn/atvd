describe('Página de Login', () => {
    beforeEach(() => {
        cy.visit('/'); // Altere para o caminho do seu servidor local
    });

    it('Verificar se a página foi carregada corretamente', () => {
        cy.title().should('eq', 'Login');
        cy.get('h1').should('contain.text', 'Login');
    });

    it('Validar os campos do formulário', () => {
        cy.get('#email').should('have.attr', 'type', 'email');
        cy.get('#password').should('have.attr', 'type', 'password');
    });

    it('Testar envio de formulário com campos vazios', () => {
        cy.get('button[type="submit"]').click();
        cy.get('#alert').should('contain.text', 'Preencha todos os campos.');
    });

    it('Testar envio de formulário com e-mail inválido', () => {
        cy.get('#email').type('usuario@');
        cy.get('#password').type('senha123');
        cy.get('button[type="submit"]').click();
        cy.get('#alert').should('contain.text', 'Formato de e-mail inválido.');
    });

    it('Testar envio de formulário com credenciais incorretas', () => {
        cy.get('#email').type('errado@teste.com');
        cy.get('#password').type('senha123');
        cy.get('button[type="submit"]').click();
        cy.get('#alert').should('contain.text', 'E-mail e/ou senha incorretos.');
    });

    it('Testar envio de formulário com credenciais corretas', () => {
        cy.get('#email').type('usuario@teste.com');
        cy.get('#password').type('123456');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/home');
    });
});
