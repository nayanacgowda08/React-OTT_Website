import  { useEffect, useState } from 'react'
import SideNav from './Partials/SideNav'
import TopNavbar from './Partials/TopNavbar'
import axios from '../utils/axios'
import Header from './Partials/Header'
import HorizontalCards from './Partials/HorizontalCards'
import DropDown from './Partials/DropDown'
import Loading from './Loading'

const Home = () => {
    document.title = "Home"
    const [wallpaper,setWallpaper] = useState(null)
    const [trending, settrending] = useState([])
    const [category,setCategory]=useState("all");
    const getRandomWallpaper = async ()=>{
      try {
        const {data} =await axios.get(`/trending/all/day`)
        const randomWallp = data.results[(Math.random()*data.results.length).toFixed()];
        setWallpaper(randomWallp);
        // console.log(randomWallp);
        
        
      } catch (error) {
        console.log("Error", error);
        
      }
    }

    // Trending movies/series

    const getTrending = async ()=>{
      try {
        const {data} =await axios.get(`/trending/${category}/day`)
        settrending(data.results)
        
        
      } catch (error) {
        console.log("Error", error);
        
      }
    }
    
    

    useEffect(() => {
      getTrending();
      !wallpaper && getRandomWallpaper();
     
    },[category])

    // console.log(trending);

  return wallpaper && trending? (
    <>
   <SideNav/>
    <div className='w-[80%] h-full overflow-auto overflow-x-hidden'>
        <TopNavbar/>
        <Header  wallp={wallpaper}/>
        <div className='mb-5 flex justify-between p-5'>
            <h1 className='font-bold text-3xl text-zinc-400 '>Trending</h1>
            <DropDown  title="Filter" options ={["tv","movie","all"]} func={(e)=>setCategory(e.target.value)} />
        </div>
        <HorizontalCards data={trending} />
    </div>
    </>
  ):<Loading/>
}

export default Home

// #1F1E24
// SECONDRAY - #6556CD 