import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Modal } from 'react-bootstrap';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [show, setShow] = useState(false);
  const [editTask, setEditTask] = useState('');

  const handleAdd = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const handleDelete = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditTask(tasks[index]);
    setShow(true);
  };

  const handleUpdate = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editIndex] = editTask;
    setTasks(updatedTasks);
    setShow(false);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <h3 className="text-center">React Bootstrap Todo List</h3>
          <Form className="d-flex mb-3">
            <Form.Control
              type="text"
              placeholder="Enter a task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <Button variant="primary" onClick={handleAdd} className="ms-2">
              Add
            </Button>
          </Form>
          <ListGroup>
            {tasks.map((item, index) => (
              <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                <span>{item}</span>
                <div>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      {/* Edit Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TodoList;
