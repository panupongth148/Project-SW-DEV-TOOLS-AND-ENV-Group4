describe('Book2Hand', function() {
    it('login', function() {

        cy.visit('https://book2hand-2b910.web.app');

        cy.get('[data-test="login"]').click();

        cy.get('[data-test="username"]').type("owenlnwza");
        cy.get('[data-test="password"]').type("123456aA");
        cy.get('[data-test="submitLogin"]').click();
        cy.wait(3000);

        cy.get('[data-test="store"]').click();
        cy.wait(3000);

        cy.get('[data-test="addBook"]').click();
        cy.wait(2000);

        cy.get('[data-test="bookName"]').type("แนวข้อสอบ GAT");
        cy.get('[data-test="bookDescription"]').type("แนวข้อสอบ GAT ภาษาอังกฤษ");
        cy.get('[data-test="bookType"]').select("magazine");
        cy.get('[data-test="bookCategory"]').type("ความรู้");
        cy.get('[data-test="bookPrice"]').type("18");
        cy.get('[data-test="bookCount"]').type("5");
        cy.get('[data-test="bookPicture"]').selectFile("cypress/fixtures/images/Book.jpg", { action: 'drag-drop' });
        cy.get('[data-test="submitAddBook"]').click();
        cy.wait(4000);

        cy.get('[data-test="editBook0"]').click();
        cy.wait(2000);

        cy.get('[data-test="bookName"]').type(" ภาษาอังกฤษ");
        cy.get('[data-test="bookDescription"]').type(" จะทำให้นักเรียนเข้าใจถึงลักษณะและเทคนิคพิชิตข้อสอบ ซึ่งจำเป็นอย่างยิ่งในการทำคะแนนให้สูงที่สุดในการสอบเข้าศึกษาต่อระดับมหาวิทยาลัย");
        cy.get('[data-test="bookType"]').select("book");
        cy.get('[data-test="bookCategory"]').type("ภาษาอังกฤษ");
        cy.get('[data-test="bookPrice"]').type("9");
        cy.get('[data-test="bookCount"]').type("9");
        cy.get('[data-test="submitEditBook"]').click();
        cy.wait(4000);

        cy.get('[data-test="deleteBook0"]').click();
        cy.wait(3000);

    });
});