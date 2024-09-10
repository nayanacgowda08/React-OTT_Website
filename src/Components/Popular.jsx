// import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import TopNavbar from "./Partials/TopNavbar";
import DropDown from "./Partials/DropDown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./Partials/Cards";
import Loading from "./Loading";

const Popular = () => {
  const [category, setcategory] = useState("movie");
  // const [duration, setduration] = useState("day");
  const [popular, setpopular] = useState([]);
  const navigate = useNavigate();
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "CineFlix | Popular " + category.toUpperCase();

  const getPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);

      // setpopular(data.results);
      if (data.results.length > 0) {
        setpopular((prevSt) => [...prevSt, ...data.results]);
        //   console.log(data);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  // console.log(popular);

  const refreshHandler = async () => {
    if (popular.length === 0) {
      getPopular();
    } else {
      setpage(1);
      setpopular([]);
      getPopular();
    }
  };

  useEffect(() => {
    // getpopular();
    refreshHandler();
    // eslint-disable-next-line
  }, [category]);
  return popular.length > 0 ? (
    <div className="  w-screen h-screen ">
      <div className="px-[5%]  w-full flex items-center  justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556CD] ri-arrow-left-line"
          ></i>{" "}
          popular
        </h1>
        <div className="flex items-center w-[80%]">
          <TopNavbar />
          <DropDown
            title="Category"
            options={["tv", "movie"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={popular.length}
        next={getPopular}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;
