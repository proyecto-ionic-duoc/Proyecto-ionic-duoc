describe('Verificar mi aplicación', () => {
  const numero = Math.floor(Math.random() * 1000000) + 1;

  it('Verificar inicio de sesión con credenciales incorrectas', () => {
    // Ignorar excepciones no controladas
    cy.on('uncaught:exception', (err, runnable) => {
      return false; // Ignorar el error
    });

    // Visitar la URL de la aplicación
    cy.visit('http://localhost:8100/').then(() => {
      // Interceptar la solicitud de inicio de sesión
      cy.intercept('POST', 'http://localhost:8100/ingreso').as('loginRequest');

      // Ingresar credenciales incorrectas
      cy.get('#cuenta', { timeout: 10000 }).type('correo-falso@duocuc.cl');
      cy.get('#cuenta').should('be.visible').type('correo-inexistente');
      cy.get('#password').invoke('val', ''); // Limpiar el campo de contraseña
      cy.get('#password').type('1234'); // Ingresar contraseña incorrecta
      cy.contains('Iniciar Sesión').click(); // Hacer clic en el botón de inicio de sesión

      // Esperar la solicitud de inicio de sesión y verificar la respuesta
      cy.wait('@loginRequest').then(() => {
        cy.get('ion-title').should('contain.text', 'Bienvenido a asistencia DuoC');
        cy.get('#saludo').should('contain.text', '¡Bienvenido(a) Pedro Hernandez!');
      });
    });
  });
});