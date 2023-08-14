import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { tournamentSchema } from "../schemas";
import { useDispatch, useSelector } from "react-redux";
import { getAllParticipants } from "../redux/features/ParticipantSlicer";
import { createTournament } from "../redux/features/TournamentSlicer";

const CreateTournament = () => {
  const { participants } = useSelector((state) => state.participants);
  const dispatch = useDispatch();
  const [currentStatus, setCurrentStatus] = useState("");
  const [participantChecked, setParticipantChecked] = useState([]);
  useEffect(() => {
    dispatch(getAllParticipants());
  }, [dispatch]);

  const handleCheckChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setParticipantChecked([...participantChecked, value]);
    } else {
      setParticipantChecked(
        participantChecked.filter((participantId) => participantId !== value)
      );
    }
  };

  const initialValues = {
    tournamentName: "",
    startDate: "",
    endDate: "",
    banner: "",
    description: "",
  };
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: tournamentSchema,
      onSubmit: (values, action) => {
        values = {
          ...values,
          currentStatus,
          participantsId: participantChecked,
        };
        dispatch(createTournament(values));
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
          Add Tournament
        </h1>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Tournament name</Form.Label>
          <Form.Control
            type="ematextil"
            placeholder="Ex: Counter strike tournament"
            name="tournamentName"
            value={values.tournamentName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.tournamentName && touched ? (
            <span className="text-danger">{errors.tournamentName}</span>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3 lg-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Start date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={values.startDate}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.startDate && touched ? (
            <span className="text-danger">{errors.startDate}</span>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>End date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            value={values.endDate}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.endDate && touched ? (
            <span className="text-danger">{errors.endDate}</span>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="string"
            name="description"
            placeholder="Description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.description && touched ? (
            <span className="text-danger">{errors.description}</span>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Banner</Form.Label>
          <Form.Control
            type="string"
            name="banner"
            placeholder="Banner url"
            value={values.banner}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.banner && touched ? (
            <span className="text-danger">{errors.banner}</span>
          ) : null}
        </Form.Group>

        <Form.Label>Status</Form.Label>
        <Form.Select
          aria-label="Default select example"
          value={currentStatus}
          onChange={(e) => setCurrentStatus(e.target.value)}
          required
          name="CurrentStatus"
        >
          <option value="" disabled>
            Select status
          </option>
          <option value="upcoming">upcoming</option>
          <option value="ongoing">ongoing</option>
          <option value="over">over</option>
        </Form.Select>

        <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlInput1">
          <Form.Label style={{ display: "block" }}>Participants</Form.Label>
          {participants.map((participant) => (
            <Form.Check // prettier-ignore
              key={participant._id}
              inline
              name="paricipantsId"
              value={participant._id}
              onChange={handleCheckChange}
              type="switch"
              id="custom-switch"
              label={participant.name}
            />
          ))}
        </Form.Group>

        <Button type="submit" className="mt-3">
          Add tournament
        </Button>
      </Form>
    </div>
  );
};

export default CreateTournament;
