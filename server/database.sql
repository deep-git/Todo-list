CREATE DATABASE perntodolist;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    task_description VARCHAR(255),
);

ALTER TABLE todo ADD COLUMN is_completed BOOLEAN;