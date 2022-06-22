package com.itresource.library;

import com.itresource.library.entities.Book;
import com.itresource.library.repositories.BooksRepository;
import com.itresource.library.services.LibraryDataService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;

import java.util.Date;

@SpringBootTest
class LibraryApplicationTests {
    
    @Autowired
    private LibraryDataService libraryDataService;
    
    @Autowired
    private BooksRepository booksRepository;
    
    @Test
    void contextLoads() {
    }
    
    @Test
    void booksCRUDTest() {
        String strDate = "2022-06-06";
        String strDate2 = "1654473600000";
        System.out.println(new Date(strDate2));
        
        Book testBook = new Book();
        testBook.setId(10);
        testBook.setTitle("java test title тест");
        testBook.setAuthor("java test author");
        
        //		booksRepository.save(testBook);
        //		libraryDataService.saveBook(testBook, "private");
//        libraryDataService.deleteBook(testBook);
        
        Assert.notEmpty(libraryDataService.getAllBooks());
    }
    
}
