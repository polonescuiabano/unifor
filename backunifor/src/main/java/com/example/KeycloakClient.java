package com.example;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import java.util.Map;

@Path("/realms/unifor/protocol/openid-connect")
public interface KeycloakClient {

    @POST
    @Path("/token")
    @Consumes("application/x-www-form-urlencoded")
    @Produces("application/json")
    Response getToken(Map<String, String> body);

    @GET
    @Path("/admin/realms/unifor/users")
    @Produces("application/json")
    Response getUsers(@HeaderParam("Authorization") String authorizationHeader);

    @POST
    @Path("/admin/realms/unifor/users")
    @Consumes("application/json")
    @Produces("application/json")
    Response createUser(@HeaderParam("Authorization") String authorizationHeader, Map<String, Object> userData);

    @PUT
    @Path("/admin/realms/unifor/users/{id}")
    @Consumes("application/json")
    @Produces("application/json")
    Response updateUser(@HeaderParam("Authorization") String authorizationHeader, @PathParam("id") String userId, Map<String, Object> userData);

    @DELETE
    @Path("/admin/realms/unifor/users/{id}")
    @Produces("application/json")
    Response deleteUser(@HeaderParam("Authorization") String authorizationHeader, @PathParam("id") String userId);
}

