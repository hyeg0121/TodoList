import React from 'react';
import Table from 'react-bootstrap/Table';
import TodoItem from './TodoItem';

function TodoList({ todoList, handleDeleteTodo, handleEditTodo }) {
    return (
        <div className="mt-5">
            {todoList.length === 0 ? (
                <p>데이터가 없습니다.</p>
            ) : (
                <Table hover>
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
                    {todoList.map((todo, idx) => (
                        <TodoItem
                            key={todo.id}
                            index={idx + 1}
                            todo={todo}
                            handleDeleteTodo={handleDeleteTodo}
                            handleEditTodo={handleEditTodo} // Pass handleEditTodo function
                        />
                    ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default TodoList;
