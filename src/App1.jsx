import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import TaskList1 from './components/TaskList1';
import TaskForm1 from './components/TaskForm1';

export const PURPLE = '#6c47ff';

function App1() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('tasks1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [search, setSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');

  useEffect(() => {
    localStorage.setItem('tasks1', JSON.stringify(tasks));
  }, [tasks]);

  const handleShowForm = () => setShowForm(true);

  const handleCloseForm = () => {
    setShowForm(false);
    setTaskToEdit(null);
  };

  const addTask = (task) => {
    setTasks([
      ...tasks,
      { ...task, id: Date.now(), createdAt: new Date().toLocaleString('id-ID') },
    ]);
  };

  const editTask = (updatedTask) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const showEditForm = (task) => {
    setTaskToEdit(task);
    handleShowForm();
  };

  const filteredTasks = tasks.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterPriority === 'All' || t.priority === filterPriority)
  );

  return (
    <div
      style={{
        background: '#f3f4f6',
        minHeight: '100vh',
        padding: '48px 16px',
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: '620px', margin: '0 auto' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Task List</h1>
          <Button
            onClick={handleShowForm}
            style={{
              background: PURPLE,
              borderColor: PURPLE,
              fontWeight: 600,
              fontSize: '0.8rem',
              borderRadius: '10px',
              padding: '8px 18px',
            }}
          >
            + Add Task
          </Button>
        </div>

        <Row className="mb-3 g-2">
          <Col xs={8}>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Cari task..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col xs={4}>
            <Form.Select
              size="sm"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="All">Semua</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Form.Select>
          </Col>
        </Row>

        <TaskList1
          tasks={filteredTasks}
          deleteTask={deleteTask}
          showEditForm={showEditForm}
        />

        <TaskForm1
          show={showForm}
          handleClose={handleCloseForm}
          addTask={addTask}
          editTask={editTask}
          taskToEdit={taskToEdit}
        />
      </div>
    </div>
  );
}

export default App1;