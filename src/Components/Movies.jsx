// import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import TopNavbar from "./Partials/TopNavbar";
import DropDown from "./Partials/DropDown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./Partials/Cards";
import Loading from "./Loading";

const Movies = () => {
  const [category, setcategory] = useState("now_playing");
  const [movies, setmovies] = useState([]);
  const navigate = useNavigate();
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "CineFlix | movies " + category.toUpperCase();

  const getMovies = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);

      // setmovies(data.results);
      if (data.results.length > 0) {
        setmovies((prevSt) => [...prevSt, ...data.results]);
        //   console.log(data);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  // console.log(movies);

  const refreshHandler = async () => {
    if (movies.length === 0) {
      getMovies();
    } else {
      setpage(1);
      setmovies([]);
      getMovies();
    }
  };

  useEffect(() => {
    refreshHandler();
    // eslint-disable-next-line
  }, [category]);
  return movies.length > 0 ? (
    <div className="  w-screen h-screen ">
      <div className="px-[5%]  w-full flex items-center  justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556CD] ri-arrow-left-line"
          ></i>{" "}
          Movie <small className="text-md text-zinc-600">({category})</small>
        </h1>
        <div className="flex items-center w-[80%]">
          <TopNavbar />
          <DropDown
            title="Category"
            options={["popular", "top_rated", "upcoming", "now_playing"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={movies.length}
        next={getMovies}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={movies} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movies;
