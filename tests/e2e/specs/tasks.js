// https://docs.cypress.io/api/introduction/api.html

describe('Add Task', () => {
  it('should render tasks and datepicker', () => {
    cy.visit('/');
    cy.get('[data-cy=datepicker]').should('be.exist');
    cy.get('[data-cy=tasks]').should('be.exist');
  });
  
  it('should show new task form on click add button', () => {
    cy.get('[data-cy=add-new-task-btn]').click();
    cy.get('[data-cy=new-task-form]').should('be.exist');
  });
  
  it('should add new task with correct data', () => {
      const newTime = '12:00';
      const newTitle = 'cypress task';
      
      cy.get('[data-cy=new-task-time]').type(newTime);
      cy.get('[data-cy=new-task-name]').type(newTitle);
  
      cy.get('[data-cy=save-task-btn]').click();
      
      cy.get('[data-cy=tasks]').within(subj => {
        cy.contains(newTime);
        cy.contains(newTitle);
      });
  });
  
  it('should show error if type invalid time', () => {
    const invalidTimes = ['24:00', '10:65', 'abc'];
  
    invalidTimes.forEach((time) => {
      cy.get('[data-cy=new-task-time]').type(`{selectall}${time}`);
      cy.wait(3000);
      cy.get('[data-cy=new-task-inputs]').contains('Введите валидное время');
    });
  });
});
