(function () {
    "use strict";

    async function init() {

        let booksModel = new BooksModel();

        let controller = new Controller(booksModel);

        let booksView = new BooksView(controller, booksModel);

//        await booksModel.refreshModel();

        await booksView.setUpCatalogs();
        await booksView.showAllBooks();
        //notificationsView.loadHistoryBar();
    }

    window.addEventListener("load", init);

}());