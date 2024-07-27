import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/Constant";

const Header = () => {
  const dispatch=useDispatch()
  const Navigate = useNavigate();
  const user = useSelector((store) => store.user);
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
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 justify-between flex ">
      <img className="w-44" src={LOGO} alt="logo Here" />
      {user && (
        <div className="flex p-2">
          {/* const photoURL */}
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
