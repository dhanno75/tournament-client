import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../globals";

export const getAllTournaments = createAsyncThunk(
  "tournaments/getAllTournaments",
  async () => {
    try {
      const res = await fetch(`${API}/tournaments`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let { data } = await res.json();

      return data;
    } catch (err) {
      console.log(err);
      // if (err.response && err.response.data.message) {
      //   return rejectWithValue(err.response.data.message);
      // } else {
      //   return rejectWithValue(err.message);
      // }
    }
  }
);

export const getOneTournament = createAsyncThunk(
  "tournaments/getOneTournament",
  async (values, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API}/tournaments/${values.tournamentId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let { data } = await res.json();

      return data;
    } catch (err) {
      console.log(err);
      // if (err.response && err.response.data.message) {
      //   return rejectWithValue(err.response.data.message);
      // } else {
      //   return rejectWithValue(err.message);
      // }
    }
  }
);

export const createTournament = createAsyncThunk(
  "tournaments/createTournament",
  async (values, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API}/tournaments`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      return data;
    } catch (err) {
      if (err.response && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const editTournament = createAsyncThunk(
  "tournaments/editTournament",
  async (values, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API}/tournaments/${values.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values.formDetails),
      });
      const data = await res.json();

      return data;
    } catch (err) {
      if (err.response && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

const TournamentSlicer = createSlice({
  name: "tournaments",
  initialState: {
    tournaments: [],
    loading: false,
    error: null,
    success: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTournaments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTournaments.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.loading = false;
        state.success = true;
        state.tournaments = payload;
      })
      .addCase(getAllTournaments.rejected, (state, { payload }) => {
        console.log(payload);
        state.loading = false;
        state.error = payload;
      })
      .addCase(getOneTournament.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneTournament.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.loading = false;
        state.success = true;
        state.tournaments = payload;
      })
      .addCase(getOneTournament.rejected, (state, { payload }) => {
        console.log(payload);
        state.loading = false;
        state.error = payload;
      })
      .addCase(createTournament.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTournament.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.tournaments = payload.data;
      })
      .addCase(createTournament.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(editTournament.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTournament.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.tournaments = payload.data;
      })
      .addCase(editTournament.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default TournamentSlicer.reducer;
