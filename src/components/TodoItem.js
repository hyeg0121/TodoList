import React, {useState} from 'react';
import {Button, ButtonGroup, Form, Modal} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {ko} from 'date-fns/locale';

function TodoItem({todo, index, handleDeleteTodo, handleEditTodo, loading}) {
    const {id, task, ctgColor, korName, deadline} = todo;
    const [editing, setEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);
    const [editedCategory, setEditedCategory] = useState(korName);
    const [editedDeadline, setEditedDeadline] = useState(new Date(deadline));
    const [showModal, setShowModal] = useState(false);

    const toggleEditing = () => {
        setEditing(!editing);
        setEditedTask(task);
        setEditedCategory(korName);
        setEditedDeadline(new Date(deadline));
    };

    const saveChanges = () => {
        if (!editedTask.trim()) {
            setShowModal(true);
            return;
        }

        setShowModal(false); // Hide the modal if task is not empty
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
        <>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>경고!</Modal.Title>
                </Modal.Header>
                <Modal.Body>할 일을 입력하세요.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
            <tr>
                <td>{index}</td>
                <td style={{color: ctgColor}}>
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
                        <ButtonGroup>
                            <Button variant="success" onClick={saveChanges} disabled={loading}>저장</Button>{' '}
                            <Button variant="secondary" onClick={cancelEdit} disabled={loading}>취소</Button>
                        </ButtonGroup>
                    ) : (
                        <ButtonGroup>
                            <Button variant="outline-dark" onClick={toggleEditing} disabled={loading}>수정</Button>{' '}
                            <Button variant="outline-dark" onClick={deleteTodo} disabled={loading}>삭제</Button>
                        </ButtonGroup>
                    )}
                </td>
            </tr>
        </>
    );
}

export default TodoItem;
