package com.itresource.library.services;

import com.itresource.library.entities.Book;
import com.itresource.library.entities.Catalog;
import com.itresource.library.repositories.BooksRepository;
import com.itresource.library.repositories.CatalogsRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class LibraryDataService {
    
    private static final Logger logger = LogManager.getLogger(
        LibraryDataService.class);
    private static final String DEFAULT_CATALOG_NAME = "public";
    
    @Autowired
    private BooksRepository booksRepository;
    
    @Autowired
    private CatalogsRepository catalogsRepository;
    
    public List<Book> getAllBooks() {
        Iterable<Book> books = booksRepository.findAll();
        
        logger.info("All found books: {}", books);
        
        List<Book> booksList = new ArrayList<>();
        books.forEach(booksList::add);
        booksList.sort(Comparator.comparingInt(Book::getId));
        return booksList;
    }
    
    public Book saveBook(Book book) {
        Book savedBook = null;
        
        Optional<Catalog> catalog = catalogsRepository.findByName(
            book.getCatalog().getName());
        
        if (!catalog.isPresent()) {
            catalog = catalogsRepository.findByName(DEFAULT_CATALOG_NAME);
        }
        
        if (catalog.isPresent()) {
            
            book.setCatalog(catalog.get());
            savedBook = booksRepository.save(book);
        }
        
        logger.info("Saved book: {}", savedBook);
        return savedBook;
    }
    
    public Book updateBook(Book book) {
        Book updatedBook = null;
        
        Optional<Catalog> catalog = catalogsRepository.findByName(
            book.getCatalog().getName());
        
        if (!catalog.isPresent()) {
            catalog = catalogsRepository.findByName(DEFAULT_CATALOG_NAME);
        }
        
        if (catalog.isPresent()) {
            
            book.setCatalog(catalog.get());
            updatedBook = booksRepository.save(book);
        }
        
        logger.info("Updated book: {}", updatedBook);
        return updatedBook;
    }
    
    public Book deleteBook(int bookId) {
        Optional<Book> book = booksRepository.findById(bookId);
        
        if (book.isPresent()) {
            booksRepository.delete(book.get());
    
            logger.info("Deleted book: {}", book.get());
            return book.get();
        }
        
        return null;
    }
    
    public Book changeBookCatalog(int bookId, Catalog newCatalog) {
        Book updatedBook = null;
        
        Optional<Book> bookOptional = booksRepository.findById(bookId);
        
        if (bookOptional.isPresent() && catalogsRepository.existsById(
            newCatalog.getId())) {
            
            Book updatingBook = bookOptional.get();
            
            updatingBook.setCatalog(newCatalog);
            
            updatedBook = booksRepository.save(updatingBook);
        }
        
        logger.info("Change book catalog: {}", updatedBook);
        return updatedBook;
    }
    
    public List<Catalog> getAllCatalogs() {
        Iterable<Catalog> catalogs = catalogsRepository.findAll();
        
        logger.info("All found catalogs: {}", catalogs);
        
        List<Catalog> catalogsList = new ArrayList<>();
        catalogs.forEach(catalogsList::add);
        return catalogsList;
    }
    
}
