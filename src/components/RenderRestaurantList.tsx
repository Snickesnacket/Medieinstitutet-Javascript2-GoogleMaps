import { Card, Container, ListGroup, Row } from "react-bootstrap";
import { Restaurant } from "../types/Restaurant.types";
interface Iprops {
  validRestaurants: Restaurant[];
}
export const RenderRestaurantsList: React.FC<Iprops> = ({
  validRestaurants,
}) => {
  return (
    <ListGroup className="mb-6">
      <Container>
        <Row>
          {validRestaurants.map((restaurant) => (
            <Card key={restaurant._id} className="m-2">
              <Card.Body>
                <Card.Title>{restaurant.Namn}</Card.Title>
                <Card.Text>{restaurant.Beskrivning}</Card.Text>
                <Card.Text>{restaurant.hemsida}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </ListGroup>
  );
};
