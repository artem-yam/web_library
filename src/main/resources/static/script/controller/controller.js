function Controller(booksModel) {
    "use strict";

    let controlledBooksModel = booksModel;

    function addBook(newBook) {
        return controlledBooksModel.addBook(newBook);
    }

    function updateBook(book) {
        return controlledBooksModel.updateBook(book);
    }

    function changeBookCatalog(bookId, newCatalog) {
        return controlledBooksModel.changeBookCatalog(bookId, newCatalog);
    }

    function deleteBook(bookId) {
        return controlledBooksModel.deleteBook(bookId);
    }

    return {
        addBook,
        updateBook,
        changeBookCatalog,
        deleteBook
    };
}