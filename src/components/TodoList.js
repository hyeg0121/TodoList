import Table from 'react-bootstrap/Table';
import TodoItem from './TodoItem';

function TodoList({ todoList, setLoading }) {
    return (
        <Table hover className="mt-5">
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
                {
                    todoList.map((todo, idx) =>
                        <TodoItem
                            key={todo.id}
                            id={todo.id}
                            idx={idx + 1}
                            task={todo.task}
                            ctgColor={todo.ctgColor}
                            korName={todo.korName}
                            deadline={todo.deadline}
                            completed={todo.completed}
                            setLoading={setLoading}
                        />
                    )
                }
            </tbody>
        </Table>
    )
}

export default TodoList;
