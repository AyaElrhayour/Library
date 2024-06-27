import { useEffect, useState } from "react";
import BookPopup from "./BookPopup";
import Button from "./Button";
import API from "../utils/API";
import { toast } from "react-toastify";

const BookTable = () => {
  const [deleted, setDeleted] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const handleDeleteBook = async (id) => {
    await API.delete(`books/${id}`)
      .then((res) => {
        if (res.status == 200) {
          toast.success(res.data.message);
          setDeleted(!deleted);
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        }
        console.log(err);
      });
  };

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
  }, [addOpen, deleted, selectedBook, updateOpen]);

  const handleUpdateBook = (book) => {
    setSelectedBook(book);
    setUpdateOpen(true);
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex justify-between">
            <h2 className="font-semibold text-lg text-[#333333]">All Books</h2>
            <Button
              content={"Add New Books"}
              bgColor="bg-[#7FB5FF]"
              color="text-white"
              onClick={() => setAddOpen(true)}
            />
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="w-1/3 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Book
                </th>
                <th className="w-1/3 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Author
                </th>
                <th className="w-1/3 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Year
                </th>
                <th className="w-1/3 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Operations
                </th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    <span className="ml-3 font-bold text-blueGray-600">
                      {book.title}
                    </span>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {book.author}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {book.year}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <Button
                      content={"Edit"}
                      color="text-white"
                      bgColor="bg-green-300"
                      onClick={() => handleUpdateBook(book)}
                    />
                    <Button
                      content={"Delete"}
                      color="text-white"
                      bgColor="bg-red-700"
                      onClick={() => handleDeleteBook(book.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {addOpen && <BookPopup open={addOpen} setOpen={setAddOpen} />}
        {updateOpen && (
          <BookPopup
            open={updateOpen}
            setOpen={setUpdateOpen}
            book={selectedBook}
            setBook={setSelectedBook}
          />
        )}
      </div>
    </>
  );
};

export default BookTable;
