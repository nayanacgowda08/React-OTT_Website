// import React from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "./Partials/TopNavbar";
import DropDown from "./Partials/DropDown";
import { useState, useEffect } from "react";
import axios from "../utils/axios";
import Cards from "./Partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const navigate = useNavigate();
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "CineFlix | Trending " + category.toUpperCase();

  const getTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );

      // settrending(data.results);
      if (data.results.length > 0) {
        settrending((prevSt) => [...prevSt, ...data.results]);
        // console.log(data);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  // console.log(trending);

  const refreshHandler = async () => {
    if (trending.length === 0) {
      getTrending();
    } else {
      setpage(1);
      settrending([]);
      getTrending();
    }
  };

  useEffect(() => {
    // getTrending();
    refreshHandler();
    // eslint-disable-next-line
  }, [category, duration]);
  return trending.length > 0 ? (
    <div className="  w-screen h-screen ">
      <div className="px-[5%]  w-full flex items-center  justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556CD] ri-arrow-left-line"
          ></i>{" "}
          Trending
        </h1>
        <div className="flex items-center w-[80%]">
          <TopNavbar />
          <DropDown
            title="Category"
            options={["movie", "tv", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          <DropDown
            title="Duration"
            options={["week", "days"]}
            func={(e) => setduration(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
