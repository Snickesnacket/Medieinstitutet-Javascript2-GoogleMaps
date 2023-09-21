import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  CollectionReference,
  collection,
  DocumentData,
  getFirestore,
} from "firebase/firestore";
import { NewRestaurant, Restaurant } from "../types/Restaurant.types";
import { Tip } from "../types/Tips.types";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSENGER_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

// get all restaurants
export const restuantCol = createCollection<Restaurant>("restaurants");
export const newRestaurantCol = createCollection<NewRestaurant>("restaurants");
export const tipsCol = createCollection<Tip>("Tips");

export default app;