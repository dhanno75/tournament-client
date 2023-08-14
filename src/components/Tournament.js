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

  const deleteTournament = async (tournamentId) => {
    await fetch(`${API}/tournaments/${tournamentId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    setTimeout(() => window.location.replace("http://localhost:3000/"), 2000);
  };

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
      {/* <h1 style={{ margin: "10px 0", textAlign: "center" }}>
        🕹️ {tournaments ? tournaments[0].tournamentName : ""}
      </h1> */}
      <Row style={{ borderRadius: "10px" }}>
        {tournaments
          ? tournaments.map((tournament) => (
              <div key={tournament._id} className="tournament-banner">
                <Col sm={12} md={12} lg={12}>
                  <img
                    src={tournament.banner}
                    alt={tournament.tournamentName}
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                    className="banner-img"
                  />
                </Col>
                <Col
                  sm={12}
                  md={12}
                  lg={12}
                  style={{
                    padding: "20px",
                  }}
                >
                  <div className="about">
                    <h1>{tournament.tournamentName}</h1>
                    <p>{tournament.description}</p>
                    <div>
                      <div>
                        Tournament begins on&nbsp;
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
                      <ol>
                        <p>Participants:</p>
                        {tournament.result
                          ? tournament.result.map((participant) => (
                              <li key={participant._id}>{participant.name}</li>
                            ))
                          : ""}
                      </ol>
                    </div>
                    <Link to={`/editTournament/${tournamentId}`}>
                      <Button onClick={() => setTData(tournament)}>
                        Edit tournament
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => deleteTournament(tournament._id)}
                    >
                      Delete tournament
                    </Button>
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
