import {Route, Routes} from 'react-router-dom'
import Home from './Components/Home'
import Trending from './Components/Trending'
import Popular from './Components/Popular'
import Movies from './Components/Movies'
import TvShows from './Components/TvShows'
import People from './Components/People'
import MovieDetails from './Components/MovieDetails'
import PersonDetails from './Components/PersonDetails'
import TvDetails from './Components/TvDetails'
import NotFound from './Components/NotFound'
import Trailer from './Components/Partials/Trailer'

// import Loading from './Components/Loading'
// import './index.css'
function App() {


  return (
    <div className="w-screen h-screen bg-[#1F1E24] flex">
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/trending' element={<Trending/>} />
            <Route path='/popular' element={<Popular/>} />
            <Route path='/movie' element={<Movies/>}/>
            <Route path='/movie/details/:id'  element={<MovieDetails/>}>
            <Route
                        path="/movie/details/:id/trailer"
                        element={<Trailer />}
                    />
            </Route>
            <Route path='/tv' element={<TvShows/>} />
            <Route   path='/tv/details/:id'  element={<TvDetails/>}>
            <Route
                        path="/tv/details/:id/trailer"
                        element={<Trailer />}
                    />
            </Route>
            <Route path='/person' element={<People/>}/>
            <Route path='/person/details/:id' element={<PersonDetails/>}/>
            <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  )
}
 
export default App
