import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function TodoItem({ todo, index, handleDeleteTodo, handleEditTodo }) {
    const { id, task, ctgColor, korName, deadline } = todo;
    const [editing, setEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);
    const [editedCategory, setEditedCategory] = useState(korName);
    const [editedDeadline, setEditedDeadline] = useState(new Date(deadline));

    const toggleEditing = () => {
        setEditing(!editing);
        setEditedTask(task);
        setEditedCategory(korName);
        setEditedDeadline(new Date(deadline));
    };

    const saveChanges = () => {
        handleEditTodo(id, editedTask, editedCategory, editedDeadline.toISOString());
        setEditing(false);
    };

    const cancelEdit = () => {
        setEditing(false);
    };

    const deleteTodo = () => {
        handleDeleteTodo(id);
    };

    return (
        <tr>
            <td>{index}</td>
            <td style={{ color: ctgColor }}>
                {editing ? (
                    <Form.Select
                        value={editedCategory}
                        onChange={(e) => setEditedCategory(e.target.value)}
                    >
                        <option value="STUDY">공부</option>
                        <option value="PERSONAL">개인</option>
                        <option value="EXERCISE">운동</option>
                        <option value="OTHER">기타</option>
                    </Form.Select>
                ) : (
                    korName
                )}
            </td>
            <td>
                {editing ? (
                    <Form.Control
                        type="text"
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                    />
                ) : (
                    task
                )}
            </td>
            <td>
                {editing ? (
                    <Form.Control
                        type="date"
                        value={editedDeadline.toISOString().substring(0, 10)} // Format to YYYY-MM-DD for input value
                        onChange={(e) => setEditedDeadline(new Date(e.target.value))}
                    />
                ) : (
                    deadline
                )}
            </td>
            <td>
                {editing ? (
                    <>
                        <Button variant="success" onClick={saveChanges}>저장</Button>{' '}
                        <Button variant="secondary" onClick={cancelEdit}>취소</Button>
                    </>
                ) : (
                    <Button variant="outline-dark" onClick={toggleEditing}>수정하기</Button>
                )}
                {' '}
                <Button variant="outline-dark" onClick={deleteTodo}>삭제</Button>
            </td>
        </tr>
    );
}

export default TodoItem;
