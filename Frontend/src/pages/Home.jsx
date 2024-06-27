import { useEffect, useState } from "react";
import BookPopup from "../components/BookPopup";
import API from "../utils/API";
import Button from "../components/Button";


const Home = () => {
  const [books, setBooks] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
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
      <div className="flex flex-col gap-8" id="books">
      <div className="flex justify-between">
        <h2 className="font-semibold text-lg text-[#333333] ">Your Books </h2>
        <Button
          content={"Add New book"}
          bgColor="bg-[#7FB5FF]"
          color="text-white"
          onClick={() => setAddOpen(true)}
        />
      </div>
      {/* <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center pt-4">
        {books &&
          books.map((book) => (
            <Teachercard key={book.id} book={book} />
          ))}
      </div> */}
      {addOpen ? <BookPopup open={addOpen} setOpen={setAddOpen} /> : ""}
        
    </div>
    </div>
  );
};

export default Home;
