import RestaurantForm from "../components/RestaurantForm";
import { newRestaurantCol } from "../services/firebase";
import { RestaurantFormData } from "../types/Restaurant.types";
import { doc, setDoc } from "firebase/firestore";


export const CreateRestaurant = () => {
  const addRestaurant = async (data: RestaurantFormData) => {
    const docRef = doc(newRestaurantCol);
    await setDoc(docRef, {
      ...data,
    });
  };

  return (
    <>
      <h1>Fyll i uppgifter om restaurangen</h1>
      <RestaurantForm onSave={addRestaurant} />
    </>
  );
};
