// Import the webpack configuration (assumed to be located in the parent directory)
import '../../webpack.config.js';

// Describe a test suite named "UI Test for Swag Labs"
describe("UI Test for Swag Labs", () => {
  // Define a test case within the suite, titled "Log in and verify sorting functionality"
  it("Log in and verify sorting functionality", () => {
    // Visit the login page at "http://saucedemo.com/"
    cy.visit("http://saucedemo.com/");
    
    // Type "problem_user" into the input field with id "user-name"
    cy.get("#user-name").type("problem_user");

    // Type "secret_sauce" into the input field with id "password"
    cy.get("#password").type("secret_sauce");

    // Click the button with id "login-button"
    cy.get("#login-button").click();

    // Select the sorting option "az" from the dropdown with attribute "data-test" set to "product_sort_container"
    cy.get("[data-test='product_sort_container']").select("az");

    // Fetch and map text content of elements with class "inventory_item_name"
    cy.get(".inventory_item_name").then(($items) => {
      const itemNames = $items.map((index, element) => Cypress.$(element).text()).get();
      
      // Assert that item names are in alphabetical order
      expect(itemNames).to.deep.equal(itemNames.slice().sort());
    });

    // Select the sorting option "za" from the dropdown
    cy.get("[data-test='product_sort_container']").select("za");

    // Fetch and map text content of elements with class "inventory_item_name" again
    cy.get(".inventory_item_name").then(($items) => {
      const itemNames = $items.map((index, element) => Cypress.$(element).text()).get();
      
      // Assert that item names are in reverse alphabetical order
      expect(itemNames).to.deep.equal(itemNames.slice().sort().reverse());
    });
  });
});
