import { useRef, useState } from "react";
import Header from "./Header";
import { FormValidate } from "../utils/FormValidate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_avatar } from "../utils/Constant";

const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const toggleSignInForm = () => {
    setisSignInForm(!isSignInForm);
  };
  const HandleButtonClick = () => {
    const validValue = FormValidate(
      email.current.value,
      password.current.value
    );
    // console.log(email);
    // console.log(password);
    // console.log(validValue);
    setErrorMessage(validValue);
    if (validValue) return;
    //sign in sign up logic
    if (!isSignInForm) {
      //sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // console.log(user);
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_avatar,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              console.log(photoURL);
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...
              setErrorMessage(error.message);
            });
          
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={BG_URL} alt="Background" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {isSignInForm ? (
          <></>
        ) : (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-custom-dark rounded-lg"
          />
        )}

        <input
          type="text"
          placeholder="Email"
          className="p-4 my-4 w-full bg-custom-dark rounded-lg"
          ref={email}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-custom-dark rounded-lg"
          ref={password}
        />
        <p className="text-red-500 font-bold text-lg ">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={HandleButtonClick}
        >
          Sign In
        </button>
        <h1 onClick={toggleSignInForm} className="cursor-pointer">
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "New to Netflix? Sign In Now"}
        </h1>
      </form>
    </div>
  );
};
export default Login;
