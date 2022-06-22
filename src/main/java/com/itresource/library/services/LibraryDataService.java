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
    
    //    public Book getBookById(int id) {
    //        Optional<Book> employeesOptional = booksRepository.findById(id);
    //
    //        logger.info("Found book: {}", employeesOptional.orElse(null));
    //
    //        return employeesOptional.orElse(null);
    //    }
    
    //    public Book updateBook(Book book) {
    //        if (booksRepository.existsById(book.getId())) {
    //            Book updatedBook = booksRepository.save(book);
    //
    //            logger.info("Updated book: {}", updatedBook);
    //            return updatedBook;
    //        } else {
    //            logger.info("Book {} WASN'T updated", book);
    //            return null;
    //        }
    //
    //    }
    
    //    @Transactional
    //    public boolean deleteBook(Book book) {
    //        Optional<BookPlacement> bookPlacement =
    //            bookPlacementsRepository.findById(book.getId());
    //        if (booksRepository.existsById(book.getId()) &&
    //                bookPlacement.isPresent()) {
    //
    //            bookPlacementsRepository.delete(bookPlacement.get());
    //
    //            booksRepository.delete(book);
    //            //        booksRepository.deleteById(book.getId());
    //
    //            logger.info("Deleted book: {}", book);
    //            return true;
    //        } else {
    //            logger.info("Book {} WASN'T delete", book);
    //            return false;
    //        }
    //    }
    
    //    public boolean changeBookCatalog(Book book, String catalogName) {
    //        Optional<Catalog> catalog = catalogsRepository.findByName
    //        (catalogName);
    //
    //        if (bookPlacementsRepository.existsById(book.getId()) &&
    //                catalog.isPresent()) {
    //            //            int catalogId = catalog.get().getId();
    //
    //            BookPlacement bookPlacement = new BookPlacement();
    //            //            bookPlacement.setId(book.getId());
    //            bookPlacement.setBook(book);
    //            bookPlacement.setCatalog(catalog.get());
    //
    //            bookPlacementsRepository.save(bookPlacement);
    //            //        booksRepository.deleteById(book.getId());
    //
    //            logger.info("Book {} moved to catalog '{}'", book,
    //            catalogName);
    //            return true;
    //        } else {
    //            logger.info("Book {} WASN'T moved to catalog '{}'", book,
    //                catalogName);
    //            return false;
    //        }
    //    }
    
    public List<Catalog> getAllCatalogs() {
        Iterable<Catalog> catalogs = catalogsRepository.findAll();
        
        logger.info("All found catalogs: {}", catalogs);
        
        List<Catalog> catalogsList = new ArrayList<>();
        catalogs.forEach(catalogsList::add);
        return catalogsList;
    }
    
    //    @Transactional
}
