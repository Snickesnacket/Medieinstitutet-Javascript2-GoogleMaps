import { orderBy } from "firebase/firestore";
import { restuantCol } from "../services/firebase";
import { Restaurant } from "../types/Restaurant.types";
import useStreamCollection from "./useStreamCollection";

//set searchParams of location as prop and give it as a location for where search.
const useGetLocation = () => {
  return useStreamCollection<Restaurant>(restuantCol, orderBy("Namn"));
};

export default useGetLocation;
