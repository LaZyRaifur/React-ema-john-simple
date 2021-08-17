import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";


export const initializeLoginFrameWork = () =>{
    // firebase.initializeApp(firebaseConfig);
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
      }
     else {
        firebase.app();
      }
}


 export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true
        };
        return signedInUser;
        
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });


  };

  export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;
        user.success = true;
        return user;

       
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
      });
  };


 export const handleSignOut = () => {
    return firebase
      .auth()
      .signOut()
      .then((res) => {
        const findOutUser = {
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
          error: "",
          success: false,
        };
        return(findOutUser);
      })
      .catch((err) => {});
  };

  export const createUserWithEmailAndPassword = (name,email,password)=>{
    return firebase
    .auth()
    .createUserWithEmailAndPassword(email,password)
    .then((res) => {
      const newUserInfo =  res.user ;
      newUserInfo.error = '';
      newUserInfo.success = true;
      // Signed in
      updateUserName(name);
      return newUserInfo;
      // ...
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
      
      // ..
    });
  }

  export const signInWithEmailAndPassword = (email,password) =>{
    return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      // Signed in
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
  }

  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(() => {
        console.log("user name updated successfully");
        // Update successful
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
        console.log(error);
      });
  };