import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import TodoAdder from "./components/TodoAdder";
import TodoList from "./components/TodoList";
import axios from 'axios';

function App() {
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        fetchTodoList();
    }, []);

    const fetchTodoList = () => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/todos`)
            .then(response => {
                console.log('Success:', response.data);
                setTodoList(response.data); // Update todoList state
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleDeleteTodo = (id) => {
        axios.delete(`${process.env.REACT_APP_SERVER}/api/todos/${id}`)
            .then(response => {
                if (response.status === 200) {
                    fetchTodoList()
                } else {
                    console.error('Failed to delete the item');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleEditTodo = (id, updatedTask, updatedCategory, updatedDeadline) => {
        axios.put(`${process.env.REACT_APP_SERVER}/api/todos/${id}`, {
            task: updatedTask,
            category: updatedCategory,
            deadline: updatedDeadline
        })
            .then(response => {
                if (response.status === 200) {
                    fetchTodoList();
                } else {
                    console.error('Failed to edit the item');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            })
    };

    return (
        <Container className="my-4">
            <h1>TODO APP</h1>
            <TodoAdder fetchTodoList={fetchTodoList} />
            <TodoList todoList={todoList} handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo} />
        </Container>
    );
}

export default App;
