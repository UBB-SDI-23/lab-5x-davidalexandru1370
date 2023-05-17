describe("test1", () => {
  it("Open vehicle modal", () => {
    cy.visit("localhost:3000/login");

    cy.url().should("include", "/login");
    cy.get("button").should("be.disabled");
    cy.get("#username-input").type("david4").should("have.value", "david4");
    cy.get("button").should("be.disabled");
    cy.get("#password-input").type("parola").should("have.value", "parola");
    cy.get("button").should("be.enabled");
  });
});
