import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      bg="primary"
      data-bs-theme="dark"
      style={{ height: "80px", padding: "0 30px" }}
    >
      <Container fluid>
        <Link to="/" className="links main-link">
          Dashboard
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end align-item-end">
            <Link to="/addTournament" className="links">
              Add tournament
            </Link>
            <Link to="/addParticipant" className="links">
              Add participant
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
