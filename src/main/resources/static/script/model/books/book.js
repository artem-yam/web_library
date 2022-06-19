function Book(id, title, author, releaseDate, catalog, deleted) {

    this.id = id;
    this.title = title;
    this.author = author;
    this.releaseDate = releaseDate;

    this.catalog = catalog || catalogTypes.PUBLIC;
    this.deleted = deleted || false;
}

