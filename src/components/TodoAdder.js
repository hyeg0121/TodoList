import React, {useState} from 'react';
import {Button, Col, Form, Row, Alert} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {ko} from 'date-fns/locale';
import axios from "axios";

function TodoAdder({fetchTodoList, loading}) {
    const [showAlert, setShowAlert] = useState(false);
    const [task, setTask] = useState('');
    const [deadline, setDeadline] = useState(new Date());
    const [category, setCategory] = useState('STUDY');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!task.trim()) {
            setShowAlert(true);
            return;
        }

        setShowAlert(false);

        const taskData = {
            task: task.trim(),
            deadline: deadline.toISOString(),
            category: category
        };

        axios.post(`${process.env.REACT_APP_SERVER}/api/todos`, taskData)
            .then(response => {
                console.log('Success:', response.data);
                fetchTodoList();
                setTask('');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <Form onSubmit={handleSubmit}>
            {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    할 일을 입력하세요.
                </Alert>
            )}
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail" className="col-4">
                    <Form.Control
                        type="text"
                        placeholder="할 일을 입력하세요"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        disabled={loading}
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState" className="col-2">
                    <DatePicker
                        id="datePicker"
                        selected={deadline}
                        onChange={date => setDeadline(date)}
                        className="form-control"
                        locale={ko}
                        showPopperArrow={false}
                        minDate={new Date()}
                        dateFormat="yyyy-MM-dd"
                        disabled={loading}
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState" className="col-2">
                    <Form.Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        disabled={loading}
                    >
                        <option value="STUDY">공부</option>
                        <option value="PERSONAL">개인</option>
                        <option value="EXERCISE">운동</option>
                        <option value="OTHER">기타</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Button variant="primary" type="submit" className="col-4" disabled={loading}>
                        추가하기
                    </Button>
                </Form.Group>
            </Row>
        </Form>
    );
}

export default TodoAdder;
