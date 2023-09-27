import { Button } from "react-bootstrap";
import useTips from "../hooks/useGetTips";
import { tipsCol } from "../services/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import Table from "react-bootstrap/Table";

const Tips = () => {
  const { data, loading } = useTips();

  const deleteTip = async (documentId: string) => {
    try {
      const docRef = doc(tipsCol, documentId);
      await deleteDoc(docRef);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return alert("Error deleting tip: " + error.message);
      }
    }
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {data && data.length && (
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>From</th>
              <th>Tip</th>
              <th>Radera</th>
            </tr>
          </thead>
          <tbody>
            {data.map((tip) => (
              <tr key={tip._id}>
                <td>{tip.email}</td>
                <td>{tip.Tips}</td>
                <Button variant="danger" onClick={() => deleteTip(tip._id)}>
                  Delete
                </Button>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default Tips;
