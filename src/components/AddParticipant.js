import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { participantSchema } from "../schemas";
import { useDispatch } from "react-redux";
import { createParticipant } from "../redux/features/ParticipantSlicer";

const AddParticipant = () => {
  const dispatch = useDispatch();
  const [level, setLevel] = useState("");

  const initialValues = {
    name: "",
    email: "",
    level: "",
    location: "",
  };
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: participantSchema,
      onSubmit: (values, action) => {
        values = {
          ...values,
          level,
        };
        dispatch(createParticipant(values));
        setTimeout(
          () => window.location.replace("http://localhost:3000/"),
          2000
        );
      },
    });

  return (
    <div id="tournament-form-container">
      <Form id="tournament-form" onSubmit={handleSubmit}>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="mb-5"
        >
          Add a participant
        </h1>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="ematextil"
            placeholder="Ex: Counter strike tournament"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && touched ? (
            <span className="text-danger">{errors.name}</span>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3 lg-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Ex: johndoe@example.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched ? (
            <span className="text-danger">{errors.email}</span>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="string"
            name="location"
            placeholder="Location"
            value={values.location}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.location && touched ? (
            <span className="text-danger">{errors.location}</span>
          ) : null}
        </Form.Group>

        <Form.Label>Level</Form.Label>
        <Form.Select
          aria-label="Default select example"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          required
          name="level"
        >
          <option value="" disabled>
            Select level
          </option>
          <option value="rookie">rookie</option>
          <option value="master">master</option>
          <option value="legend">legend</option>
        </Form.Select>

        <Button type="submit" className="mt-3">
          Add Participant
        </Button>
      </Form>
    </div>
  );
};

export default AddParticipant;
