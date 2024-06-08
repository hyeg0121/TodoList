import { Button } from "react-bootstrap";


function TodoItem({ idx, id, task, ctgColor, korName, deadline, setLoading }) {

    const deleteTodo = (id) => {
        setLoading(true)
        fetch(`http://localhost:8080/api/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (response.ok) {
                    setLoading(false);
                } else {
                    console.error('Failed to delete the item');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <tr>
            <td>{idx}</td>
            <td style={{ color: ctgColor }}>{korName}</td>
            <td>{task}</td>
            <td>{deadline}</td>
            <td><Button variant="outline-dark" onClick={() => deleteTodo(id)}>삭제</Button></td>
        </tr>
    )
}

export default TodoItem