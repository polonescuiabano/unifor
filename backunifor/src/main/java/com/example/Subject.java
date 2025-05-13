package com.example;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;

@Entity
public class Subject extends PanacheEntity {
    public String name;
    public int hours;
}
