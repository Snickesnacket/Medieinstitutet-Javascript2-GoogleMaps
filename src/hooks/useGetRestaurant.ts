import { restuantCol } from "../services/firebase";
import { Restaurant } from "../types/Restaurant.types";
import useGetDocument from "./useGetDocument";

const useRestaurant = (documentId: string) => {
  return useGetDocument<Restaurant>(restuantCol, documentId);
};

export default useRestaurant;
