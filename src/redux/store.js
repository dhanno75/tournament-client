import { configureStore } from "@reduxjs/toolkit";
import TournamentSlicer from "./features/TournamentSlicer";
import ParticipantSlicer from "./features/ParticipantSlicer";

export default configureStore({
  reducer: {
    tournaments: TournamentSlicer,
    participants: ParticipantSlicer,
  },
});
