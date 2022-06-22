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

        bookBlock.querySelector("#book_id").setAttribute("value",
            book.id);
        bookBlock.querySelector("#book_id").setAttribute("id",
            "book_id" + book.id);

        bookBlock.querySelector("#book_title").setAttribute("value",
            book.title);
        bookBlock.querySelector("#book_title_label").setAttribute("for",
            "book_title" + book.id);
        bookBlock.querySelector("#book_title").setAttribute("id",
            "book_title" + book.id);

        bookBlock.querySelector("#book_author").setAttribute("value",
            book.author);
        bookBlock.querySelector("#book_author_label").setAttribute("for",
            "book_author" + book.id);
        bookBlock.querySelector("#book_author").setAttribute("id",
            "book_author" + book.id);

        bookBlock.querySelector("#book_date").setAttribute("value",
            book.releaseDate);
        bookBlock.querySelector("#book_date_label").setAttribute("for",
            "book_date" + book.id);
        bookBlock.querySelector("#book_date").setAttribute("id",
            "book_date" + book.id);

        bookBlock.querySelector("#book_catalog").setAttribute("value",
            book.catalog.name);
        bookBlock.querySelector("#book_catalog_label").setAttribute("for",
            "book_catalog" + book.id);
        bookBlock.querySelector("#book_catalog").setAttribute("id",
            "book_catalog" + book.id);

        bookBlock.querySelector("#update_book_button").setAttribute("id",
            "update_book_button" + book.id);
        bookBlock.querySelector("#change_book_catalog_button").setAttribute("id",
            "change_book_catalog_button" + book.id);
        bookBlock.querySelector("#delete_book_button").setAttribute("id",
            "delete_book_button" + book.id);

//        console.log("Элемент с названием книги: " + bookBlock.querySelector("#book_title" + book.id).getAttribute("value"));

        bookBlock.querySelector("#update_book_button" + book.id)
            .addEventListener('click', function () {
                console.log("Изменяем книгу: " + book.id);

                if (!window.document.querySelector("#book_title" + book.id).value
                    || !window.document.querySelector("#book_author" + book.id).value) {
                    alert("При изменении книги не заполнены поля");
                } else {
                    if (confirm("Изменить книгу?")) {
//                        mainController.updateBook(book.id).then(function () {
//                            window.document.location.reload(true);
//                        });

                         let bookForm = window.document.forms.namedItem("book_form" + book.id);
                         let bookFormData = new FormData(bookForm);

                         let catalogName = window.document.querySelector("#book_catalog" + book.id).value;

                         for (let catalog of booksModel.getCatalogsStorage()) {
                            if (catalog.name == catalogName) {
                                bookFormData.append("catalog", catalog.id);
                                break;
                            }
                        }

                        console.log("formData при обновлении: ");
                        console.log(...bookFormData);

                        updateBook(bookFormData);
                    }
                }
            });

        booksTable.appendChild(bookBlock);
    }


    function updateBook(bookFormData) {
        mainController.updateBook(bookFormData).catch(function (errors) {
            alert("Ошибки при изменении книги: " + errors.responseJSON);
        });
    }

    function setUpCatalogs() {
            booksModel.refreshCatalogs().then(function () {
                let catalogsSelectBlock = window.document.querySelector("#catalogs_select");
                Utils.resetInnerHTML(catalogsSelectBlock);

//                console.log("Отображаем каталоги" + booksModel.getCatalogsStorage());

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

//            console.log("Отображаем книги: ");
//            console.log(...booksModel.getBooksStorage());


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
//            event.preventDefault();

//            let bookForm = document.forms.namedItem("add_book_form");
//            let bookFormData = new FormData(bookForm);
//
//            console.log("new_book_title: "+window.document.querySelector("#new_book_title").value);
//


            if (! window.document.querySelector("#new_book_title").value
                || ! window.document.querySelector("#new_book_author").value) {
                alert("При добавлении книги не заполнены поля");
            } else {
                if (confirm("Добавить книгу?")) {

                    let bookForm = window.document.forms.namedItem("add_book_form");
                    let bookFormData = new FormData(bookForm);
//                    bookFormData.append("releaseDate", window.document.querySelector("#new_book_date").valueAsNumber);
//                    bookFormData.append("releaseDate", window.document.querySelector("#new_book_date").value);
//                    bookFormData.releaseDate = window.document.querySelector("#new_book_date").valueAsDate;

                    let catalogName = window.document.querySelector("#catalogs_select").value;

                    for (let catalog of booksModel.getCatalogsStorage()) {
                        if (catalog.name == catalogName) {
                            bookFormData.append("catalog", catalog.id);
                            break;
                        }
                    }

                    console.log("formData при добавлении: ");
                    console.log(...bookFormData);

                    addBook(bookFormData);
                }
            }
        });

    model.onBooksRefresh.subscribe(function (title, author) {
        booksModel.refreshBooks()
            .then(function () {
                alert(
                    "Книга '" + author + " - " + title + "' была добавлена или обновлена!");

                showAllBooks();
            });
    });

    return {
        setUpCatalogs,
        showAllBooks
    };
}