import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../auth/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { suspend } from "suspend-react";
import { getInitialAuthState } from "./AuthState";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [privateUser, setPrivateUser] = useState(null);

  //EMAIL AND PASSWORD FIREBASE AUTH PROVIDER (SIGN UP)
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //EMAIL AND PASSWORD FIREBASE AUTH PROVIDER (SIGN IN)
  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //LOGOUT FIREBASE AUTH
  const logout = () => {
    return signOut(auth);
  };

  /** This suspend code used as buffer for initial auth state
   *   as getting initial state value of null when page is hard reloaded from url
   *  the auth state observer is not updating the global user state at context provider realtime (BUG)
   */ suspend(getInitialAuthState, "initialUserState");

  //FIREBASE CURRENT LOGGED USER OBSERVER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // setCurrentUser(
      //   {
      //     displayName: user?.displayName,
      //     email: user?.email,
      //     emailVerified: user?.emailVerified,
      //     metadata: user?.metadata,
      //     phoneNumber: user?.phoneNumber,
      //     photoURL: user?.photoURL,
      //     providerData: user?.providerData,
      //     providerId: user?.providerId,
      //     reloadUserInfo: user?.reloadUserInfo,
      //     tenantId: user?.tenantId,
      //     uid: user?.uid,
      //   } || null
      // );
      setCurrentUser(user);
      setPrivateUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        privateUser,
        createUser,
        logout,
        signin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
