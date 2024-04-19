import { configureStore } from "@reduxjs/toolkit";
import userSlicder from "./slicer/userSlicer"

 const store = configureStore({
    reducer: {
      user: userSlicder,
    },
  });

  export default store;