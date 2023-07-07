import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const fetchData = createAsyncThunk(
  "global/fetchData",
  async (_, thunkAPI) => {
    const { rejectedWithValue, getState } = thunkAPI;
    const parentID = getState().auth.parentID;
    const studentID = getState().auth.studentID;
    // const sentData = JSON.stringify({
    //   unit: "1",
    //   lesson: "1",
    //   stadge: "1",
    // });
    try {
      const res = await fetch(
        `https://gamebasedlearning-ot4m.onrender.com/Task/TakeTask/${studentID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: sentData,
        }
      );
      const data = await res.json();
      // console.log("tasks:", data);
      console.log("data:", data);

      return data;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);
export const sendAttempts = createAsyncThunk(
  "global/sendAttempts",
  async (feedback, thunkAPI) => {
    const { rejectedWithValue, getState } = thunkAPI;
    const id = getState().auth.studentID;
    const taskId = feedback.taskId;
    const gameId = feedback.gameId;
    console.log("feedback:", feedback);
    // const game_id = 1;
    const sentData = JSON.stringify(
      feedback.sentData
      //   {
      //   child_id: id,
      //   game_id: feedback.gameID,
      //   questions: feedback.questions,
      // }
    );
    try {
      const res = await fetch(
        `https://gamebasedlearning-ot4m.onrender.com/feedback/${id}/${taskId}/${gameId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: sentData,
        }
      );
      const data = await res.json();
      console.log("res:", data);
      return data;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);
const initialState = {
  word_Pic: [],
  url: "https://gamebasedlearning-ot4m.onrender.com/",
  avatar: "https://assets2.lottiefiles.com/packages/lf20_lc46h4dr.json",
  error: null,
  loading: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    setWordPic: (state, action) => {
      state.word_Pic = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        console.log("pending");
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        !action.payload.status
          ? (state.word_Pic = action.payload.sort(
              (a, b) => a.taskNumber - b.taskNumber
            ))
          : (state.word_Pic = []);
        console.log("fetch success");
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = action.payload;
      })
      .addCase(sendAttempts.fulfilled, (state, action) => {
        console.log(action.payload);
      });
  },
});

export const { setAvatar, setWordPic } = globalSlice.actions;
export default globalSlice.reducer;
