package com.example;

import jakarta.annotation.security.RolesAllowed;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/coordinator")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CoordinatorResource {

    //Listar a matriz curricular por curso e semestre
    @GET
    @Path("/{courseId}/{semesterId}")
    @RolesAllowed("coordenador")
    public List<CurriculumMatrix> list(
            @PathParam("semesterId") Long semesterId,
            @PathParam("courseId") Long courseId) {

        return CurriculumMatrix.findByCourseAndSemester(courseId, semesterId);
    }

    //Adicionar nova disciplina à matriz curricular
    @POST
    @Transactional
    @RolesAllowed("coordenador")
    public Response addToMatrix(CurriculumMatrix matrixEntry) {
        matrixEntry.persist();
        return Response.status(Response.Status.CREATED).entity(matrixEntry).build();
    }

    //Atualizar entrada da matriz curricular (disciplina em curso/semestre)
    @PUT
    @Path("/{id}")
    @Transactional
    @RolesAllowed("coordenador")
    public Response updateMatrix(@PathParam("id") Long id, CurriculumMatrix updated) {
        CurriculumMatrix existing = CurriculumMatrix.findById(id);
        if (existing == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        existing.course = updated.course;
        existing.semester = updated.semester;
        existing.subject = updated.subject;

        return Response.ok(existing).build();
    }

    //Remover disciplina da matriz
    @DELETE
    @Path("/{id}")
    @Transactional
    @RolesAllowed("coordenador")
    public Response deleteFromMatrix(@PathParam("id") Long id) {
        boolean deleted = CurriculumMatrix.deleteById(id);
        if (!deleted) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.noContent().build();
    }
}
