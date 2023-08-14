import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editParticipant } from "../redux/features/ParticipantSlicer";
import { useParams } from "react-router-dom";

const EditParticipant = () => {
  const dispatch = useDispatch();
  const { participantId } = useParams();
  const [level, setLevel] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("participantName"));
    setEmail(localStorage.getItem("participantEmail"));
    setLocation(localStorage.getItem("location"));
    setLevel(localStorage.getItem("level"));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDetails = {
      name,
      email,
      location,
      level,
    };

    dispatch(editParticipant({ participantId, formDetails }));

    localStorage.removeItem("participantName");
    localStorage.removeItem("participantEmail");
    localStorage.removeItem("location");
    localStorage.removeItem("level");

    setTimeout(() => window.location.replace("http://localhost:3000/"), 3000);
  };

  return (
    <div id="tournament-form-container">
      <Form id="tournament-form" onSubmit={(e) => handleSubmit(e)}>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="mb-5"
        >
          Edit participant
        </h1>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="ematextil"
            placeholder="Ex: Counter strike tournament"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3 lg-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Ex: johndoe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="string"
            name="location"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
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
          Edit Participant
        </Button>
      </Form>
    </div>
  );
};

export default EditParticipant;
