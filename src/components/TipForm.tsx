import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, SubmitHandler } from "react-hook-form";
import { NewTip, Tip } from "../types/Tips.types";

interface IProps {
  onSave: (data: Tip) => Promise<void>;
  initialValues?: NewTip;
}

const TipForm: React.FC<IProps> = ({ onSave, initialValues }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<Tip>({
    defaultValues: initialValues,
  });

  const onFormSubmit: SubmitHandler<Tip> = async (data: Tip) => {
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
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          {...register("email", { required: "Email" })}
        />
        {errors.email && <p className="invalid">{errors.email.message}</p>}
      </Form.Group>

      <Form.Group>
        <Form.Label>Beskrivning</Form.Label>
        <Form.Control type="text" {...register("Tips")} />
      </Form.Group>
      <Button type="submit" variant="success">
        Save
      </Button>
    </Form>
  );
};

export default TipForm;
