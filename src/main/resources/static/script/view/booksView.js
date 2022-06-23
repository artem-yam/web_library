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

        bookBlock.querySelector("#update_book_button" + book.id)
            .addEventListener('click', function () {
                console.log("Изменяем книгу: " + book.id);

                if (!window.document.querySelector("#book_title" + book.id).value
                    || !window.document.querySelector("#book_author" + book.id).value) {
                    alert("При изменении книги не заполнены поля");
                } else {
                    if (confirm("Изменить книгу?")) {
                        let bookId =  window.document.querySelector("#book_id" + book.id).value;
                        let bookTitle =  window.document.querySelector("#book_title" + book.id).value;
                        let bookAuthor =  window.document.querySelector("#book_author" + book.id).value;
                        let bookReleaseDate =  window.document.querySelector("#book_date" + book.id).value;
                        let bookCatalog = null;

                        let catalogName = window.document.querySelector("#book_catalog" + book.id).value;

                        for (let catalog of booksModel.getCatalogsStorage()) {
                            if (catalog.name == catalogName) {
                                bookCatalog = catalog;
                                break;
                            }
                        }

                        if (bookCatalog) {
                            let book = new Book(bookId, bookTitle,
                                bookAuthor, bookReleaseDate, bookCatalog);

                            console.log("Данные книги при обновлении: ");
                            console.log(JSON.stringify(book));

                            updateBook(book);
                        }
                    }
                }
            });

        bookBlock.querySelector("#change_book_catalog_button" + book.id)
            .addEventListener('click', function () {

                if (confirm("Изменить каталог книги?")) {
                    let catalogName = window.document.querySelector("#book_catalog" + book.id).value;
                    let newCatalog = null;

                    for (let catalog of booksModel.getCatalogsStorage()) {
                        if (catalog.name != catalogName) {
                            newCatalog = catalog;
                            break;
                        }
                    }

                    if (newCatalog == null) {
                        alert("Не обнаружен каталог для изменения!");
                    } else {
                        console.log("Изменяем каталог книги: " + book.id);
                        console.log("Новый каталог: " + JSON.stringify(newCatalog));
                        changeBookCatalog(book.id, newCatalog);
                    }
                }
            });

        bookBlock.querySelector("#delete_book_button" + book.id)
            .addEventListener('click', function () {

                if (confirm("Удалить книгу?")) {
                    let bookId =  window.document.querySelector("#book_id" + book.id).value;

                    deleteBook(bookId);
                }
            });

        booksTable.appendChild(bookBlock);
    }

    function changeBookCatalog(bookId, newCatalog) {
            mainController.changeBookCatalog(bookId, newCatalog).catch(function (errors) {
                alert("Ошибки при изменении книги: " + errors.responseJSON);
            });
        }

    function updateBook(book) {
        mainController.updateBook(book).catch(function (errors) {
            alert("Ошибки при изменении книги: " + errors.responseJSON);
        });
    }

    function deleteBook(bookId) {
        mainController.deleteBook(bookId).catch(function (errors) {
            alert("Ошибки при удалении книги: " + errors.responseJSON);
        });
    }

    function setUpCatalogs() {
            booksModel.refreshCatalogs().then(function () {
                let catalogsSelectBlock = window.document.querySelector("#catalogs_select");
                Utils.resetInnerHTML(catalogsSelectBlock);

                for (let i = 0; i < booksModel.getCatalogsStorage().length; i++) {
                    addSelectOption(booksModel.getCatalogsStorage()[i]);
                }
            });
        }

    function addSelectOption(catalog) {
        let catalogsSelectBlock = window.document.querySelector("#catalogs_select");

        catalogsSelectBlock.innerHTML+="<option>" + catalog.name + "</option>";
    }


    function showAllBooks() {
        booksModel.refreshBooks().then(function () {
            Utils.resetInnerHTML(
                window.document.querySelector(".all_books_table"));

            let headerTemplate = window.document.querySelector("#table_header_template");
            let booksTable = window.document.querySelector(".all_books_table");
            let headerBlock = headerTemplate.content.cloneNode(true);
            booksTable.appendChild(headerBlock);

            for (let i = 0; i < booksModel.getBooksStorage().length; i++) {
                if (!booksModel.getBooksStorage()[i].deleted) {
                    createBlock(booksModel.getBooksStorage()[i]);
                }
            }
        });
    }

    function addBook(newBook) {
        mainController.addBook(newBook).catch(function (errors) {
            alert("Ошибки при добавлении книги: " + errors.responseJSON);
        });
    }

    window.document.querySelector("#add_book_button")
        .addEventListener("click", function (event) {

            if (! window.document.querySelector("#new_book_title").value
                || ! window.document.querySelector("#new_book_author").value) {
                alert("При добавлении книги не заполнены поля");
            } else {
                if (confirm("Добавить книгу?")) {
                    let newBookTitle =  window.document.querySelector("#new_book_title").value;
                    let newBookAuthor =  window.document.querySelector("#new_book_author").value;
                    let newBookReleaseDate =  window.document.querySelector("#new_book_date").value;
                    let newBookCatalog = null;

                    let catalogName = window.document.querySelector("#catalogs_select").value;

                    for (let catalog of booksModel.getCatalogsStorage()) {
                        if (catalog.name == catalogName) {
                            newBookCatalog = catalog;
                            break;
                        }
                    }

                    if (newBookCatalog) {
                        let newBook = new Book(null, newBookTitle,
                            newBookAuthor, newBookReleaseDate, newBookCatalog);

                        console.log("Данные новой книги при добавлении: ");
                        console.log(JSON.stringify(newBook));

                        addBook(newBook);
                    }
                }
            }
        });

    model.onBooksRefresh.subscribe(function (title, author) {
        booksModel.refreshBooks()
            .then(function () {
                alert(
                    "Операция с книгой '" + author + " - " + title + "' была выполнена!");

                showAllBooks();
            });
    });

    return {
        setUpCatalogs,
        showAllBooks
    };
}