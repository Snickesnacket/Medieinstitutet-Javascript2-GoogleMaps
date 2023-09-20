import { ListGroup } from "react-bootstrap";
import useRestaurants from "../hooks/useGetRestaurants";
import { Link } from "react-router-dom";

const Restaurants = () => {
  const { data, loading } = useRestaurants();
  console.log(data);

  return (
    <>
      {loading && <p>Loading...</p>}

      {data && data.length > 0 && (
        <ListGroup className="restaurangLista">
          {data.map((restaurant) => (
            <ListGroup.Item
              action
              as={Link}
              key={restaurant._id}
              to={`/restaurants/${restaurant._id}`}
            >
              <h2 className="name">Namn: {restaurant.Namn}</h2>
              <p className="gatuadress">Gatuadress: {restaurant.Gatuadress}</p>
              <p className="ort">Ort: {restaurant.Ort}</p>
              <p className="beskrivning">
                Beskrivning: {restaurant.Beskrivning}
              </p>
              <p className="Kategori">Kategori: {restaurant.Kategori}</p>
              <p className="Utbud">Utbud: {restaurant.Utbud}</p>
              <p className="epost">Epost: {restaurant.epost}</p>
              <p className="tel">Tel: {restaurant.tel}</p>
              <p className="hemsida">Hemsida: {restaurant.hemsida}</p>
              <p className="facebook">Facebook: {restaurant.facebook}</p>
              <p className="insta">Instagram: {restaurant.instagram}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};
export default Restaurants;

/* 
<ListGroup className="mb-6">
					{data.data.map((item) => (

					<ListGroup.Item
						action
						as={Link}
						key={item.id}
						variant="success"
						to={`/starships/${item.id}`}
						>
						<h2 className="h3">{item.name}</h2>
						<p className="text-muted small mb-0">model: {item.model}</p>
						<p className="text-muted small mb-0">Starship class: {item.starship_class}</p>
						</ListGroup.Item>
 */
// spara datan i state

/* import { collection, query, where, getDocs } from "firebase/firestore";

const q = query(collection(db, "cities"), where("capital", "==", true));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
}); */
