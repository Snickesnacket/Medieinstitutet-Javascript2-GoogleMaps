import { orderBy } from "firebase/firestore";
import { restuantCol } from "../services/firebase";
import { Restaurant } from "../types/Restaurant.types";
import useStreamCollection from "./useStreamCollection";

const useRestaurants = () => {
  return useStreamCollection<Restaurant>(restuantCol, orderBy("name"));
};

export default useRestaurants;
