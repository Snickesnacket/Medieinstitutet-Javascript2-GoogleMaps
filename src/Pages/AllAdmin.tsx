import Table from "react-bootstrap/Table";
import useAdmin from "../hooks/useAdmin";

export const Admins = () => {
  const { data, loading } = useAdmin();
  return (
    <>
      {loading && <p>Loading...</p>}

      {data && data.length && (
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Namn</th>
              <th>Profilbild</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.Namn}</td>
                <td>
                  <img
                    src={item.photoURL}
                    alt={item.Namn}
                    style={{ width: "20%", height: "auto" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default Admins;
