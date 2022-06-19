package com.itresource.library.repositories;

import com.itresource.library.entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BooksRepository extends CrudRepository<Book, Integer> {
//public interface BooksRepository extends JpaRepository<Book, Integer> {
}
