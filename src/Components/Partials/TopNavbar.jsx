// import React from 'react'
import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noImg from "../../../public/img.jpg";

const TopNavbar = () => {
  const [query, setquery] = useState("");
  const [searches, setSearches] = useState([]);
  // console.log(query);
  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
      // console.log(data.results);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getSearches();
  }, [query]);

  return (
    <div className=" w-[80%] h-[10vh] relative flex mx-auto items-center  ">
      <i className="text-white text-2xl ri-search-line"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        type="text "
        placeholder="search..."
        className="w-[50%] outline-none border-none mx-10 p-3 text-xl bg-transparent text-white"
      />
      {query.length > 2 && (
        <i
          onClick={() => setquery("")}
          className="text-white text-3xl ri-close-fill right-0"
        ></i>
      )}
      <div className="z-[100] w-[50%] max-h-[50vh] bg-zinc-200 absolute top-[100%] overflow-auto left[5%]">
        {searches.map((elem, ind) => (
          <Link
            to={`${elem.media_type}/details/${elem.id}`}
            key={ind}
            className="hover:text-black hover:bg-zinc-400 duration-300  text-black font-semibold text-md w-[100%] bg-slate-300 flex justify-start items-center border-b-2 border-zinc-100 p-5 "
          >
            <img
              className="w-[10vh] h-[10vh] object-cover mr-5 shadow-lg rounded"
              src={
                elem.backdrop_path || elem.profilr_path
                  ? `https://image.tmdb.org/t/p/original/${elem.backdrop_path} || ${elem.profilr_path}`
                  : noImg
              }
              alt=""
            />
            <span>
              {elem.title ||
                elem.name ||
                elem.original_name ||
                elem.original_title}{" "}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopNavbar;
