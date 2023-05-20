describe("test1", () => {
  it("Open vehicle modal", () => {
    cy.visit("localhost:3000/vehicles");
    cy.contains("Brand");
    cy.contains("Horse Power");
    cy.contains("Car Plate");
    cy.contains("Seats");
    cy.contains("Engine Capacity");
    cy.contains("Fabrication Date");
    cy.contains("Number of incidents");
    cy.contains("Owner name");
    cy.contains(/david.*/)
      .click()
      .url()
      .should("include", "user/");
  });
});
