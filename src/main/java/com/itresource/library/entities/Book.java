package com.itresource.library.entities;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "\"BOOKS\"", indexes = {@Index(name = "BOOKS_TITLE_AUTHOR_unique",
    columnList = "\"TITLE\", \"AUTHOR\"", unique = true)})
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "\"ID\"", nullable = false)
    private Integer id;
    
    @Column(name = "\"TITLE\"", nullable = false)
    private String title;
    
    @Column(name = "\"AUTHOR\"", nullable = false)
    private String author;
    
    @Column(name = "\"RELEASE_DATE\"")
    private LocalDate releaseDate;
    
    //    @ManyToMany
    //    @JoinTable(name = "BOOK_PLACEMENTS",
    //        joinColumns = @JoinColumn(name = "BOOK_ID"),
    //        inverseJoinColumns = @JoinColumn(name = "CATALOG_ID"))
    //    private Set<Catalog> catalogs = new LinkedHashSet<>();
    
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getAuthor() {
        return author;
    }
    
    public void setAuthor(String author) {
        this.author = author;
    }
    
    public LocalDate getReleaseDate() {
        return releaseDate;
    }
    
    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }
    
    //    public Set<Catalog> getCatalogs() {
    //        return catalogs;
    //    }
    //
    //    public void setCatalogs(Set<Catalog> catalogs) {
    //        this.catalogs = catalogs;
    //    }
    
    //    @Override
    //    public String toString() {
    //        return "Book{" +
    //                   "id=" + id +
    //                   ", title='" + title + '\'' +
    //                   ", author='" + author + '\'' +
    //                   ", releaseDate='" + releaseDate + '\'' +
    //                   '}';
    //    }
    
}