import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import API from "../utils/API";
import { toast } from "react-toastify";
import Button from "./Button";

const BookPopup = ({ open, setOpen, book }) => {
  const cancelButtonRef = useRef(null);

  const [inputs, setInputs] = useState({
    title: book?.title || "",
    author: book?.author || "",
    year: book?.year || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (book == null) {
      console.log(inputs);
      await API.post(`books`, inputs)
        .then((res) => {
          if (res.status == 201) {
            toast.success(res.data.message);
            setOpen(false);
          }
        })
        .catch((err) => {
          if (err.response) {
            toast.error(err.response.data.message);
          }
          console.log(err);
        });
    } else {
      await API.put(`books/${book.id}`, inputs)
        .then((res) => {
          if (res.status == 200) {
            toast.success(res.data.message);
            setOpen(false);
          }
        })
        .catch((err) => {
          if (err.response) {
            toast.error(err.response.data.message);
          }
          console.log(err);
        });
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <i
                      className="p-1 fa-sharp fa-solid fa-dungeon h-6 w-6 text-green-600"
                      aria-hidden="true"
                    ></i>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Fill book Content
                    </Dialog.Title>

                    <form className="flex flex-col items-center mt-4">
                      <div className="text-left w-full">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Title
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="title"
                            value={inputs.title}
                            onChange={handleChange}
                            id="title"
                            className="block px-4 w-full h-8 rounded-md border-2 border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="text-left w-full">
                        <label
                          htmlFor="author"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Author
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="author"
                            value={inputs.author}
                            onChange={handleChange}
                            id="author"
                            className="block px-4 w-full h-8 rounded-md border-2 border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="text-left w-full">
                        <label
                          htmlFor="year"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Year
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="year"
                            value={inputs.year}
                            onChange={handleChange}
                            id="year"
                            className="block px-4 w-full h-8 rounded-md border-2 border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <Button
                    type="submit"
                    color="text-white"
                    bgColor="bg-[#7FB5FF]"
                    onClick={handleSubmit}
                    content={book ? "Update" : "Add"}
                  />

                  <Button
                    type="button"
                    color="text-white"
                    bgColor="bg-red-700"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                    content={"Cancel"}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default BookPopup;
