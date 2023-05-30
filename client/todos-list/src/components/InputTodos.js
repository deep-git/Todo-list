import React, { useState } from "react";

const InputTodos = () => {

    const [task_description, setDescription] = useState("");
    const [is_completed, setCompleted] = useState(false);

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            setCompleted(false);
            const body = { task_description, is_completed };
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <>
            <h1>PERN Todo List</h1>
            <form onSubmit={onSubmitForm}>
                <input type="text" value={task_description} onChange={(e => setDescription(e.target.value))} />
                <button>Add</button>
            </form>
        </>
    );
}

export default InputTodos;