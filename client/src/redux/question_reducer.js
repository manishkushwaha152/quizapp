import { createSlice } from "@reduxjs/toolkit";

/** create reducer */
export const questionReducer = createSlice({
    name: 'questions',
    initialState: {
        queue: [],
        answers: [],
        trace: 0
    },
    reducers: {
        startExamAction: (state, action) => {
            const { question, answers } = action.payload;
            state.queue = question;
            state.answers = answers;
            state.trace = 0;  //  Reset trace when starting a new quiz
        },
        moveNextAction: (state) => {
            if (state.trace < state.queue.length - 1) {  //  Prevent exceeding length
                state.trace += 1;
            }
        },
        movePrevAction: (state) => {
            if (state.trace > 0) {  //  Prevent going below 0
                state.trace -= 1;
            }
        },
        resetAllAction: (state) => {
            state.queue = [];
            state.answers = [];
            state.trace = 0;
        }
    }
});

export const { startExamAction, moveNextAction, movePrevAction, resetAllAction } = questionReducer.actions;

export default questionReducer.reducer;
