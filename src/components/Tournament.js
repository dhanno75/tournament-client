import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOneTournament } from "../redux/features/TournamentSlicer";
import { API } from "../globals";

const Tournament = () => {
  const { tournamentId } = useParams();
  const dispatch = useDispatch();
  const { tournaments } = useSelector((state) => state.tournaments);

  useEffect(() => {
    dispatch(getOneTournament({ tournamentId }));
  }, [dispatch, tournamentId]);

  // Function to delete the tournament
  const deleteTournament = async (tournamentId) => {
    await fetch(`${API}/tournaments/${tournamentId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    setTimeout(
      () =>
        window.location.replace("https://tournament-dhananjay.netlify.app/"),
      2000
    );
  };

  // Function to store the tournament data to localstorage
  const setTData = (tournament) => {
    localStorage.setItem("tournamentName", tournament.tournamentName);
    localStorage.setItem(
      "startDate",
      new Date(tournament.startDate).toISOString().split("T")[0]
    );
    localStorage.setItem(
      "endDate",
      new Date(tournament.endDate).toISOString().split("T")[0]
    );
    localStorage.setItem("banner", tournament.banner);
    localStorage.setItem("description", tournament.description);
    localStorage.setItem("currentStatus", tournament.currentStatus);
    localStorage.setItem("participantsId", tournament.participantsId.join(","));
    localStorage.setItem("tournamentID", tournament._id);
  };

  return (
    <Container fluid style={{ padding: "30px" }}>
      <Row style={{ borderRadius: "10px", height: "600px" }}>
        {tournaments
          ? tournaments.map((tournament) => (
              <div key={tournament._id} className="tournament-banner">
                <Col lg={6} md={12} sm={12}>
                  <img
                    src={tournament.banner}
                    alt={tournament.tournamentName}
                    style={{
                      width: "100%",
                      objectFit: "cover",
                    }}
                    className="banner-img"
                  />
                </Col>
                <Col
                  lg={6}
                  md={12}
                  sm={12}
                  style={{
                    padding: "20px",
                    border: "1px solid black",
                  }}
                >
                  <div className="about">
                    <h1>{tournament.tournamentName}</h1>
                    <p>
                      <span style={{ fontSize: "19px", color: "gray" }}>
                        About:
                      </span>{" "}
                      {tournament.description}
                    </p>
                    <div>
                      <div>
                        <span style={{ fontSize: "18px", color: "gray" }}>
                          Details:
                        </span>
                        &nbsp; Tournament begins on&nbsp;
                        <mark>
                          {new Date(tournament.startDate)
                            .toUTCString()
                            .split(" ")
                            .slice(0, 4)
                            .join(" ")}
                        </mark>
                        &nbsp;and ends on&nbsp;
                        <mark>
                          {new Date(tournament.endDate)
                            .toUTCString()
                            .split(" ")
                            .slice(0, 4)
                            .join(" ")}
                        </mark>
                      </div>
                    </div>
                    <div className="participant-list">
                      <p style={{ marginBottom: "-0.5px" }}>
                        Participants list:
                      </p>
                      <ul>
                        {tournament.result
                          ? tournament.result.map((participant) => (
                              <li key={participant._id}>{participant.name}</li>
                            ))
                          : ""}
                      </ul>
                    </div>
                    <div className="tour-btns">
                      <Link to={`/editTournament/${tournamentId}`}>
                        <Button onClick={() => setTData(tournament)}>
                          Edit tournament
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        onClick={() => deleteTournament(tournament._id)}
                        size="sm"
                      >
                        Delete tournament
                      </Button>
                    </div>
                  </div>
                </Col>
              </div>
            ))
          : ""}
      </Row>
    </Container>
  );
};

export default Tournament;
