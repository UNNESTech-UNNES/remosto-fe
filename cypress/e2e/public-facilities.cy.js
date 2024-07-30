describe('Public-facilities Page Test', () => {
  before(() => {
    cy.visit('/public-facilities')
  });

  it('Has Fasilitas Terdekatmu and Fasilitas Lainnya sections', () => {
    cy.contains('Fasilitas Terdekatmu').should('be.visible')
    cy.contains('Fasilitas Lainnya').should('be.visible')
  })

  it('Has Lihat Semua links and worked', () => {
    cy.get('a[href="/public-facilities/nearest"]').should('exist')
    cy.get('a[href="/public-facilities/other"]').should('exist')
  })

  // it('Has CardTempatMakan components', () => {
  //   cy.react('CardTempatMakan').should('have.length', '1');
  // })
})

// describe('Detail public-facilities Page Test', () => {
//   let firstPublicFacilityId;

//   before(() => {
//     cy.request('https://backend-remosto-ujrltkkgyq-et.a.run.app//infrastructure/type/1').then((response) => {
//       firstPublicFacilityId = response.body.data[0].id;
//     });
//     cy.visit(`/public-facilities/detail/${firstPublicFacilityId}`);
//   });

//   it('Has Description, InformasiLain, and Souvenirs components', () => {
//     cy.get('Description').should('be.visible')
//     cy.get('InformasiLain').should('be.visible')
//     cy.get('Souvenirs').should('be.visible')
//   })

//   it('Has Baca Juga and Lihat Semua links', () => {
//     cy.contains('Baca Juga').should('be.visible')
//     cy.get('a[href="/public-facilities/other"]').should('exist')
//   })

//   // it('Has CardMakanan components', () => {
//   //   cy.visit(`/public-facilities/detail/${firstPublicFacilityId}`)
//   //   cy.get('CardMakanan').should('be.visible')
//   // })
// })
