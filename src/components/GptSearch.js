import { BG_URL } from "../utils/Constant";
import GptMoviesSuggestion from "./GptMoviesSuggestion";
import GptSearchBar from "./GptSearchBar";

const GptSearch=()=>{
    return (
      <div>
        <div className="absolute -z-10">
          <img src={BG_URL} alt="Background" />
        </div>
        <GptSearchBar />
        <GptMoviesSuggestion />
      </div>
    );
}
export default GptSearch;