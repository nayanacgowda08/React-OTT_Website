// import React from 'react'
import { Link } from "react-router-dom";

const Cards = ({ data, title }) => {
  return (
    <div className=" flex px-[5%] flex-wrap w-full h-full  bg-[#1F1E24]">
      <Link
                onClick={() => {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
                }}
                className="fixed bottom-[5%] right-[5%] flex justify-center items-center w-[5vh] h-[5vh] bg-[#6556cd] rounded-lg"
            >
                <i className="text-white ri-arrow-up-line text-xl"></i>
            </Link>
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id} `}
          key={i}
          className="w-[25vh] mr-[5%] mb-[5%] relative"
        >
          <img
            className="h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
            src={`https://image.tmdb.org/t/p/original/${
              c.poster_path || c.backdrop_path || c.profile_path
            }`}
            alt=""
          />
          <h1 className="text-2xl text-zinc-200 font-semibold mt-3">
            {c.title || c.name || c.original_name || c.original_title}
          </h1>
          {c.vote_average && (
            <div
              className="absolute right-[-10%] bottom-[35%] bg-yellow-600 flex justify-center items-center text-white rounded-full w-[5vh] h-[5vh]
            font-bold text-xl"
            >
              {(c.vote_average * 10).toFixed()} <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
