import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import TodoAdder from "./components/TodoAdder";
import TodoList from "./components/TodoList";
import axios from 'axios';

function App() {
    const [todoList, setTodoList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState('ALL');

    useEffect(() => {
        fetchTodoList();
    }, []);

    const fetchTodoList = () => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_SERVER}/api/todos`)
            .then(response => {
                console.log('Success:', response.data);
                setTodoList(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDeleteTodo = (id) => {
        setLoading(true);
        axios.delete(`${process.env.REACT_APP_SERVER}/api/todos/${id}`)
            .then(response => {
                if (response.status === 204) {
                    fetchTodoList();
                } else {
                    console.error('할 일 삭제 실패', response.status);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleEditTodo = (id, updatedTask, updatedCategory, updatedDeadline) => {
        setLoading(true);
        axios.put(`${process.env.REACT_APP_SERVER}/api/todos/${id}`, {
            task: updatedTask,
            category: updatedCategory,
            deadline: updatedDeadline
        })
            .then(response => {
                if (response.status === 200) {
                    fetchTodoList();
                } else {
                    console.error('할 일 수정 실패', response.status);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Container className="my-4">
            <h1>Mirim ToDo</h1>
            {loading && <Spinner animation="border" />}
            <TodoAdder fetchTodoList={fetchTodoList} loading={loading} />
            <TodoList
                todoList={todoList}
                handleDeleteTodo={handleDeleteTodo}
                handleEditTodo={handleEditTodo}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
            />
        </Container>
    );
}

export default App;
