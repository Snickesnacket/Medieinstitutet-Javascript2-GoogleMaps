/* eslint-disable @typescript-eslint/no-empty-function */
import {
  UserCredential,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  signOut,
  updateProfile,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";

type AuthContextType = {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  reloadUser: () => Promise<boolean>;
  setEmail: (email: string) => Promise<void>;
  setDisplayName: (displayName: string) => Promise<void>;
  setPassword: (password: string) => Promise<void>;
  setPhotoUrl: (photoURL: string) => Promise<void>;
  userEmail: string | null;
  userName: string | null;
  userPhotoUrl: string | null;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextProps = {
  children: React.ReactNode;
};

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const reloadUser = async () => {
    if (!auth.currentUser) {
      return false;
    }
    setUserName(auth.currentUser.displayName);
    setUserEmail(auth.currentUser.email);
    setUserPhotoUrl(auth.currentUser.photoURL);

    return true;
  };

  const setEmail = (email: string) => {
    if (!currentUser) {
      throw new Error("Current User is null!");
    }
    return updateEmail(currentUser, email);
  };

  const setPassword = (password: string) => {
    if (!currentUser) {
      throw new Error("Current User is null!");
    }
    return updatePassword(currentUser, password);
  };

  const setDisplayName = (displayName: string) => {
    if (!currentUser) {
      throw new Error("Current User is null!");
    }
    return updateProfile(currentUser, { displayName });
  };

  const setPhotoUrl = (photoURL: string) => {
    if (!currentUser) {
      throw new Error("Current User is null!");
    }
    setUserPhotoUrl(photoURL);
    return updateProfile(currentUser, { photoURL });
  };

  // add auth-state observer here (somehow... 😈)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user) {
        // User is logged in
        setUserEmail(user.email);
        setUserName(user.displayName);
        setUserPhotoUrl(user.photoURL);
      } else {
        // No user is logged in
        setUserEmail(null);
        setUserName(null);
        setUserPhotoUrl(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        reloadUser,
        setDisplayName,
        setEmail,
        setPassword,
        setPhotoUrl,
        userEmail,
        userName,
        userPhotoUrl,
      }}
    >
      {loading ? <div id="initial-loader">loadin....</div> : <>{children}</>}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
