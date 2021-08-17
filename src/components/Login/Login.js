import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFrameWork, signInWithEmailAndPassword } from "./loginManager";

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,

    name: "",
    email: "",
    password: "",
    photo: "",
  });

  //   import from loginManager
  initializeLoginFrameWork();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };
  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res,true)
    });
  };

  const signOut = ()=>{
      handleSignOut().then(res =>{
          handleResponse(res,false);
      })
  }

  const fbSignIn = () =>{
      handleFbSignIn().then(res=>{
          handleResponse(res,true)
      })
  }
  // component related

  const handleBlur = (e) => {
    let isFieldValid = true;

    // console.log(e.target.name,e.target.value);
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (e) => {
    // console.log(user.email,user.password);
    if (newUser && user.email && user.password) {
        createUserWithEmailAndPassword(user.name,user.email,user.password).then(res => {
            handleResponse(res,true);

        })
    }

    if (!newUser && user.email && user.password) {
        signInWithEmailAndPassword(user.email,user.password).then(res =>{
            handleResponse(res,true);
        })
    }
    e.preventDefault();
  };


  const handleResponse = (res, redirect) =>{
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
        history.replace(from);
    }
  }
  return (
    <div style={{ textAlign: "center" }}>
      {user.isSignedIn ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={googleSignIn}>Sign In</button>
      )}
      <br />
      <button onClick={fbSignIn}>Sign in using Facebook</button>

      {user.isSignedIn && (
        <div>
          <p>welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
      <h1>Our own Authentication</h1>

      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">New User Sign up</label>

      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            type="text"
            name="name"
            placeholder="Your name"
            onBlur={handleBlur}
          />
        )}

        <br />
        <input
          type="text"
          onBlur={handleBlur}
          name="email"
          placeholder="Your Email Address"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          onBlur={handleBlur}
          placeholder="Your password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
      </form>
      <p style={{ color: "red" }}> {user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          {" "}
          User {newUser ? "created" : "Logged In"} Successfully
        </p>
      )}
    </div>
  );
}

export default Login;
