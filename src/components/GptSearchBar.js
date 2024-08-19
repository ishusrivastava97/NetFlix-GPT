import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/LanguageConstant";
import { useRef } from "react";

import { API_OPTIONS } from "../utils/Constant";
import model from "../utils/openai";
import { addGptMoviesResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch=useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };
  
  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);
    const gptQuery =
      "Act as a Movies Recommendation system and suggest some moview for the query" +
      searchText.current.value +
      ". only five me the names of five movies,comma separated like the example result given ahead.Example result :Gadar,sholay,don,golmal,koi mil gya";

    try {
      const result = await model.generateContent(gptQuery);
      const response = await result.response;
      const text = response.text();
      const gptMovies = text.split(",");
      console.log(text);
      console.log(gptMovies);
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie)); //we get array of promises
      const tmdbResults = await Promise.all(promiseArray);
      console.log(tmdbResults);
      dispatch(addGptMoviesResult(tmdbResults));
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="py-2 m-4 px-4 col-span-3 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;
