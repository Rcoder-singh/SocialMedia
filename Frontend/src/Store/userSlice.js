import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let userDetails = JSON.parse(localStorage.getItem("SocialMedia"));
const initialState = {
  login: userDetails ? userDetails.login : false,
  token: userDetails ? userDetails.token : "",
  user: userDetails ? userDetails.user : "",
};

export const fetchUserById = createAsyncThunk(
  "user/fetchByIdStatus",
  async (token) => {
    const response = await axios.get(
      "http://localhost:8080/user/get_user_info",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data.user;
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setState: (state, action) => {
      console.log("action in userSlice", action);
      state.login = true;
      state.token = action.payload;
      localStorage.setItem(
        "SocialMedia",
        JSON.stringify({ login: true, token: action.payload, user: "" })
      );
    },
    logout: (state) => {
      localStorage.removeItem("SocialMedia");
      state.login = false;
      state.user = "";
      state.token = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      //* Add user to the state array
      console.log("action.payload", action.payload);
      state.user = action.payload;
    });
  },
});

export const { setState, logout } = userSlice.actions;

export default userSlice.reducer;
