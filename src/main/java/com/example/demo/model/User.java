package com.example.demo.model;


import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "app_user")
public class User implements Serializable{

    @Id
    @GeneratedValue
    private long id;

    @Column(name ="NAME")
    private String name;

    @Column(name ="AGE")
    private int age;

    @Column(name ="SALARY")
    private double salary;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }
}
