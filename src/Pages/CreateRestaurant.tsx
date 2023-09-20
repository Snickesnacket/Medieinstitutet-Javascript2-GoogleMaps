import RestaurantForm from "../components/RestaurantForm";
import { newRestaurantCol } from "../services/firebase";
import { RestaurantFormData } from "../types/Restaurant.types";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export const CreateRestaurant = () => {
  // Create a new restaurant in the API
  const addRestaurant = async (data: RestaurantFormData) => {
    // Add a new document with a generated ID
    const docRef = doc(newRestaurantCol);

    // Set the contents of the document
    await setDoc(docRef, {
      ...data,
    });

    // 🥂
    toast.success("A new Restaurant! 😁");
  };

  return (
    <>
      <h1>Fyll i uppgifter om restaurangen</h1>
      <RestaurantForm onSave={addRestaurant} />
    </>
  );
};
