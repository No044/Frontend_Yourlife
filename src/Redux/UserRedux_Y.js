import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    role : null,
    permission : null

}
export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        login : (state ,action) => {
            state.role = action.payload.role
            state.permission = action.payload.permission
        },
        logout : (state) => {
            state.role = null
            state.permission = null

        }
    }

})
export const {login,logout} = userSlice.actions
export const selectRole = (state) => state.user.role
export const selectPermission = (state) => state.user.permission
export default userSlice.reducer