package com.itresource.library.entities;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "\"CATALOGS\"", indexes = {
    @Index(name = "CATALOGS_NAME_unique", columnList = "\"NAME\"", unique = true)})
public class Catalog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "\"ID\"", nullable = false)
    private Integer id;
    
    @Column(name = "\"NAME\"", nullable = false)
    private String name;
    
    @ManyToMany
    @JoinTable(name = "BOOK_PLACEMENTS",
        joinColumns = @JoinColumn(name = "CATALOG_ID"),
        inverseJoinColumns = @JoinColumn(name = "BOOK_ID"))
    private Set<Book> books = new LinkedHashSet<>();
    
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public Set<Book> getBooks() {
        return books;
    }
    
    public void setBooks(Set<Book> books) {
        this.books = books;
    }
    
}