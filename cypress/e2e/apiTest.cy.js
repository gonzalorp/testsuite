// Describe block to group together related tests 
describe('Test Public APIs', () => {

  // Individual test case  
  it('gets auth APIs', () => {

    // Make HTTP request to API endpoint
    cy.request('https://api.publicapis.org/entries')

      // Get just the response body
      .its('body')
      
      // Parse response body JSON
      .then(data => {

        // Filter entries for Auth category
        const authApis = data.entries.filter(entry => {
          return entry.Category === 'Authentication & Authorization'; 
        });

        // Assertion to check number of auth APIs
        // Fails if not equal to 7
        expect(authApis.length).to.eq(7);

        // Log auth APIs to console for debugging
        cy.log(authApis);
      });

  });

});
