import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import TodoItem from './TodoItem';

function TodoList({ todoList, handleDeleteTodo, handleEditTodo, categoryFilter, setCategoryFilter }) {
    const filteredTodoList = categoryFilter === 'ALL'
        ? todoList
        : todoList.filter(todo => todo.category === categoryFilter);

    return (
        <div className="my-2">
            <Form.Group controlId="categoryFilter" style={{ width: "10%"}}>
                <Form.Label>카테고리 필터</Form.Label>
                <Form.Control
                    as="select"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="ALL">전체</option>
                    <option value="STUDY">공부</option>
                    <option value="PERSONAL">개인</option>
                    <option value="EXERCISE">운동</option>
                    <option value="OTHER">기타</option>
                </Form.Control>
            </Form.Group>
            {filteredTodoList.length === 0 ? (
                <p className="my-5">데이터가 없습니다.</p>
            ) : (
                <Table hover className="my-5">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>카테고리</th>
                        <th>할 일</th>
                        <th>마감일</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredTodoList.map((todo, idx) => (
                        <TodoItem
                            key={todo.id}
                            index={idx + 1}
                            todo={todo}
                            handleDeleteTodo={handleDeleteTodo}
                            handleEditTodo={handleEditTodo}
                        />
                    ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default TodoList;
