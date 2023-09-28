import { newTipCol } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Tip } from "../types/Tips.types";
import TipForm from "../components/TipForm";

export const CreateTip = () => {
  const addTip = async (data: Tip) => {
    const docRef = doc(newTipCol);

    await setDoc(docRef, {
      ...data,
    });
  };
  return (
    <>
      <h1>Skicka in ett tips till oss</h1>
      <TipForm onSave={addTip} />
    </>
  );
};
