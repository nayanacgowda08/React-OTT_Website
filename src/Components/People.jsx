import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import TopNavbar from "./Partials/TopNavbar";
// import DropDown from "./Partials/DropDown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./Partials/Cards";
import Loading from "./Loading";


const People = () => {
    const [category, setcategory] = useState("popular");
    const [person, setperson] = useState([]);
    const navigate = useNavigate();
    const [page,setpage]=useState(1)
    const [hasMore, sethasMore] = useState(true)
    document.title = "CineFlix | person " + category.toUpperCase();
  
    const getPerson = async () => {
      try {
        const { data } = await axios.get(`/person/${category}?page=${page}`);
  
        // setperson(data.results);
        if(data.results.length >0){
          setperson((prevSt=>[...prevSt,...data.results]))
        //   console.log(data);
          setpage(page+1)
        }else{
            sethasMore(false)
        }
       
        
      } catch (error) {
        console.log("Error", error);
      }
    };
  
    // console.log(person);
    
    const refreshHandler = async () => {
      if (person.length === 0) {
        getPerson();
      }else{
        setpage(1)
        setperson([]);
        getPerson()
      }
    }
  
    useEffect(() => {
      
      refreshHandler();
      // eslint-disable-next-line
    }, [category]);
  return person.length > 0 ? (
    <div className="  w-screen h-screen ">
      <div className="px-[5%]  w-full flex items-center  justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556CD] ri-arrow-left-line"
          ></i>{" "}
          People
           {/* <small className="text-md text-zinc-600">({category})</small> */}
        </h1>
        <div className="flex items-center w-[80%]">
          <TopNavbar />
          {/* <DropDown
            title="Category"
            options={[ "on_the_air","popular","top_rated","airing_today"]}
            func={(e) => setcategory(e.target.value)}
          />*/}
          <div className="w-[2%]"></div> 
        </div>
      </div>
      <InfiniteScroll
        dataLength={person.length}
        next={getPerson}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={person} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  )
}

export default People