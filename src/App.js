import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import CardContainer from "./components/CardContainer";

function App() {

  const [breeds, setBreeds] = useState([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.thecatapi.com/v1/breeds?limit=12&page=${page}`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.REACT_APP_X_API_KEY
        }
      });
      console.log(response.data);
      setBreeds(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching the cat image:', error);
    }
  };

  return (
    <Container className="my-4">
      <h1>Cats</h1>
      {
        loading ?
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          :
          <CardContainer dataList={breeds} />
      }
    </Container>
  );
}

export default App;
