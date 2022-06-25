(function () {
    "use strict";

    async function init() {

        let booksModel = new BooksModel();

        let controller = new Controller(booksModel);

        let booksView = new BooksView(controller, booksModel);

        await booksView.setUpCatalogs();
        await booksView.showAllBooks();
    }

    window.addEventListener("load", init);

}());