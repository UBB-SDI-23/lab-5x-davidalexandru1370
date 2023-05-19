describe("test3", () => {
  it("Check validation for register", () => {
    cy.visit("localhost:3000/register");

    cy.url().should("include", "/register");
    cy.get("#register-button").should("be.disabled");
    //ALL INPUTS MUST BE EMPTY
    cy.get("#username-input").should("have.value", "");
    cy.get("#password-input").should("have.value", "");
    cy.get("#bio-input").should("have.value", "");
    cy.get("#location-input").should("have.value", "");

    //TYPE IN ALL INPUTS
    cy.get("#username-input").type("name-test");
    cy.get("#register-button").should("be.disabled");
    cy.get("#password-input").type("password");
    cy.get("#register-button").should("be.disabled");
    cy.get("#bio-input").type("sad");
    cy.get("#register-button").should("be.disabled");
    cy.get("#bio-input").type("fdsfnjkf");
    cy.get("#register-button").should("be.disabled");
    cy.get("#location-input").type("123");
    cy.get("#register-button").should("be.disabled");
    cy.get("#location-input").type("zalau");
    cy.get("#register-button").should("be.disabled");
    cy.get("#birthday-input").click("left").type("20110202");
    cy.get("#register-button").should("be.disabled");
  });
});
