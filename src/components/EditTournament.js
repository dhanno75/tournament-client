import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllParticipants } from "../redux/features/ParticipantSlicer";
import { editTournament } from "../redux/features/TournamentSlicer";

const EditTournament = () => {
  const { participants } = useSelector((state) => state.participants);
  const dispatch = useDispatch();
  const [currentStatus, setCurrentStatus] = useState("");
  const [participantChecked, setParticipantChecked] = useState([]);
  const [tournamentName, setTournamentName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [banner, setBanner] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getAllParticipants());
  }, [dispatch]);

  useEffect(() => {
    setTournamentName(localStorage.getItem("tournamentName"));
    setStartDate(localStorage.getItem("startDate"));
    setEndDate(localStorage.getItem("endDate"));
    setBanner(localStorage.getItem("banner"));
    setDescription(localStorage.getItem("description"));
    setCurrentStatus(localStorage.getItem("currentStatus"));
    setParticipantChecked([
      ...localStorage.getItem("participantsId").split(","),
    ]);
  }, []);

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

  // Function to submit the edit form of tournament and clearing the localstorage
  const handleSubmit = (e) => {
    e.preventDefault();
    let formDetails = {
      tournamentName,
      startDate,
      endDate,
      banner,
      description,
      currentStatus,
      participantsId: participantChecked,
    };
    let id = localStorage.getItem("tournamentID");
    dispatch(editTournament({ id, formDetails }));

    localStorage.removeItem("tournamentName");
    localStorage.removeItem("startDate");
    localStorage.removeItem("endDate");
    localStorage.removeItem("banner");
    localStorage.removeItem("description");
    localStorage.removeItem("currentStatus");
    localStorage.removeItem("participantsId");
    localStorage.removeItem("tournamentID");

    setTimeout(
      () =>
        window.location.replace("https://tournament-dhananjay.netlify.app/"),
      2000
    );
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
          Add Tournament
        </h1>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Tournament name</Form.Label>
          <Form.Control
            type="ematextil"
            placeholder="Ex: Counter strike tournament"
            name="tournamentName"
            value={tournamentName}
            onChange={(e) => setTournamentName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3 lg-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Start date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>End date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="string"
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Banner</Form.Label>
          <Form.Control
            type="string"
            name="banner"
            placeholder="Banner url"
            value={banner}
            onChange={(e) => setBanner(e.target.value)}
          />
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
          Edit tournament
        </Button>
      </Form>
    </div>
  );
};

export default EditTournament;
