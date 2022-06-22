package com.itresource.library.entities;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "\"CATALOGS\"", indexes = {
    @Index(name = "CATALOGS_NAME_unique", columnList = "\"NAME\"",
        unique = true)})
public class Catalog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "\"ID\"", nullable = false)
    private Integer id;
    
    @Column(name = "\"NAME\"", nullable = false)
    private String name;
    
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    @Override
    public String toString() {
        return "Catalog{" + "id=" + id + ", name='" + name + '\'' + '}';
    }
}