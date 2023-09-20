import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useRestaurant from "../hooks/useGetRestaurant";
import { restuantCol } from "../services/firebase";
import RestaurantForm from "../components/RestaurantForm";
import { RestaurantFormData } from "../types/Restaurant.types";

const EditRestaurant = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const documentId = id as string;

  const { data, loading } = useRestaurant(documentId);

  if (loading || !data) {
    return <p>Loading todo...</p>;
  }

  const updateRestaurant = async (data: RestaurantFormData) => {
    // Get a reference to the document
    const docRef = doc(restuantCol, documentId);

    // Set the contents of the document
    toast.promise(
      updateDoc(docRef, {
        ...data,
      }),
      {
        pending: " Saving changes..",
        success: " Restaurant is saved successfully",
        error: "Something went wrong while saving the changes",
      }
    );
    navigate("/restaurants");
  };

  const deleteRestaurant = async () => {
    const docRef = doc(restuantCol, documentId);

    await deleteDoc(docRef);

    toast.success("deleted!");

    navigate("/restaurants", {
      replace: true,
    });
  };

  return (
    <>
      <h1>Edit: {data.Namn}</h1>

      <RestaurantForm onSave={updateRestaurant} initialValues={data} />

      <Button variant="warning" onClick={() => deleteRestaurant()}>
        Delete
      </Button>

      <Button variant="secondary" onClick={() => navigate(-1)}>
        &laquo; Go back
      </Button>
    </>
  );
};

export default EditRestaurant;
