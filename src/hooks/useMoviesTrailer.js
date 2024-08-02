import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/Constant";
import { useEffect } from "react";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMoviesTrailer =({movieId})=>{
      const dispatch = useDispatch();
      const getMoviesVideos = async () => {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US",API_OPTIONS
        );
        
        const json = data.json();
        console.log(json);
         console.log(json.results)
        const filterData = json.results.filter(
          (video) => video.type === "Trailer"
        );
        const trailer = filterData.length ? filterData[0] : json.results[0];
        dispatch(addTrailerVideo(trailer));
      };
      useEffect(() => {
        getMoviesVideos();
      }, [] );
}
export default useMoviesTrailer;