import { useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadMovie } from "../store/actions/movieAcrions";
import { removemovie } from "../store/reducers/movieSlice";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./Partials/HorizontalCards";

const MovieDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate(); 
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadMovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0,.2),rgba(0, 0, 0,.7),rgba(0, 0, 0,.9)) , url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center top",
        backgroundSize: "cover",
        // padding:"0px",
        backgroundRepeat: "no-repeat",
        // color:"white"
      }}
      className="w-screen h-[120vh] px-[10%]"
    >
      {/* part-1 */}
      <nav className="h-[10vh] items-center  w-full text-zinc-100 flex gap-10 text-xl">
        <Link>
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556CD] ri-arrow-left-line"
          ></i>
        </Link>
        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikipedia.org/wiki/${info.extId.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.extId.imdb_id}/`}
        >
          imdb
        </a>
      </nav>

      {/* part-2 details and poster */}
      <div className=" w-full flex">
        <img
          className="h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />
        <div className="content ml-[5%] text-white">
          <h1 className="text-5xl font-black text-white">
            {info.detail.title ||
              info.detail.name ||
              info.detail.original_name ||
              info.detail.original_title}
            <small className="text-zinc-200 text-xl font-bold">
              ({info.detail.release_date.split("-")[0]})
            </small>
          </h1>
          <div className=" flex items-center gap-x-3  text-zinc-200 font-semibold ">
            <span
              className="mt-2 bg-yellow-600 flex justify-center items-center text-white rounded-full w-[5vh] h-[5vh]
            font-bold text-xl"
            >
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>
            <h1 className="text-xl">User Score:</h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((e) => e.name).join(",")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>

          {/* tagline */}
          <h1 className=" mt-5 text-2xl font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>
          {/* overview */}
          <h1 className=" mt-5 text-2xl font-semibold">Overview</h1>
          <p className="w-[90vh] mb-5">{info.detail.overview}</p>
          <Link
            className="p-[2%] py-4 px-5  font-semibold bg-[#6556CD] rounded-lg"
            to={`${pathname}/trailer`}
          >
            <i className="ri-play-fill mr-1"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* part-3 available on platforms */}
      <div className="w-[80%] flex flex-col gap-y-5 ">
        {info.watchProviders && info.watchProviders.flatrate && (
          <div className="flex gap-5 items-center text-white">
            <h1>Available on Platform</h1>
            {info.watchProviders.flatrate.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md mt-2 "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchProviders && info.watchProviders.rent && (
          <div className="flex gap-5 items-center text-white">
            <h1>Available on Rent</h1>
            {info.watchProviders.rent.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md mt-2 "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchProviders && info.watchProviders.buy && (
          <div className="flex gap-5 items-center text-white">
            <h1>Available on buy</h1>
            {info.watchProviders.buy.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md mt-2 "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>
      {/* psrt-4 Recommmendations and similar stuffs */}
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet/>
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
