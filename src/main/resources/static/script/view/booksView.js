function BooksView(controller, model) {
    "use strict";

    let mainController = controller;
    let booksModel = model;

    function createBlock(book) {
        let template = window.document.querySelector("#table_row_template");
        let booksTable = window.document.querySelector(".all_books_table");

        let bookBlock = template.content.cloneNode(true);

        bookBlock.querySelector("form").setAttribute("name",
            "book_form" + book.id);

        bookBlock.querySelector("#book_title").setAttribute("value",
            "book_title" + book.id);
        bookBlock.querySelector("#book_title_label").setAttribute("for",
            "book_title" + book.id);
        bookBlock.querySelector("#book_title").setAttribute("id",
            "book_title" + book.id);

        bookBlock.querySelector("#book_author").setAttribute("value",
            "book_author" + book.id);
        bookBlock.querySelector("#book_author_label").setAttribute("for",
            "book_author" + book.id);
        bookBlock.querySelector("#book_author").setAttribute("id",
            "book_author" + book.id);

        bookBlock.querySelector("#book_date").setAttribute("value",
            "book_date" + book.id);
        bookBlock.querySelector("#book_date_label").setAttribute("for",
            "book_date" + book.id);
        bookBlock.querySelector("#book_date").setAttribute("id",
            "book_date" + book.id);

//        bookBlock.querySelector(".delete-book")
//            .addEventListener('click', function () {
//                if (confirm("Delete this book?")) {
//                    mainController.deleteBook(book.id).then(function () {
//                        window.document.location.reload(true);
//                    });
//                }
//            });

//            rating.querySelector("input")
//                            .addEventListener('change', function () {
//                                mainController.updateRating(book.id, i);
//                            });

        booksTable.appendChild(bookBlock);
    }

    function setUpCatalogs() {
            booksModel.refreshCatalogs().then(function () {
                let catalogsSelectBlock = window.document.querySelector("#catalogs_select");
                Utils.resetInnerHTML(catalogsSelectBlock);

                console.log("Отображаем каталоги" + booksModel.getCatalogsStorage());

                for (let i = 0; i < booksModel.getCatalogsStorage().length; i++) {
                    addSelectOption(booksModel.getCatalogsStorage()[i]);
                }
            });
        }

    function addSelectOption(catalog) {
        let catalogsSelectBlock = window.document.querySelector("#catalogs_select");

        catalogsSelectBlock.innerHTML+="<option>" + catalog.name + "</option>";
//        catalogsSelectBlock.innerHTML+="<option" + (selected ? " selected" : "") + ">" + catalog.name + "</option>";
    }


    function showAllBooks() {
        booksModel.refreshBooks().then(function () {
            Utils.resetInnerHTML(
                window.document.querySelector(".all_books_table"));

            let headerTemplate = window.document.querySelector("#table_header_template");
            let booksTable = window.document.querySelector(".all_books_table");
            let headerBlock = headerTemplate.content.cloneNode(true);
            booksTable.appendChild(headerBlock);

            console.log("Отображаем книги" + booksModel.getBooksStorage());


            for (let i = 0; i < booksModel.getBooksStorage().length; i++) {
                if (!booksModel.getBooksStorage()[i].deleted) {
                    createBlock(booksModel.getBooksStorage()[i]);
                }
            }
        });
    }


    function addBook(bookFormData) {
        mainController.addBook(bookFormData).catch(function (errors) {
            alert("Ошибки при добавлении книги: " + errors.responseJSON);
        });
    }

    window.document.querySelector("#add_book_button")
        .addEventListener("click", function (event) {
            event.preventDefault();


            if (! window.document.querySelector("#new_book_title").getAttribute("value")
                || ! window.document.querySelector("#new_book_author").getAttribute("value")) {
                alert("При добавлении книги не заполнены поля");
            } else {
                if (confirm("Добавить книгу?")) {

                    let bookForm = document.forms.namedItem("add_book_form");
                    let bookFormData = new FormData(bookForm);

                    addBook(bookFormData);
                }
            }
        });

    model.onBookAdd.subscribe(function (title, author) {
        booksModel.refreshModel()
            .then(function () {
                alert(
                    "Книга \"" + author + " - " + title + "\" была добавлена!");
            });
    });

    return {
        setUpCatalogs,
        showAllBooks
    };
}