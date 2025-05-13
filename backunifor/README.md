# backunifor

This project uses Quarkus, the Supersonic Subatomic Java Framework.

If you want to learn more about Quarkus, please visit its website: <https://quarkus.io/>.

## Running the application in dev mode

You can run your application in dev mode that enables live coding using:

```shell script
./mvnw quarkus:dev
```

> **_NOTE:_**  Quarkus now ships with a Dev UI, which is available in dev mode only at <http://localhost:8080/q/dev/>.

## Packaging and running the application

The application can be packaged using:

```shell script
./mvnw package
```

It produces the `quarkus-run.jar` file in the `target/quarkus-app/` directory.
Be aware that it’s not an _über-jar_ as the dependencies are copied into the `target/quarkus-app/lib/` directory.

The application is now runnable using `java -jar target/quarkus-app/quarkus-run.jar`.

If you want to build an _über-jar_, execute the following command:

```shell script
./mvnw package -Dquarkus.package.jar.type=uber-jar
```

The application, packaged as an _über-jar_, is now runnable using `java -jar target/*-runner.jar`.

## Creating a native executable

You can create a native executable using:

```shell script
./mvnw package -Dnative
```

Or, if you don't have GraalVM installed, you can run the native executable build in a container using:

```shell script
./mvnw package -Dnative -Dquarkus.native.container-build=true
```

You can then execute your native executable with: `./target/backunifor-1.0-SNAPSHOT-runner`

If you want to learn more about building native executables, please consult <https://quarkus.io/guides/maven-tooling>.

## Related Guides

- RESTEasy Classic JSON-B ([guide](https://quarkus.io/guides/rest-json)): JSON-B serialization support for RESTEasy
  Classic
- Hibernate ORM with Panache ([guide](https://quarkus.io/guides/hibernate-orm-panache)): Simplify your persistence code
  for Hibernate ORM via the active record or the repository pattern

## Provided Code

### Hibernate ORM

Create your first JPA entity

[Related guide section...](https://quarkus.io/guides/hibernate-orm)

[Related Hibernate with Panache section...](https://quarkus.io/guides/hibernate-orm-panache)

### RESTEasy JAX-RS

Easily start your RESTful Web Services

[Related guide section...](https://quarkus.io/guides/getting-started#the-jax-rs-resources)


🎓 Backend - Gestão de Matriz Curricular (Quarkus + Keycloak + PostgreSQL)
Este é o backend da aplicação de gerenciamento da matriz curricular da universidade, desenvolvido em Java com Quarkus, utilizando Hibernate ORM com Panache, autenticação via Keycloak, e persistência com PostgreSQL.

📌 Tecnologias utilizadas
Quarkus - Framework Java leve e moderno para microserviços

Hibernate ORM com Panache - ORM que simplifica o uso do Hibernate com entidades e consultas de forma reativa e enxuta

Keycloak - Servidor de identidade para autenticação e autorização

PostgreSQL - Banco de dados relacional

Jakarta REST / JAX-RS - Para criação das APIs REST

MicroProfile RestClient - Para comunicação REST com o Keycloak

🧠 Decisões de Arquitetura
🛠️ Uso do Hibernate com Panache
O Panache foi escolhido para facilitar o uso do Hibernate ORM. Ele permite:

Métodos prontos para persistência e consultas (findById, listAll, persist, deleteById, etc.)

Redução de boilerplate: não há necessidade de escrever repositórios ou DAOs

Consultas simplificadas com JPQL diretamente nas entidades

Exemplo de consulta customizada:

java
Copiar
Editar
public static List<CurriculumMatrix> findByCourseAndSemester(Long courseId, Long semesterId) {
    return find("course.id = ?1 and semester.id = ?2", courseId, semesterId).list();
}
🔐 Autenticação com Keycloak
A autenticação é centralizada via Keycloak.

Toda a tela de login é gerenciada pelo próprio servidor do Keycloak.

As roles (coordenador, professor, aluno, administrador) são atribuídas diretamente no Keycloak.

Os endpoints da API são protegidos com @RolesAllowed.

🔧 Configuração via application.properties
A seguir está um exemplo de configuração que deve ser ajustado de acordo com seu ambiente:

properties
Copiar
Editar
# Keycloak
quarkus.oidc.auth-server-url=http://localhost:8081/realms/unifor
quarkus.oidc.client-id=unifor-backend
quarkus.oidc.application-type=service

# Banco de Dados
quarkus.datasource.db-kind=postgresql
quarkus.datasource.jdbc.url=jdbc:postgresql://localhost:5432/seu_banco
quarkus.datasource.username=seu_usuario
quarkus.datasource.password=sua_senha

# Apenas para DEV - cuidado em produção!
%dev.quarkus.hibernate-orm.database.generation=drop-and-create

# CORS
quarkus.http.cors=true
quarkus.http.cors.origins=http://localhost:4200
quarkus.http.cors.methods=GET,PUT,POST,DELETE,OPTIONS
quarkus.http.cors.headers=accept,authorization,content-type,x-requested-with
⚠️ Atenção:
O modo drop-and-create apaga e recria o banco a cada reinício da aplicação. Use somente em desenvolvimento.

📄 Estrutura de Entidades
Course - Representa um curso.

Semester - Representa um semestre.

Subject - Representa uma disciplina.

CurriculumMatrix - Relaciona curso, semestre e disciplina.

📦 Endpoints principais
👨‍🏫 Coordenador
GET /coordinator/{courseId}/{semesterId} - Lista a matriz curricular

POST /coordinator - Adiciona entrada na matriz

PUT /coordinator/{id} - Atualiza entrada

DELETE /coordinator/{id} - Remove entrada

👨‍🎓 Professores e Alunos
GET /student-professor/courses - Lista cursos distintos

GET /student-professor/semesters - Lista semestres distintos

GET /student-professor/list_matrix/{courseId}/{semesterId} - Lista a matriz

👤 Administração (Keycloak)
GET /admin/list - Lista usuários do Keycloak

POST /admin/add_user - Cria usuário no Keycloak

PUT /admin/update_user/{id} - Atualiza usuário

DELETE /admin/delete_user/{id} - Deleta usuário

📥 Importação inicial via import.sql
Durante o ambiente de desenvolvimento, é possível popular o banco automaticamente com um arquivo import.sql.

Exemplo de conteúdo:

sql
Copiar
Editar
INSERT INTO course(id, name) VALUES (1, 'Sistemas de Informação');
INSERT INTO semester(id, number) VALUES (1, 1);
INSERT INTO subject(id, name, hours) VALUES (1, 'Programação I', 80);

INSERT INTO curriculum_matrix(id, course_id, semester_id, subject_id) VALUES (1, 1, 1, 1);
Esse script será executado automaticamente quando drop-and-create estiver ativo em ambiente de desenvolvimento.

▶️ Executando a aplicação
Certifique-se de que o banco e o Keycloak estejam rodando (via Docker Compose ou localmente).

Execute com:

bash
Copiar
Editar
./mvnw quarkus:dev
🔐 Gerenciando usuários no Keycloak
Administra os usuários diretamente no Keycloak.

Roles como coordenador, professor, aluno, administrador devem estar criadas no Realm unifor.

