import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../globals";

export const getAllParticipants = createAsyncThunk(
  "participants/getAllParticipants",
  async () => {
    try {
      const res = await fetch(`${API}/participants`, {
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

export const createParticipant = createAsyncThunk(
  "participants/createParticipant",
  async (values, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API}/participants`, {
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

export const editParticipant = createAsyncThunk(
  "participants/editParticipant",
  async (values, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API}/participants/${values.participantId}`, {
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

const ParticipantSlicer = createSlice({
  name: "participants",
  initialState: {
    participants: [],
    loading: false,
    error: null,
    success: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllParticipants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllParticipants.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.participants = payload;
      })
      .addCase(getAllParticipants.rejected, (state, { payload }) => {
        console.log(payload);
        state.loading = false;
        state.error = payload;
      })
      .addCase(createParticipant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createParticipant.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.participants = payload.data;
      })
      .addCase(createParticipant.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(editParticipant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editParticipant.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.participants = payload.data;
      })
      .addCase(editParticipant.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default ParticipantSlicer.reducer;
