describe('Home Page Test', () => {
  it('Can visits the Home Page', () => {
    cy.visit('/')
  })

  it('Has Gembira Loka and Remosto Logo', () => {
    cy.visit('/')
    cy.get('img[alt="logo gembira loka"]').should('be.visible')
    cy.get('img[alt="logo remosto"]').should('be.visible')
    cy.contains('Pilih Layanan Kami').should('be.visible')
  })

  it('Has user service button and worked', () => {
    cy.visit('/')
    cy.contains('Panggil Bantuan').should('be.visible')
    cy.contains('Dashboard').should('be.visible')
    cy.contains('Dashboard').click()
    cy.contains('Mohon maaf, halaman ini hanya untuk operator').should('be.visible')
    cy.contains('Kembali').should('be.visible')
    cy.contains('Lanjutkan').should('be.visible')
    cy.contains('Kembali').click()
    cy.contains('Mohon maaf, halaman ini hanya untuk operator').should('not.exist')
  })

  it('Has five menu card button', () => {
    cy.visit('/')
    cy.contains('Zona Hewan').should('be.visible')
    cy.contains('Fasilitas Umum').should('be.visible')
    cy.contains('Lihat Maps').should('be.visible')
    cy.contains('Tempat Makan').should('be.visible')
    cy.contains('Beri Feedback').should('be.visible')
    })
})
