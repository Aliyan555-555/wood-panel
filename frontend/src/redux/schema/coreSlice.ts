import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Core {
  _id: string;
  name: string;
  value: string;
  source: string;
}

interface initialStateType {
  cores: Core[];
}
const initialState: initialStateType = {
  cores: [],
};

const coreSlice = createSlice({
  name: "coreSlice",
  initialState,
  reducers: {
    setCores: (state, action: PayloadAction<Core[]>) => {
      state.cores = action.payload;
    },
    addCore: (state, action: PayloadAction<Core>) => {
      state.cores.push(action.payload);
    },
    updateCore: (state, action: PayloadAction<Core>) => {
      const index = state.cores.findIndex(
        (core) => core._id === action.payload._id
      );
      if (index !== -1) {
        state.cores[index] = action.payload;
      }
    },
    removeCore: (state, action: PayloadAction<string>) => {
      state.cores = state.cores.filter((core) => core._id !== action.payload);
    },
  },
});

export const { setCores, addCore, removeCore,updateCore } = coreSlice.actions;
export default coreSlice.reducer;
