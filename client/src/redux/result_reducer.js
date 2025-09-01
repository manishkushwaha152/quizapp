import { createSlice } from "@reduxjs/toolkit";

export const resultReducer = createSlice({
    name: 'result',
    initialState: {
        userId: null,
        result: []
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        pushResultAction: (state, action) => {
            if (action.payload !== undefined) {  //  Ensure valid input
                state.result.push(action.payload);
            }
        },
        updateResultAction: (state, action) => {
            const { trace, checked } = action.payload;
            if (trace < state.result.length) {  //  Prevent out-of-bounds access
                state.result[trace] = checked;
            }
        },
        resetResultAction: (state) => {
            state.userId = null;
            state.result = [];
        }
    }
});

export const { setUserId, pushResultAction, resetResultAction, updateResultAction } = resultReducer.actions;

export default resultReducer.reducer;
