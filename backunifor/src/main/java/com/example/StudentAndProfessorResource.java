package com.example;

import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/student-professor")
@Produces(MediaType.APPLICATION_JSON)
public class StudentAndProfessorResource {

    @GET
    @Path("/list_matrix/{courseId}/{semesterId}")
    @RolesAllowed({"coordenador", "professor", "aluno", "administrador"})
    public List<CurriculumMatrix> list(@PathParam("semesterId") Long semesterId,
                                       @PathParam("courseId") Long courseId) {
        return CurriculumMatrix.findByCourseAndSemester(courseId, semesterId);
    }

    @GET
    @Path("/courses")
    @RolesAllowed({"coordenador", "professor", "aluno", "administrador"})
    public List<Course> listCourses() {
        return CurriculumMatrix.findDistinctCourses();
    }

    @GET
    @Path("/semesters")
    @RolesAllowed({"coordenador", "professor", "aluno", "administrador"})
    public List<Semester> listSemesters() {
        return CurriculumMatrix.findDistinctSemesters();
    }
}
