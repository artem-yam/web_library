function Controller(booksModel) {
    "use strict";

    let controlledBooksModel = booksModel;

    function addBook(bookFormData) {
        return controlledBooksModel.addBook(bookFormData);
    }

    // переделать в смену каталога
    function updateRating(bookId, newTag) {
        controlledBooksModel.updateRating(bookId, newTag);
    }

    function deleteBook(bookId) {
        return controlledBooksModel.deleteBook(bookId);
    }

    return {
        addBook,
        updateRating,
        deleteBook,
    };
}