-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- insert into myentity (id, field) values(1, 'field-1');
-- insert into myentity (id, field) values(2, 'field-2');
-- insert into myentity (id, field) values(3, 'field-3');
-- alter sequence myentity_seq restart with 4;

INSERT INTO course(id, name) VALUES (1, 'Sistemas de Informação');
INSERT INTO semester(id, number) VALUES (1, 1);
INSERT INTO subject(id, name, hours) VALUES (1, 'Programação I', 80);

INSERT INTO curriculum_matrix(id, course_id, semester_id, subject_id) VALUES (1, 1, 1, 1);

