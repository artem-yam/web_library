package com.itresource.library.repositories;

import com.itresource.library.entities.Catalog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CatalogsRepository extends CrudRepository<Catalog, Integer> {
    
    Optional<Catalog> findByName(String name);
}
