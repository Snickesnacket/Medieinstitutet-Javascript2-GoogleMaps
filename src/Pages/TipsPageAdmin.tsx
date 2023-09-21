import { Card, ListGroup, Button } from "react-bootstrap";
import useTips from "../hooks/usegetTips";
import { tipsCol } from "../services/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const Tips = () => {
  const { data, loading } = useTips();

  const deleteTip = async (documentId: string) => {
    try {
      const docRef = doc(tipsCol, documentId);
      await deleteDoc(docRef);
      toast.success("Deleted successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        return toast.error("Error deleting tip: " + error.message);
      }
    }
  };

  return (
    <>
      {loading && <p>Loading...</p>}

      {data && data.length > 0 && (
        <Card style={{ width: "18rem" }}>
          {data.map((tip) => (
            <ListGroup variant="flush" key={tip._id}>
              <Card.Title>From: {tip.email}</Card.Title>
              <Card.Text>{tip.Tips}</Card.Text>
              <Button variant="danger" onClick={() => deleteTip(tip._id)}>
                Delete
              </Button>
            </ListGroup>
          ))}
        </Card>
      )}
    </>
  );
};

export default Tips;
