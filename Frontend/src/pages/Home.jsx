import BookTable from "../components/BookTable";



const Home = () => {
  
  return (
    <div>
      <h1>Library </h1>
      <div className="flex flex-col gap-8" id="books">

      <BookTable/>
      
        
    </div>
    </div>
  );
};

export default Home;
