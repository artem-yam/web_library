package com.itresource.library.repositories;

import com.itresource.library.entities.BookPlacement;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookPlacementsRepository
    extends CrudRepository<BookPlacement, Integer> {
}
