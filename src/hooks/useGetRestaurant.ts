import { restuantCol } from "../services/firebase";
import { Restaurant } from "../types/Restaurant.types";
import useStreamDocument from "./useStreamDocument";

const useRestaurant = (documentId: string) => {
  return useStreamDocument<Restaurant>(restuantCol, documentId);
};

export default useRestaurant;
