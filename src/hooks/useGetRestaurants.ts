import { restuantCol } from "../services/firebase";
import { Restaurant } from "../types/Restaurant.types";
import useStreamCollection from "./useStreamCollection";

const useGetTodos = () => {
  return useStreamCollection<Restaurant>(restuantCol);
};

export default useGetTodos;
