package com.example;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.Map;

@Path("/admin")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AdminResource {

    @Inject
    KeycloakAdminService keycloakService;

    @GET
    @Path("/list")
    @RolesAllowed("administrador")
    public Response listUsers() {
        try {
            return keycloakService.listUsers();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Erro ao listar usuários: " + e.getMessage()).build();
        }
    }

    @POST
    @Path("/add_user")
    @RolesAllowed("administrador")
    public Response addUser(Map<String, Object> userData) {
        try {
            return keycloakService.createUser(userData);
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Erro ao adicionar usuário: " + e.getMessage()).build();
        }
    }

    @PUT
    @Path("/update_user/{id}")
    @RolesAllowed("administrador")
    public Response updateUser(@PathParam("id") String id, Map<String, Object> userData) {
        try {
            return keycloakService.updateUser(id, userData);
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Erro ao atualizar usuário: " + e.getMessage()).build();
        }
    }

    @DELETE
    @Path("/delete_user/{id}")
    @RolesAllowed("administrador")
    public Response deleteUser(@PathParam("id") String id) {
        try {
            return keycloakService.deleteUser(id);
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Erro ao deletar usuário: " + e.getMessage()).build();
        }
    }
}
