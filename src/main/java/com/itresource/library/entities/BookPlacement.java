package com.itresource.library.entities;

import javax.persistence.*;

@Entity
@Table(name = "\"BOOK_PLACEMENTS\"")
public class BookPlacement {
    @Id
    @Column(name = "\"BOOK_ID\"", nullable = false)
    private Integer id;
    
    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "\"BOOK_ID\"", nullable = false)
    private Book book;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "\"CATALOG_ID\"")
    private Catalog catalog;
    
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public Book getBook() {
        return book;
    }
    
    public void setBook(Book book) {
        this.book = book;
    }
    
    public Catalog getCatalog() {
        return catalog;
    }
    
    public void setCatalog(Catalog catalog) {
        this.catalog = catalog;
    }
    
}