describe('Test Public APIs', () => {

    it('gets auth APIs', () => {
  
      cy.request('https://api.publicapis.org/entries')
        .its('body')
        .then(data => {
  
          const authApis = data.entries.filter(entry => {
            return entry.Category === 'Authentication & Authorization'; 
          });
  
          expect(authApis.length).to.eq(7);
  
          cy.log(authApis);
        });
  
    });
  
  });