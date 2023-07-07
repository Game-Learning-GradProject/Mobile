import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const checkUser = createAsyncThunk(
  "auth/checkUser",
  async (data, { rejectedWithValue }) => {
    const sendData = JSON.stringify(data);
    try {
      const res = await fetch(
        "https://gamebasedlearning-ot4m.onrender.com/student/StudentLogIn",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: sendData,
        }
      );
      let data = await res.json();
      return data;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    playerName: "friend",
    parentID: "",
    studentID: "",
    playerPic: "../../assets/smile.png",
  },
  reducers: {
    setPlayerName: (state, action) => {
      state.playerName = action.payload;
    },
    setStudentID: (state, action) => {
      state.studentID = action.payload;
    },
    setParentID: (state, action) => {
      state.parentID = action.payload;
    },
    setPlayerPic: (state, action) => {
      state.playerPic = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.loading = false;
        state.parentID = action.payload.student.ParentID;
        state.studentID = action.payload.student.studentID;
        state.playerPic = action.payload.student.studentPic;

        console.log(action.payload);

        console.log("success fetch");
      })
      .addCase(checkUser.rejected, (state, action) => {
        state.loading = action.payload;
        console.log("failed fetch");
      });
  },
});

export const { setPlayerName, setStudentID, setParentID, setPlayerPic } =
  authSlice.actions;
export default authSlice.reducer;
