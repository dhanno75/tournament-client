import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./components/Navigations";
import { Route, Routes } from "react-router-dom";
import AddParticipant from "./components/AddParticipant";
import CreateTournament from "./components/CreateTournament";
import Dashboard from "./components/Dashboard";
import Tournament from "./components/Tournament";
import EditParticipant from "./components/EditParticipant";
import EditTournament from "./components/EditTournament";
// import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      {/* <ToastContainer> */}
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/addParticipant" element={<AddParticipant />} />
        <Route path="/addTournament" element={<CreateTournament />} />
        <Route path="/tournament/:tournamentId" element={<Tournament />} />
        <Route
          path="/editTournament/:tournamentId"
          element={<EditTournament />}
        />
        <Route
          path="/participant/:participantId"
          element={<EditParticipant />}
        />
      </Routes>
      {/* </ToastContainer> */}
    </div>
  );
}

export default App;
