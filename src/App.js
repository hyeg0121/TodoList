import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import TodoAdder from "./components/TodoAdder";
import TodoList from "./components/TodoList";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodoList();
  }, [loading]);

  const fetchTodoList = () => {
    fetch(`http://localhost:8080/api/todos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setTodoList(data);
        setLoading(false);  // 데이터 가져오기 완료 후 loading을 false로 설정
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);  // 에러 발생 시에도 loading을 false로 설정
      });
  };

  return (
    <Container className="my-4">
      <h1>TODO APP</h1>
      <TodoAdder setLoading={setLoading} />
      <TodoList todoList={todoList} setLoading={setLoading} />
    </Container>
  );
}

export default App;
