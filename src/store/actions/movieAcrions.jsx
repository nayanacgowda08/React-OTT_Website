import { removemovie } from '../reducers/movieSlice';
import axios from '../../utils/axios';
import {loadmovie} from '../reducers/movieSlice';

export const asyncloadMovie =  (id)=> async  (dispatch,getState)=>{
    try {
        const detail = await axios.get(`/movie/${id}`)
        const extId =await axios.get(`/movie/${id}/external_ids`)
        const recommendations =await axios.get(`/movie/${id}/recommendations`)
        const similar =await axios.get(`/movie/${id}/similar`)
        const videos =await axios.get(`/movie/${id}/videos`)
        const watchProviders =await axios.get(`/movie/${id}/watch/providers`)
        let theUltimateDetails ={
            detail: detail.data,
            extId: extId.data, 
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find((m) => m.type === 'Trailer'),
            watchProviders: watchProviders.data.results.IN,
        };

        dispatch(loadmovie(theUltimateDetails));
        console.log(theUltimateDetails);
        
    } catch (error) {
        console.log("Error: " , error);
        
    }
}
