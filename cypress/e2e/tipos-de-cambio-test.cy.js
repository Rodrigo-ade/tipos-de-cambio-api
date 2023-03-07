const URL = "http://127.0.0.1:8080/";
const FECHA_VALIDA = "2011-07-09";
const FECHA_INVALIDA = "1990-12-06";
const BASE = "USD";

context("Tasas de cambio", () => {
  before(() => {
    cy.visit(URL);
  })

  describe("Prueba la funcionalidad con una fecha específica", () => {
  it("Verifica que se obtengan datos con una fecha correcta", () => {
    cy.get("#fecha").type(FECHA_VALIDA);
    cy.get("#obtener-cambio").click();
    cy.wait(10000);//ESPERA DEL API RESPONSE, DEBE HACERSE DE OTRA FORMA.
    cy.get("#tasas-de-cambio").should("be.visible");
    cy.get("tbody tr").should('have.length.of.at.least', 10);
  });

  it("Verifica que la fecha de los datos deseados sea igual a la fecha obtenida", () => {
    cy.get("#tasa-fecha").should("contain", `El cambio de 1 USD para la fecha ${FECHA_VALIDA} es:`)
  });

  it("Verifica que no se obtengan datos con una fecha incorrecta", () => {
    cy.get("#fecha").type(FECHA_INVALIDA);
    cy.get("#obtener-cambio").click();
    cy.get("#tasas-de-cambio").should("be.hidden");
  });

  it("Verifica que se pinte de rojo la fecha ingresada si es incorrecta", () => {
    cy.get("#fecha").should("have.class", "error");
  });
  });

  describe("Prueba la funcionalidad sin una fecha específica", () => {
    it("Verifica que se obtengan los datos del día actual", () => {
      cy.visit(URL);
      cy.get("#obtener-cambio").click();
      cy.wait(10000);//ESPERA DEL API RESPONSE, DEBE HACERSE DE OTRA FORMA.
      cy.get("#tasas-de-cambio").should("be.visible");
      cy.get("tbody tr").should('have.length.of.at.least', 10);
    });
  });
});
