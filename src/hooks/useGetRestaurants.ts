import { orderBy } from "firebase/firestore";
import { restuantCol } from "../services/firebase";
import { Restaurant } from "../types/Restaurant.types";
import useGetCollection from "./useGetCollection";

const useRestaurants = () => {
  return useGetCollection<Restaurant>(restuantCol, orderBy("Namn"));
};

export default useRestaurants;
