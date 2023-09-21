import { useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import "../assets/scss/App.scss";

const HomePage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_FIREBASE_GOOGLE_API_KEY,
  });

  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  return (
    <Container fluid className="Homepage">
      <Row className="h-100">
        <Col xs={12} className="map-container">
          {!isLoaded ? (
            <h1>Loading...</h1>
          ) : (
            <GoogleMap
              mapContainerClassName="map-container"
              center={center}
              zoom={10}
            >
              <MarkerF position={{ lat: 18.52043, lng: 73.856743 }} />
            </GoogleMap>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
``;
