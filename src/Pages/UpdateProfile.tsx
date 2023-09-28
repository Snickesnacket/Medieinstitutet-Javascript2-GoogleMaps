import { FirebaseError } from "firebase/app";
import { useRef, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { UpdateProfileFormData } from "../types/Admin.types";

const UpdateProfile = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const {
    currentUser,
    reloadUser,
    setDisplayName,
    setEmail,
    setPassword,
    setPhotoUrl,
  } = useAuth();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    defaultValues: {
      email: currentUser?.email ?? "",
      name: currentUser?.displayName ?? "",
      photoUrl: currentUser?.photoURL ?? "",
    },
  });

  const passwordRef = useRef("");
  passwordRef.current = watch("password");

  const onUpdateProfile: SubmitHandler<UpdateProfileFormData> = async (
    data
  ) => {
    setErrorMessage(null);
    try {
      setLoading(true);
      if (data.name !== (currentUser?.displayName ?? "")) {
        await setDisplayName(data.name);
      }
      if (data.photoUrl !== (currentUser?.photoURL ?? "")) {
        await setPhotoUrl(data.photoUrl);
      }

      if (data.email !== (currentUser?.email ?? "")) {
        await setEmail(data.email);
      }

      if (data.password) {
        await setPassword(data.password);
      }

      await reloadUser();
      setLoading(false);
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
              <Card.Title className="mb-3">Update Profile</Card.Title>

              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

              <Form onSubmit={handleSubmit(onUpdateProfile)}>
                <Form.Group controlId="displayName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    placeholder="Name"
                    type="text"
                    {...register("name", {})}
                  />
                  {errors.name && (
                    <p className="invalid">
                      {errors.name.message ?? "Invalid value"}
                    </p>
                  )}
                </Form.Group>

                <Form.Group controlId="photoURL" className="mb-3">
                  <Form.Label>Photo URL</Form.Label>
                  <Form.Control type="url" {...register("photoUrl")} />
                  {errors.photoUrl && (
                    <p className="invalid">
                      {errors.photoUrl.message ?? "Invalid value"}
                    </p>
                  )}
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    placeholder="email@com"
                    type="email"
                    {...register("email", {
                      required: "You have to enter an email",
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
                      minLength: {
                        value: 3,
                        message: "Please enter at least 3 characters",
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

                <Form.Group controlId="confirmPassword" className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="off"
                    {...register("passwordConfirm", {
                      minLength: {
                        value: 3,
                        message: "Please enter at least 3 characters",
                      },
                      validate: (value) => {
                        return (
                          !passwordRef.current ||
                          value === passwordRef.current ||
                          "No match"
                        );
                      },
                    })}
                  />
                  {errors.passwordConfirm && (
                    <p className="invalid">
                      {errors.passwordConfirm.message ?? "Invalid value"}
                    </p>
                  )}
                </Form.Group>

                <Button disabled={loading} variant="primary" type="submit">
                  {loading ? "Updating" : "Save"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateProfile;
