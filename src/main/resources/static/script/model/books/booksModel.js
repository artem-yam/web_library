function BooksModel() {
    "use strict";

    const AJAX_BOOKS_URL = "books";
    const AJAX_CATALOGS_URL = "catalogs";
    const URL_SEPARATOR = "/";

    let booksStorage = [];
    let catalogsStorage = [];
    let onBookAdd = new EventEmitter();

    function addBook(bookFormData) {
        return Utils.sendRequest(AJAX_BOOKS_URL, bookFormData, requestType.POST)
            .then(function (response) {
                onBookAdd.notify(response.id, response.title, response.author);
            });
    }

    function updateRating(bookId, newRating) {
            let bookToUpdate = findBook(bookId);
            bookToUpdate.rating = newRating;

            return Utils.sendRequest(
                AJAX_BOOKS_URL + URL_SEPARATOR + bookId, bookToUpdate,
                requestType.PUT);
    }


    function getAllBooks() {
        return Utils.sendRequest(AJAX_BOOKS_URL, null,
            requestType.GET)
            .then(function (data) {
//                booksStorage = data._embedded.books;
                booksStorage = data;
                console.log("Получены книги: " + booksStorage);
            });
    }


    function getAllCatalogs() {
        return Utils.sendRequest(AJAX_CATALOGS_URL, null,
            requestType.GET)
            .then(function (data) {
                catalogsStorage = data;
                console.log("Получены каталоги: " + catalogsStorage);
            });
    }

    async function refreshBooks() {
        await getAllBooks();
    }

    async function refreshCatalogs() {
        await getAllCatalogs();
    }

    function getBooksStorage() {
        return booksStorage;
    }

    function getCatalogsStorage() {
        return catalogsStorage;
    }


    function deleteBook(bookId) {
        return Utils.sendRequest(AJAX_BOOKS_URL, bookId, requestType.DELETE)
            .then(async function () {
                await refreshModel();

                alert("Book " + bookId + " was deleted");

            });
    }

    return {
        addBook,
        updateRating,

        getBooksStorage,
        getCatalogsStorage,
        getAllBooks,
        getAllCatalogs,

        onBookAdd,
        refreshBooks,
        refreshCatalogs,
        deleteBook
    }
}