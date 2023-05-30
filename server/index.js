const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bodyParser = require('body-parser');


// CORS middleware, connects different application domains
app.use(cors());
app.use(express.json()); //req.body
app.use(bodyParser.urlencoded({extended: true}));

// ROUTES

// Create a todo
app.post("/todos", async (req, res) => {
    try {
        const { task_description, is_completed } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (task_description, is_completed) VALUES($1, $2) RETURNING *", [task_description, is_completed]);
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

// Get all todos

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// Get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

// Update a todo
app.put("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { task_description, is_completed } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET task_description = $1, is_completed = $2 WHERE todo_id = $3", [task_description, is_completed, id]);
        res.json("The todo task was updated.");
    } catch (error) {
        console.log(error.message);
    }
});

// Delete a todo
app.delete("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("The todo task was deleted.");
    } catch (error) {
        console.log(error.message);
    }
})

app.listen(5000, () => {
    console.log(`Server listening on port 5000.`);
});