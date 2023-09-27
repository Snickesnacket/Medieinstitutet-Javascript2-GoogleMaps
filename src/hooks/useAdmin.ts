import { orderBy } from "firebase/firestore";
import { adminCol } from "../services/firebase";
import { AdminData } from "../types/Admin.types";
import useGetCollection from "./useGetCollection";

const useAdmin = () => {
  return useGetCollection<AdminData>(adminCol, orderBy("Namn"));
};
export default useAdmin;
