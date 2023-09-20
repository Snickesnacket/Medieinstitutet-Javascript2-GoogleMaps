import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, SubmitHandler } from "react-hook-form";
import { NewRestaurant } from "../types/Restaurant.types";

interface IProps {
  onAddRestaurant: (data: NewRestaurant) => Promise<void>;
}

const AddRestaurantForm: React.FC<IProps> = ({ onAddRestaurant }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<NewRestaurant>();

  const onFormSubmit: SubmitHandler<NewRestaurant> = async (
    data: NewRestaurant
  ) => {
    await onAddRestaurant(data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)} className="mb-3">
      <Form.Group>
        <Form.Label>Namn</Form.Label>
        <Form.Control
          type="text"
          {...register("Namn", { required: "obligatosikt" })}
        />
        {errors.Namn && <p className="invalid">{errors.Namn.message}</p>}
      </Form.Group>

      <Form.Group>
        <Form.Label>Gatuadress</Form.Label>
        <Form.Control
          type="text"
          {...register("Gatuadress", {
            required: "Gatuadress är obligatoriskt",
          })}
        />
        {errors.Gatuadress && (
          <p className="invalid">{errors.Gatuadress.message}</p>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Ort</Form.Label>
        <Form.Control
          type="text"
          {...register("Ort", { required: "obligatosikt" })}
        />
        {errors.Gatuadress && (
          <p className="invalid">{errors.Gatuadress.message}</p>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Beskrivning</Form.Label>
        <Form.Control
          type="text"
          {...register("Beskrivning", { required: "obligatosikt" })}
        />
        {errors.Gatuadress && (
          <p className="invalid">{errors.Gatuadress.message}</p>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Latitud</Form.Label>
        <Form.Control
          type="text"
          {...register("Latitude", { required: "obligatosikt" })}
        />
        {errors.Latitude && (
          <p className="invalid">{errors.Latitude.message}</p>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Longitude</Form.Label>
        <Form.Control
          type="text"
          {...register("Longitude", { required: "obligatosikt" })}
        />
        {errors.Longitude && (
          <p className="invalid">{errors.Longitude.message}</p>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Kategori</Form.Label>
        <Form.Control
          type="text"
          {...register("Kategori", { required: "obligatosikt" })}
        />
        {errors.Gatuadress && (
          <p className="invalid">{errors.Gatuadress.message}</p>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Utbud</Form.Label>
        <Form.Control
          type="text"
          {...register("Utbud", { required: "obligatosikt" })}
        />
        {errors.Gatuadress && (
          <p className="invalid">{errors.Gatuadress.message}</p>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Epost</Form.Label>
        <Form.Control type="email" {...register("epost")} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Telefon</Form.Label>
        <Form.Control type="tel" {...register("tel")} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Webbplats</Form.Label>
        <Form.Control type="url" {...register("hemsida")} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Facebook</Form.Label>
        <Form.Control type="url" {...register("facebook")} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Instagram</Form.Label>
        <Form.Control type="url" {...register("instagram")} />
      </Form.Group>

      <Button type="submit" variant="success">
        Lägg till restaurang
      </Button>
    </Form>
  );
};

export default AddRestaurantForm;
