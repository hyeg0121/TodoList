import React, { useState } from 'react';
import {Badge, Button, Form} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';

function TodoItem({ todo, index, handleDeleteTodo, handleEditTodo, loading }) {
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
                        disabled={loading}
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
                        disabled={loading}
                    />
                ) : (
                    task
                )}
            </td>
            <td>
                {editing ? (
                    <DatePicker
                        selected={editedDeadline}
                        onChange={date => setEditedDeadline(date)}
                        className="form-control"
                        locale={ko}
                        showPopperArrow={false}
                        dateFormat="yyyy-MM-dd"
                        disabled={loading}
                    />
                ) : (
                    deadline
                )}
            </td>
            <td>
                {editing ? (
                    <>
                        <Button variant="success" onClick={saveChanges} disabled={loading}>저장</Button>{' '}
                        <Button variant="secondary" onClick={cancelEdit} disabled={loading}>취소</Button>
                    </>
                ) : (
                    <>
                        <Button variant="outline-dark" onClick={toggleEditing} disabled={loading}>수정하기</Button>{' '}
                        <Button variant="outline-dark" onClick={deleteTodo} disabled={loading}>삭제</Button>
                    </>
                )}
            </td>
        </tr>
    );
}

export default TodoItem;
