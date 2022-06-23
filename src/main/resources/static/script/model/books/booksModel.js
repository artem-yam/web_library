function BooksModel() {
    "use strict";

    const AJAX_BOOKS_URL = "books";
    const AJAX_CATALOGS_URL = "catalogs";
    const AJAX_BOOK_CATALOG_URL = "catalog";
    const URL_SEPARATOR = "/";

    let booksStorage = [];
    let catalogsStorage = [];
    let onBooksRefresh = new EventEmitter();

    function addBook(newBook) {
        return Utils.sendRequest(AJAX_BOOKS_URL, newBook, requestType.POST)
            .then(function (response) {
                onBooksRefresh.notify(response.title, response.author);
            });
    }

    function updateBook(book) {
        return Utils.sendRequest(AJAX_BOOKS_URL + URL_SEPARATOR + book.id,
            book, requestType.PUT)
            .then(function (response) {
                onBooksRefresh.notify(response.title, response.author);
            });
    }

    function updateBook(book) {
        return Utils.sendRequest(AJAX_BOOKS_URL + URL_SEPARATOR + book.id,
            book, requestType.PUT)
            .then(function (response) {
                onBooksRefresh.notify(response.title, response.author);
            });
    }


    function deleteBook(bookId) {
        return Utils.sendRequest(AJAX_BOOKS_URL + URL_SEPARATOR + bookId,
            null, requestType.DELETE)
            .then(function (response) {
                onBooksRefresh.notify(response.title, response.author);
            });
    }

    function changeBookCatalog(bookId, newCatalog) {
        return Utils.sendRequest(AJAX_BOOKS_URL + URL_SEPARATOR + bookId +
            URL_SEPARATOR + AJAX_BOOK_CATALOG_URL, newCatalog, requestType.PATCH)
            .then(function (response) {
                onBooksRefresh.notify(response.title, response.author);
            });
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

    return {
        addBook,
        updateBook,
        changeBookCatalog,

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