function BooksModel() {
    "use strict";

    const AJAX_BOOKS_URL = "books";
    const AJAX_CATALOGS_URL = "catalogs";
    const URL_SEPARATOR = "/";

    let booksStorage = [];
    let catalogsStorage = [];
    let onBooksRefresh = new EventEmitter();

    function addBook(bookFormData) {
        return Utils.sendRequest(AJAX_BOOKS_URL, bookFormData, requestType.POST)
            .then(function (response) {
                onBooksRefresh.notify(response.title, response.author);
            });
    }

    function updateBook(bookFormData) {
        return Utils.sendRequest(AJAX_BOOKS_URL, bookFormData, requestType.PUT)
            .then(function (response) {
                onBooksRefresh.notify(response.title, response.author);
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
                console.log("Получены книги:");
                console.log(...booksStorage);
            });
    }


    function getAllCatalogs() {
        return Utils.sendRequest(AJAX_CATALOGS_URL, null,
            requestType.GET)
            .then(function (data) {
                catalogsStorage = data;
                console.log("Получены каталоги:");
                console.log(...catalogsStorage);
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
        updateBook,

        getBooksStorage,
        getCatalogsStorage,
        getAllBooks,
        getAllCatalogs,

        onBooksRefresh,
        refreshBooks,
        refreshCatalogs,
        deleteBook
    }
}