import { Route, Routes } from "react-router-dom";
import "./assets/scss/App.scss";
import Container from "react-bootstrap/Container";
import { CreateRestaurant } from "./Pages/CreateRestaurant";
import HomePage from "./Pages/HomePage";
import EditRestaurant from "./Pages/EditResturant";
import Restaurants from "./Pages/Restaurants";
import Navigation from "./Pages/Partials/Navigation";
import LoggInPage from "./Pages/LoggInPage";

function App() {
  return (
    <div id="App">
      <Navigation />
      <Container className="py-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Create" element={<CreateRestaurant />}></Route>
          <Route path="/Restaurants">
            <Route path="" element={<Restaurants />} />
            <Route path=":id" element={<EditRestaurant />} />
          </Route>
          <Route path="/Loggin" element={<LoggInPage />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
``;
