import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Veneer {
  _id: string;
  source: string;
  specie: string;
  cut: string;
  match: string;
  grade: string;
  value: string;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface VeneerState {
  veneers: Veneer[];
  loading: boolean;
  error: string | null;
}

const initialState: VeneerState = {
  veneers: [],
  loading: false,
  error: null,
};

const veneerSlice = createSlice({
  name: "veneer",
  initialState,
  reducers: {
    setVeneers: (state, action: PayloadAction<Veneer[]>) => {
      state.veneers = action.payload;
    },
    addVeneer: (state, action: PayloadAction<Veneer>) => {
      state.veneers.push(action.payload);
    },
    updateVeneer: (state, action: PayloadAction<Veneer>) => {
      const index = state.veneers.findIndex(
        (veneer) => veneer._id === action.payload._id
      );
      if (index !== -1) {
        state.veneers[index] = action.payload;
      }
    },
    removeVeneer: (state, action: PayloadAction<string>) => {
      state.veneers = state.veneers.filter(
        (veneer) => veneer._id !== action.payload
      );
    },
  },
});

export const { removeVeneer, setVeneers, addVeneer, updateVeneer } =
  veneerSlice.actions;

export default veneerSlice.reducer;
