import { configureStore } from "@reduxjs/toolkit";
import  userSlice  from "./UserRedux_Y";
const store = configureStore({
    reducer : {
        user : userSlice
    }
})

export default store