import React, { useState } from "react";

const EditTodo = ({ todo }) => {

    const [task_description, setDescription] = useState(todo.task_description);
    const [is_completed, setCompleted] = useState(todo.is_completed);

    const updateDescription = async(e) => {
        e.preventDefault();
        try {
            const body = { task_description, is_completed };
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <>
           
<button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
  Edit
</button>

<div class="modal" id={`id${todo.todo_id}`} onClick={() => setDescription(todo.task_description)}>
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <h4 class="modal-title">Edit Todo</h4>
        <button type="button" class="close" data-dismiss="modal" onClick={() => setDescription(todo.task_description)}>&times;</button>
      </div>

      <div class="modal-body">
        <input type="text"  value={task_description} onChange={e => setDescription(e.target.value)}/>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={e => updateDescription(e)}>Edit</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => setDescription(todo.task_description)}>Close</button>
      </div>

    </div>
  </div>
</div>
        </>
    );
};

export default EditTodo;