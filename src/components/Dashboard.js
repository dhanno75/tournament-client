import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTournaments } from "../redux/features/TournamentSlicer";
import { getAllParticipants } from "../redux/features/ParticipantSlicer";
import {
  Badge,
  Button,
  Card,
  Carousel,
  Container,
  Tab,
  Table,
  Tabs,
} from "react-bootstrap";
import BeatLoader from "react-spinners/BeatLoader";
import { Link } from "react-router-dom";
import { API } from "../globals";
import intro from "../images/intro.png";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tournaments } = useSelector((state) => state.tournaments);
  const { participants } = useSelector((state) => state.participants);

  useEffect(() => {
    dispatch(getAllTournaments());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllParticipants());
  }, [dispatch]);

  // Function to delete participant
  const handleDelete = async (participantId) => {
    await fetch(`${API}/participants/${participantId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    dispatch(getAllParticipants());
  };

  // storing the participants data in localstorage
  const setParticipantData = (participant) => {
    console.log(participant);
    localStorage.setItem("participantName", participant.name);
    localStorage.setItem("participantEmail", participant.email);
    localStorage.setItem("location", participant.location);
    localStorage.setItem("level", participant.level);
  };

  return (
    <Container fluid>
      <div className="dashboard_container">
        <Carousel>
          <Carousel.Item style={{ height: "60%" }}>
            <img
              className="d-block w-100"
              src={intro}
              alt="First slide"
              style={{ width: "100%", objectFit: "cover" }}
              height={700}
            />
          </Carousel.Item>
          {tournaments.length !== 0 ? (
            tournaments.map((tournament) => (
              <Carousel.Item style={{ height: "60%" }} key={tournament._id}>
                <img
                  className="d-block w-100"
                  src={tournament.banner}
                  alt="First slide"
                  style={{ width: "100%", objectFit: "cover" }}
                  height={600}
                />
                <Carousel.Caption>
                  <h5 style={{ fontSize: "40px" }}>
                    {tournament.tournamentName}
                  </h5>
                  <p
                    style={{ fontSize: "22px" }}
                  >{`Tournament starts on: ${new Date(tournament.startDate)
                    .toUTCString()
                    .split(" ")
                    .slice(0, 4)
                    .join(" ")} and ends on ${new Date(tournament.endDate)
                    .toUTCString()
                    .split(" ")
                    .slice(0, 4)
                    .join(" ")}`}</p>
                  <h4 style={{ fontSize: "25px" }}>
                    Status: {tournament.currentStatus}
                  </h4>
                </Carousel.Caption>
              </Carousel.Item>
            ))
          ) : (
            <BeatLoader
              color="#36d7b7"
              cssOverride={{
                position: "fixed",
                transform: "translate(-50%, -50%)",
                top: "50%",
                left: "22%",
              }}
            />
          )}
        </Carousel>
        <div style={{ display: "block", width: "100%", padding: 30 }}>
          <h4 style={{ marginBottom: "30px" }}>
            Tournament & Participant details
          </h4>
          <Tabs defaultActiveKey="first" fill>
            <Tab
              eventKey="first"
              title="Tournaments"
              style={{ padding: "20px", paddingTop: "70px" }}
            >
              <div className="card-container">
                {tournaments ? (
                  tournaments.map((tournament) => (
                    <Card
                      style={{ width: "18rem", paddingBottom: "5px" }}
                      key={tournament._id}
                    >
                      <Card.Img variant="top" src={tournament.banner} />
                      <Card.Body>
                        <Card.Title>{tournament.tournamentName}</Card.Title>
                        <Card.Text>{tournament.description}</Card.Text>
                        <h6>Date:</h6>
                        <Badge bg="success">
                          {new Date(tournament.startDate)
                            .toUTCString()
                            .split(" ")
                            .slice(0, 4)
                            .join(" ")}
                        </Badge>
                        &nbsp;- &nbsp;
                        <Badge bg="warning" className="mb-3">
                          {new Date(tournament.endDate)
                            .toUTCString()
                            .split(" ")
                            .slice(0, 4)
                            .join(" ")}
                        </Badge>
                        <Link to={`/tournament/${tournament._id}`}>
                          <Button>More details</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <BeatLoader color="#36d7b7" />
                )}
              </div>
            </Tab>
            <Tab
              eventKey="second"
              title="Participants"
              style={{ padding: "20px", paddingTop: "70px" }}
            >
              <div className=" table-container">
                <Table
                  responsive="sm"
                  striped
                  bordered
                  hover
                  style={{
                    maxWidth: "100%",
                    tableLayout: "fixed",
                    wordBreak: "break-word",
                  }}
                >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Level</th>
                      <th>Location</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants ? (
                      participants.map((participant) => (
                        <tr key={participant._id}>
                          <td>{participant.name}</td>
                          <td>{participant.email}</td>
                          <td>{participant.level}</td>
                          <td>{participant.location}</td>
                          <td
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Link to={`/participant/${participant._id}`}>
                              <Button
                                variant="info"
                                onClick={() => setParticipantData(participant)}
                              >
                                Edit
                              </Button>
                            </Link>
                            &nbsp;&nbsp;
                            <Button
                              variant="danger"
                              onClick={() => handleDelete(participant._id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <BeatLoader color="#36d7b7" />
                    )}
                  </tbody>
                </Table>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
