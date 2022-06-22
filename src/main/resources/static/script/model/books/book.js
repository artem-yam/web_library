function Book(id, title, author, releaseDate, catalog) {

    this.id = id;
    this.title = title;
    this.author = author;
    this.releaseDate = releaseDate;

    this.catalog = catalog || new Catalog(0, catalogTypes.PUBLIC);
}

