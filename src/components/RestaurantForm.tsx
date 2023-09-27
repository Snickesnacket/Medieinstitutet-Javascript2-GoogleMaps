import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, SubmitHandler } from "react-hook-form";
import { RestaurantFormData } from "../types/Restaurant.types";

interface IProps {
  onSave: (data: RestaurantFormData) => Promise<void>;
  initialValues?: RestaurantFormData;
}

const RestaurantForm: React.FC<IProps> = ({ onSave, initialValues }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<RestaurantFormData>({
    defaultValues: initialValues,
  });

  const onFormSubmit: SubmitHandler<RestaurantFormData> = async (
    data: RestaurantFormData
  ) => {
    await onSave(data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(initialValues);
    }
  }, [isSubmitSuccessful, reset, initialValues]);

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)} className="mb-3">
      <Form.Group>
        <Form.Label>Namn</Form.Label>
        <Form.Control
          type="text"
          {...register("Namn", { required: "Namn is required" })}
        />
        {errors.Namn && <p className="invalid">{errors.Namn.message}</p>}
      </Form.Group>

      <Form.Group>
        <Form.Label>Gatuadress</Form.Label>
        <Form.Control
          type="text"
          {...register("Gatuadress", { required: "Gatuadress is required" })}
        />
        {errors.Gatuadress && (
          <p className="invalid">{errors.Gatuadress.message}</p>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Ort</Form.Label>
        <Form.Control type="text" {...register("Ort")} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Beskrivning</Form.Label>
        <Form.Control type="text" {...register("Beskrivning")} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Kategori</Form.Label>
        <Form.Control type="text" {...register("Kategori")} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Utbud</Form.Label>
        <Form.Control type="text" {...register("Utbud")} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Epost</Form.Label>
        <Form.Control type="email" {...register("epost")} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Telefon</Form.Label>
        <Form.Control type="nummer" {...register("tel")} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Hemsida</Form.Label>
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
        Save
      </Button>
    </Form>
  );
};

export default RestaurantForm;
