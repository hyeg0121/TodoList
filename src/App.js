import { Container} from "react-bootstrap";
import TodoAdder from "./components/TodoAdder";
function App() {


  return (
    <Container className="my-4">
      <h1>TODO APP</h1>
      <TodoAdder />
    </Container>
  );
}

export default App;
