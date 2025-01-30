import { createSlice } from '@reduxjs/toolkit'

export const saveSlice = createSlice({
  name: 'save',
  initialState: {
    value: [],
  },
  reducers: {
    addToSave: (state, action) => {
      const product = action.payload;
      const foundItem = state.value.find((item) => item._id === product._id);
      if (!foundItem) {
        state.value.push(product); // Add product only if not already saved
      }
    },
    removeFromSave: (state, action) => {
      state.value = state.value.filter(item => item._id !== action.payload);
      //state.value has the products already saved, filter out the id and remove from the saved list and 
      // gives a new array without modifying the other saved items
    }
  }
})

export const { addToSave, removeFromSave } = saveSlice.actions;
export default saveSlice.reducer;
