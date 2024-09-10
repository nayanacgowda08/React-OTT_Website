import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import TopNavbar from "./Partials/TopNavbar";
import DropDown from "./Partials/DropDown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./Partials/Cards";
import Loading from "./Loading";

const TvShows = () => {
  const [category, setcategory] = useState("airing_today");
  const [tvshows, settvshows] = useState([]);
  const navigate = useNavigate();
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "CineFlix | tvshows " + category.toUpperCase();

  const getTvShows = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);

      // settvshows(data.results);
      if (data.results.length > 0) {
        settvshows((prevSt) => [...prevSt, ...data.results]);
        //   console.log(data);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  // console.log(tvshows);

  const refreshHandler = async () => {
    if (tvshows.length === 0) {
      getTvShows();
    } else {
      setpage(1);
      settvshows([]);
      getTvShows();
    }
  };

  useEffect(() => {
    refreshHandler();
    // eslint-disable-next-line
  }, [category]);
  return tvshows.length > 0 ? (
    <div className="  w-screen h-screen ">
      <div className="px-[5%]  w-full flex items-center  justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556CD] ri-arrow-left-line"
          ></i>{" "}
          tvshows <small className="text-md text-zinc-600">({category})</small>
        </h1>
        <div className="flex items-center w-[80%]">
          <TopNavbar />
          <DropDown
            title="Category"
            options={["on_the_air", "popular", "top_rated", "airing_today"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={tvshows.length}
        next={getTvShows}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={tvshows} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default TvShows;
