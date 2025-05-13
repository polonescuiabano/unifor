package com.example;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

import java.util.List;

@Entity
public class CurriculumMatrix extends PanacheEntity {
    @ManyToOne
    public Course course;

    @ManyToOne
    public Semester semester;

    @ManyToOne
    public Subject subject;

    public static List<CurriculumMatrix> findByCourseAndSemester(Long courseId, Long semesterId) {
        return find("course.id = ?1 and semester.id = ?2", courseId, semesterId).list();
    }
    public static List<Course> findDistinctCourses() {
        return getEntityManager()
                .createQuery("SELECT DISTINCT c.course FROM CurriculumMatrix c", Course.class)
                .getResultList();
    }

    public static List<Semester> findDistinctSemesters() {
        return getEntityManager()
                .createQuery("SELECT DISTINCT c.semester FROM CurriculumMatrix c", Semester.class)
                .getResultList();
    }
}
