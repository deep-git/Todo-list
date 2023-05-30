import React, { useState } from "react";

const CheckTodo = ({ todo }) => {

    const [is_completed, setCompleted] = useState(todo.is_completed);

    const updateCheck = async() => {
        try {
            let task_description = todo.task_description;
            if (is_completed === false || is_completed === true) {
                setCompleted(!is_completed);
            }

            const body = { task_description, is_completed };
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            //window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
            <input type="checkbox" checked={is_completed} onChange={updateCheck}/>
        </>
    )
}

export default CheckTodo;