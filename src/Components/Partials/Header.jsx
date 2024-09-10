import React from "react";
import { Link } from "react-router-dom";

const Header = ({ wallp }) => {
  // console.log(wallp);

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0,.2),rgba(0, 0, 0,.7),rgba(0, 0, 0,.9)) , url(https://image.tmdb.org/t/p/original/${
          wallp.backdrop_path || wallp.profile_path
        })`,
        backgroundPosition: "center top",
        backgroundSize: "cover",
        // padding:"0px",
        backgroundRepeat: "no-repeat",
        // color:"white"
      }}
      className="w-full h-[50vh] flex flex-col justify-end items-start p-[3%]"
    >
      <h1 className="w-[70%] text-5xl text-white font-bold">
        {" "}
        {wallp.title ||
          wallp.name ||
          wallp.original_name ||
          wallp.original_title}
      </h1>
      <p className="w-[40%] text-white mt-3 mb-3">
        {wallp.overview.slice(0, 150)}...
        <Link
          to={`/${wallp.media_type}/details/${wallp.id}`}
          className="text-blue-400"
        >
          more
        </Link>
      </p>
      <p className="text-white">
        <i className="ri-megaphone-fill text-yellow-400"></i>{" "}
        {wallp.release_date || "umm..no Info"}
        <i className="ri-album-fill text-yellow-400 ml-5"></i>{" "}
        {wallp.media_type.toUpperCase()}
      </p>
      <Link 
      to={`/${wallp.media_type}/details/${wallp.id}/trailer`}
      className="bg-[#6556CD] p-4 mt-4 rounded-md text-white font-semibold">
        {" "}
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
