package com.example;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import java.util.Map;

@ApplicationScoped
public class KeycloakAdminService {

    private static final String KEYCLOAK_BASE_URL = "http://localhost:8081";
    private static final String REALM = "unifor";
    private static final String CLIENT_ID = "realm-management";
    private static final String CLIENT_SECRET = "itcgGK8EIPnnHn0IOr1acYC4ARqySzLX";

    @Inject
    @RestClient
    KeycloakClient keycloakClient;

    private String getAdminToken() {
        // Realiza a obtenção do token com client_id e client_secret
        Map<String, String> body = Map.of(
                "client_id", CLIENT_ID,
                "client_secret", CLIENT_SECRET,
                "grant_type", "client_credentials"
        );

        Response response = keycloakClient.getToken(body);

        if (response.getStatus() == 200) {
            // Parse do JSON e retorno do token
            Map<String, Object> tokenResponse = response.readEntity(Map.class);
            return tokenResponse.get("access_token").toString();
        } else {
            throw new RuntimeException("Falha ao obter token: " + response.getStatus());
        }
    }

    public Response listUsers() {
        String token = getAdminToken();
        Response response = keycloakClient.getUsers("Bearer " + token);
        if (response.getStatus() == 200) {
            return Response.ok(response.readEntity(String.class)).build();
        } else {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Erro ao listar usuários: " + response.getStatus())
                    .build();
        }
    }

    public Response createUser(Map<String, Object> userData) {
        String token = getAdminToken();
        Response response = keycloakClient.createUser("Bearer " + token, userData);
        if (response.getStatus() == 201) {
            return Response.status(Response.Status.CREATED).entity(response.readEntity(String.class)).build();
        } else {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Erro ao criar usuário: " + response.getStatus())
                    .build();
        }
    }

    public Response updateUser(String userId, Map<String, Object> userData) {
        String token = getAdminToken();
        Response response = keycloakClient.updateUser("Bearer " + token, userId, userData);
        if (response.getStatus() == 200) {
            return Response.ok(response.readEntity(String.class)).build();
        } else {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Erro ao atualizar usuário: " + response.getStatus())
                    .build();
        }
    }

    public Response deleteUser(String userId) {
        String token = getAdminToken();
        Response response = keycloakClient.deleteUser("Bearer " + token, userId);
        if (response.getStatus() == 204) {
            return Response.status(Response.Status.NO_CONTENT).build();
        } else {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Erro ao deletar usuário: " + response.getStatus())
                    .build();
        }
    }
}
