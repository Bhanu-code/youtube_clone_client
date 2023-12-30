import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.userId = action.payload.id;
            state.isFetching = false;
            state.currentUser = action.payload.username;
            document.cookie = `jwt=${action.payload.accessToken}`
            document.cookie = `userId=${action.payload.id}`
            alert("Successfully logged in");

        },
        loginFail: (state) => {
            state.isFetching = false;
            state.error = true;
            alert('login failed for some reason');
        },
        logOut: (state) => {
            state.isFetching = false;
            state.currentUser = null;
            state.error = false;
            document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            alert("Successfully Logged out");
            window.location.href='/'
        },
    },
});

export const { loginStart, loginSuccess, loginFail, logOut } = userSlice.actions
export default userSlice.reducer;