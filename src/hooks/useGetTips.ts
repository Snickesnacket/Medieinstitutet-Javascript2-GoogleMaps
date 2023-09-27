import { orderBy } from "firebase/firestore";
import { tipsCol } from "../services/firebase";
import useCollection from "./useGetCollection";
import { Tip } from "../types/Tips.types";

const useTips = () => {
  return useCollection<Tip>(tipsCol, orderBy("Tips"));
};

export default useTips;
