import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo";
import CheckTodo from "./CheckTodo";

const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    const deleteTodo = async(id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (error) {
            console.error(error.message);
        }
    }

    const getTodos = async(id) => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();
            
            setTodos(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <>
        {" "}
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.task_description}</td>
                            <td><EditTodo todo={todo}/></td>
                            <td><button onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                            <td><CheckTodo todo={todo}/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default ListTodos;