package com.itresource.library.controllers;

import com.itresource.library.entities.Catalog;
import com.itresource.library.services.LibraryDataService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/catalogs")
public class CatalogsController {
    
    private static final Logger logger = LogManager.getLogger(
        CatalogsController.class);
    
    @Autowired
    private LibraryDataService libraryDataService;
    
    //    @GetMapping("/{id}")
    //    public Book getBookById(@PathVariable int id) {
    //        logger.info("Getting book with id {}", id);
    //        return libraryDataService.getBookById(id);
    //    }
    
    @GetMapping
    public List<Catalog> getAllCatalogs() {
        logger.info("Getting all catalog");
        return libraryDataService.getAllCatalogs();
    }
    
}
