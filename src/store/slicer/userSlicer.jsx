
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: false,
  reducers: {
    self: (state, action) => {
        console.log(action.payload)
         return action.payload;
     },
     all:(state, action) => {
        console.log(action.payload)
         return action.payload;
     },other:(state, action) => {
        console.log(action.payload)
         return action.payload;
     }
  },
});
console.log(userSlice.actions)
export const { self,all,other } = userSlice.actions;
export default userSlice.reducer;
