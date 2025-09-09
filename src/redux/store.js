import { configureStore } from "@reduxjs/toolkit";
import laligaTeamsReducer from "./laligaTeams/laligaTeamsSlice"




const store = configureStore({
  reducer:{
    laligaTeams : laligaTeamsReducer,
  }
})

export default store