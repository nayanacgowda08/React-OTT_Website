import { Link } from "react-router-dom";
import DropDown from "./DropDown";

const HorizontalCards = ({ data, title }) => {
  return (
    <>
      {/* Wrapper for the entire card section */}
      <div className="w-full flex overflow-y-hidden mb-5 p-5">
        {data.length > 0 ? (
          data.map((d, i) => (
            <Link
              to={`${d.media_type}/details/${d.id}`}
              key={i}
              className="mr-5 min-w-[15%] bg-zinc-900 mb-5"
            >
              <img
                className="h-[50%] w-full object-cover"
                src={`https://image.tmdb.org/t/p/original/${
                  d.backdrop_path || d.profile_path || d.poster_path
                }`}
                alt=""
              />
              <div className="text-white p-3 h-[45%]">
                <h1 className="text-xl font-semibold">
                  {d.name || d.title || d.original_name || d.original_title}
                </h1>
                <p>
                  {d.overview.slice(0, 50)}...
                  <span className="text-zinc-400">more</span>
                </p>
              </div>
            </Link>
          ))
        ) : (
          <h1 className="text-3xl mt-5 text-white font-black text-center">
            Nothing to show
          </h1>
        )}
      </div>
    </>
  );
};

export default HorizontalCards;
