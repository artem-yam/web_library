package com.itresource.library.controllers;

import com.itresource.library.entities.Book;
import com.itresource.library.entities.Catalog;
import com.itresource.library.services.LibraryDataService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/books")
public class BooksController {
    
    private static final Logger logger = LogManager.getLogger(
        BooksController.class);
    
    @Autowired
    private LibraryDataService libraryDataService;
    
    @GetMapping
    public List<Book> getAllBooks() {
        logger.info("Getting all books");
        return libraryDataService.getAllBooks();
    }
    
    @PostMapping
    public ResponseEntity addBook(@RequestBody Book newBook) {
        
        logger.info("Adding book : {}", newBook);
        
        List<String> errors = new ArrayList<>();
        ResponseEntity responseEntity = new ResponseEntity<>(errors,
            HttpStatus.NOT_ACCEPTABLE);
        
        try {
            responseEntity = new ResponseEntity<>(
                libraryDataService.saveBook(newBook), HttpStatus.OK);
        } catch (Exception ex) {
            logger.info("Can't add new book", ex);
            errors.add(ex.getMessage());
        }
        
        logger.info("Add book method returns: {}", responseEntity);
        
        return responseEntity;
    }
    
    @PutMapping("/{bookId}")
    public ResponseEntity updateBook(@PathVariable int bookId,
        @RequestBody Book updatedBook) {
        
        updatedBook.setId(bookId);
        
        logger.info("Updating book : {}", updatedBook);
        
        List<String> errors = new ArrayList<>();
        ResponseEntity responseEntity = new ResponseEntity<>(errors,
            HttpStatus.NOT_ACCEPTABLE);
        
        try {
            responseEntity = new ResponseEntity<>(
                libraryDataService.updateBook(updatedBook), HttpStatus.OK);
        } catch (Exception ex) {
            logger.info("Can't update book", ex);
            errors.add(ex.getMessage());
        }
        
        logger.info("Update book method returns: {}", responseEntity);
        
        return responseEntity;
    }
    
    @PatchMapping("/{bookId}/catalog")
    public ResponseEntity changeBookCatalog(@PathVariable int bookId,
        @RequestBody Catalog catalog) {
        
        logger.info("For book with id '" + bookId + "' changing catalog to: " +
                        catalog);
        
        List<String> errors = new ArrayList<>();
        ResponseEntity responseEntity = new ResponseEntity<>(errors,
            HttpStatus.NOT_ACCEPTABLE);
        
        try {
            responseEntity = new ResponseEntity<>(
                libraryDataService.changeBookCatalog(bookId, catalog),
                HttpStatus.OK);
        } catch (Exception ex) {
            logger.info("Can't change book catalog", ex);
            errors.add(ex.getMessage());
        }
        
        logger.info("Change book catalog method returns: {}", responseEntity);
        
        return responseEntity;
    }
    
    @DeleteMapping("/{bookId}")
    public ResponseEntity deleteBook(@PathVariable int bookId) {
        
        logger.info("Deleting book with id '" + bookId + "'");
        
        List<String> errors = new ArrayList<>();
        ResponseEntity responseEntity = new ResponseEntity<>(errors,
            HttpStatus.NOT_ACCEPTABLE);
        
        try {
            responseEntity = new ResponseEntity<>(
                libraryDataService.deleteBook(bookId), HttpStatus.OK);
        } catch (Exception ex) {
            logger.info("Can't delete book", ex);
            errors.add(ex.getMessage());
        }
        
        logger.info("Change book catalog method returns: {}", responseEntity);
        
        return responseEntity;
    }
    
}
