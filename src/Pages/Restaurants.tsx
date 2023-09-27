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

