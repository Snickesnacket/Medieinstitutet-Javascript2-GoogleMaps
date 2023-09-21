import { newTipCol } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Tip } from "../types/Tips.types";
import TipForm from "../components/TipForm";

export const CreateTip = () => {
  const addTip = async (data: Tip) => {
    const docRef = doc(newTipCol);

    await setDoc(docRef, {
      ...data,
    });

    // 🥂
    toast.success("A new Tip! 😁");
  };

  return (
    <>
      <h1>Skicka in ett tips till oss</h1>
      <TipForm onSave={addTip} />
    </>
  );
};
