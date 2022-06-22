package com.itresource.library.controllers;

import com.itresource.library.entities.Book;
import com.itresource.library.services.LibraryDataService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
    
    @Autowired
    private CatalogsController catalogsController;
    
    //    @GetMapping("/{id}")
    //    public Book getBookById(@PathVariable int id) {
    //        logger.info("Getting book with id {}", id);
    //        return libraryDataService.getBookById(id);
    //    }
    
    @GetMapping
    public List<Book> getAllBooks() {
        logger.info("Getting all books");
        return libraryDataService.getAllBooks();
    }
    
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity addBook(Book newBook) {
        
        logger.info("Adding book : {}", newBook);
        
        List<String> errors = new ArrayList<>();
        ResponseEntity responseEntity = new ResponseEntity<>(errors,
            HttpStatus.NOT_ACCEPTABLE);
        
        try {
            responseEntity = new ResponseEntity<>(
                libraryDataService.saveBook(newBook),
                HttpStatus.OK);
        } catch (Exception ex) {
            logger.info("Can't add new book", ex);
            errors.add(ex.getMessage());
        }
        
        logger.info("Add book method returns: {}", responseEntity);
        
        return responseEntity;
    }
    
    @PutMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity updateBook(Book updatedBook) {
        
        logger.info("Updating book : {}", updatedBook);
        
        List<String> errors = new ArrayList<>();
        ResponseEntity responseEntity = new ResponseEntity<>(errors,
            HttpStatus.NOT_ACCEPTABLE);
        
        try {
            responseEntity = new ResponseEntity<>(
                libraryDataService.updateBook(updatedBook),
                HttpStatus.OK);
        } catch (Exception ex) {
            logger.info("Can't update book", ex);
            errors.add(ex.getMessage());
        }
        
        logger.info("Update book method returns: {}", responseEntity);
        
        return responseEntity;
    }
    
}
