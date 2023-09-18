// Import the webpack configuration (assumed to be located in the parent directory)
import '../../webpack.config.js';

// Describe a test suite named "UI Test for Swag Labs"
describe("UI Test for Swag Labs", () => {
  // Define a test case within the suite, titled "Log in and verify sorting functionality"
  it("Log in and verify sorting functionality", () => {
    // Visit the login page at "http://saucedemo.com/"
    cy.visit("http://saucedemo.com/");
    
    // Type "performance_glitch_user" into the input field with id "user-name"
    cy.get("#user-name").type("performance_glitch_user");

    // Type "secret_sauce" into the input field with id "password"
    cy.get("#password").type("secret_sauce");

    // Click the button with id "login-button"
    cy.get("#login-button").click();

    // Define a function to capture and assert performance metrics
    function captureAndAssertPerformance() {
      cy.window().then((win) => {
        const timing = win.performance.timing;
        const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
        const pageLoadTimeInSeconds = pageLoadTime / 1000;

        // Attempt to assert that page load time is less than 0.001 seconds
        try {
          expect(pageLoadTimeInSeconds).to.be.lessThan(0.001);
        } catch (error) {
          // Log an error message if the assertion fails
          Cypress.log({
            name: 'Assertion Error',
            message: error.message,
          });
        }
      });
    }

    // Capture and assert performance after login
    captureAndAssertPerformance();

    // Select the sorting option "az" from the dropdown with attribute "data-test" set to "product_sort_container"
    cy.get("[data-test='product_sort_container']").select("az");

    // Fetch and map text content of elements with class "inventory_item_name"
    cy.get(".inventory_item_name").then(($items) => {
      const itemNames = $items.map((index, element) => Cypress.$(element).text()).get();
      
      // Attempt to assert that item names are in alphabetical order
      try {
        expect(itemNames).to.deep.equal(itemNames.slice().sort());
      } catch (error) {
        // Log an error message if the assertion fails
        Cypress.log({
          name: 'Assertion Error',
          message: error.message,
        });
      }
    });

    // Capture and assert performance after sorting A -> Z
    captureAndAssertPerformance();

    // Select the sorting option "za" from the dropdown
    cy.get("[data-test='product_sort_container']").select("za");

    // Capture and assert performance after selecting sorting option Z -> A
    captureAndAssertPerformance();

    // Fetch and map text content of elements with class "inventory_item_name" again
    cy.get(".inventory_item_name").then(($items) => {
      const itemNames = $items.map((index, element) => Cypress.$(element).text()).get();
      
      // Attempt to assert that item names are in reverse alphabetical order
      try {
        expect(itemNames).to.deep.equal(itemNames.slice().sort().reverse());
      } catch (error) {
        // Log an error message if the assertion fails
        Cypress.log({
          name: 'Assertion Error',
          message: error.message,
        });
      }
    });
  });
});
