import { FirebaseError } from "firebase/app";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { LoginCredentials } from "../types/Admin.types";

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginCredentials>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onLogin: SubmitHandler<LoginCredentials> = async (data) => {
    // Clear any previous error state
    setErrorMessage(null);

    // Try to log in the user with the provided credentials
    try {
      setLoading(true);
      await login(data.email, data.password);

      // If successful, redirect to the home page
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(
          "Something went wrong. Have you tried turning it off and on again?"
        );
      }
      setLoading(false);
    }
  };

  return (
    <Container className="py-3 center-y">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-3">Login</Card.Title>

              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

              <Form onSubmit={handleSubmit(onLogin)}>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    placeholder="snelhest2000@horsemail.com"
                    type="email"
                    {...register("email", {
                      required: "You have to enter your email",
                    })}
                  />
                  {errors.email && (
                    <p className="invalid">
                      {errors.email.message ?? "Invalid value"}
                    </p>
                  )}
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="new-password"
                    {...register("password", {
                      required:
                        "You're kidding, right? Enter your password, stupid",
                      minLength: {
                        value: 3,
                        message: "Your password is at least 3 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="invalid">
                      {errors.password.message ?? "Invalid value"}
                    </p>
                  )}
                  <Form.Text>At least 6 characters</Form.Text>
                </Form.Group>

                <Button disabled={loading} variant="primary" type="submit">
                  {loading ? "Logging in..." : "Log In"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
