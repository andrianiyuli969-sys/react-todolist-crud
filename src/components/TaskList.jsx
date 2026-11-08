import React from 'react';
import { Button, Card } from 'react-bootstrap';

const TaskList = ({ tasks, deleteTask, showEditForm }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Card className="mb-3 shadow-sm" key={task.id}>
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Task:</strong> {task.name} <br />
              <strong>Priority:</strong> {task.priority} <br />
              <strong>Status:</strong> {task.status}
            </div>
            <div>
              <Button
                variant="outline-primary"
                className="me-2"
                onClick={() => showEditForm(task)}
              >
                Edit
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;