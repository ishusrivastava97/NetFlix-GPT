import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/Constant";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch=useDispatch()
  const Navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        Navigate("/");
      })
      .catch((error) => {
        // An error happened.
        Navigate("/error");
      });
  };

  useEffect(() => {
        const unsubscribe= onAuthStateChanged(auth, (user) => {
          if (user) {
            const { uid, email, displayName, photoURL } = user;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL,
              })
            );
            Navigate("/browse")
          } else {
            dispatch(removeUser());
            Navigate("/")
          }
        });
        return () => unsubscribe();
  }, []);
  const handleGPTSearchClick=()=>{
    dispatch(toggleGptSearchView());
  }
  const handleLanguageChange=(e)=>{
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 justify-between flex ">
      <img className="w-44" src={LOGO} alt="logo Here" />
      {user && (
        <div className="flex p-2">
          {/* const photoURL */}
          {showGptSearch && (
            <select
              className="py-2 px-4 mx-4 my-2 rounded-lg bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
            onClick={handleGPTSearchClick}
          >
            {showGptSearch ? "Home Page" : "GPT Search"}
          </button>
          <img className="w-12 h-12" alt="user icon" src={user.photoURL} />

          <button onClick={handleSignOut} className="font-bold text-white">
            (Signout)
          </button>
        </div>
      )}
    </div>
  );
};
export default Header;
