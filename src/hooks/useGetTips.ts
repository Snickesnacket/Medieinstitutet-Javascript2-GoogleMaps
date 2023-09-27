import { orderBy } from "firebase/firestore";
import { tipsCol } from "../services/firebase";
import useStreamCollection from "./useStreamCollection";
import { Tip } from "../types/Tips.types";

const useTips = () => {
  return useStreamCollection<Tip>(tipsCol, orderBy("Tips"));
};

export default useTips;
