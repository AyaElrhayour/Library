import { useEffect, useState } from "react";
import API from "../utils/API";

const Home = () => {
  const [books, setBooks] = useState([]);
  const getBooks = async () => {
    await API.get(`books`)
      .then((res) => {
        console.log(res.data);
        setBooks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getBooks();
  }, []);
  return (
    <div>
      <h1>HOME PAGE</h1>
    </div>
  );
};

export default Home;
