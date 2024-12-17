import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function SearchBox() {
  
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();


  const submitHandler = (e) => {
    console.log("calling handler");
    e.preventDefault();
   
      navigate(`/?keyword=${keyword}`);
      console.log("navigated");
    
  };

  return (
    <form className="flex flex-1 mx-4 max-w-lg" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Search..."
          value={keyword}
          onChange={(e)=>setKeyword(e.target.value)}
          className="w-full p-2 rounded-l-lg border border-gray-300"
        />
        <button className="bg-blue-500 text-white p-2 rounded-r-lg border border-blue-500">
          Search
        </button>
      </form>
  );
}

export default SearchBox;