import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Option {
  value: string;
  text: string;
  source?: string;
}

interface Store {
  activeOptions: number;
  material: Option;
  size: Option;
  thickness: Option;
  faceCut: Option;
  faceMatch: Option;
  faceGrade: Option;
  faceGrain: Option;
  faceSpecies: Option;
  backCut: Option;
  backMatch: Option;
  backGrade: Option;
  isPDF: boolean;
}

const initialState: Store = {
  activeOptions: 0,
  material: { value: '', text: '',source:"" },
  size: { value: '4x8', text: '4 foot x 8 foot' },
  thickness: { value: '0.25', text: '1/4 inch' },
  faceCut: { value: 'plain-sliced', text: 'Plain sliced' },
  faceMatch: { value: 'pleasing-match', text: 'Pleasing match' },
  faceGrade: { value: 'B', text: 'B' },
  faceSpecies: { value: 'cherry', text: 'Cherry' },
  faceGrain: { value: 'length', text: 'Length' },
  backCut: { value: 'rotary', text: 'Rotary' },
  backMatch: { value: 'book', text: 'Book match' },
  backGrade: { value: '1', text: '1' },
  isPDF: false,
};

const baseSlice = createSlice({
  name: 'baseSlice',
  initialState,
  reducers: {
    setInitialData: (state, action: PayloadAction<Store>) => {
      Object.assign(state, action.payload);
    },
    setActiveOptions: (state, action: PayloadAction<number>) => {
      state.activeOptions = action.payload;
    },
    setMaterial: (state, action: PayloadAction<Option>) => {
      state.material = action.payload;
    },
    setSize: (state, action: PayloadAction<Option>) => {
      state.size = action.payload;
    },
    setThickness: (state, action: PayloadAction<Option>) => {
      state.thickness = action.payload;
    },
    setFaceCut: (state, action: PayloadAction<Option>) => {
      state.faceCut = action.payload;
    },
    setFaceMatch: (state, action: PayloadAction<Option>) => {
      state.faceMatch = action.payload;
    },
    setFaceGrade: (state, action: PayloadAction<Option>) => {
      state.faceGrade = action.payload;
    },
    setFaceSpecies: (state, action: PayloadAction<Option>) => {
      state.faceSpecies = action.payload;
    },
    setFaceGrain: (state, action: PayloadAction<Option>) => {
      state.faceGrain = action.payload;
    },
    setBackCut: (state, action: PayloadAction<Option>) => {
      state.backCut = action.payload;
    },
    setBackMatch: (state, action: PayloadAction<Option>) => {
      state.backMatch = action.payload;
    },
    setBackGrade: (state, action: PayloadAction<Option>) => {
      state.backGrade = action.payload;
    },
    togglePDF: (state) => {
      state.isPDF = !state.isPDF;
    },
    resetOptions: () => initialState, // Resets state to initial values
  },
});

export const {
  setActiveOptions,
  setMaterial,
  setSize,
  setThickness,
  setInitialData,
  setFaceCut,
  setFaceMatch,
  setFaceGrade,
  setFaceSpecies,
  setFaceGrain,
  setBackCut,
  setBackMatch,
  setBackGrade,
  togglePDF,
  resetOptions,
} = baseSlice.actions;

export default baseSlice.reducer;
