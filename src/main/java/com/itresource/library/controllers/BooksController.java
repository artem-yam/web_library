package com.itresource.library.controllers;

import com.itresource.library.entities.Book;
import com.itresource.library.services.LibraryDataService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/books")
public class BooksController {
    
    private static final Logger logger = LogManager.getLogger(
        BooksController.class);
    
    @Autowired
    private LibraryDataService libraryDataService;
    
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
        
//        try {
//            newBook = dao.addBook(newBook.getTitle(), newBook.getAuthor(),
//                newBook.getImage() == null ? new byte[0] :
//                    newBook.getImage().getBytes());
//
//            responseEntity = new ResponseEntity<>(newBook, HttpStatus.OK);
//        } catch (Exception ex) {
//            String errorMessage = BOOK_ADD_ERROR_MESSAGE;
//            if (ex instanceof DuplicateKeyException) {
//                errorMessage = DUPLICATE_KEY_ERROR_MESSAGE;
//            }
//
//            logger.debug("Can't add new book", ex);
//
//            errors.add(errorMessage);
//        }
        
        logger.info("Add book method returns: {}", responseEntity);
        
        return responseEntity;
    }
    
}
