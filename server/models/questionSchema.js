// import mongoose from "mongoose";
const { Schema } = mongoose;

// /** question model */
// const questionModel = new Schema({
//     questions: { type : Array, default: []}, // create question with [] default value
//     answers : { type : Array, default: []},
//     createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model('Question', questionModel); 

import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    questions: {
        type: Array,
        required: true
    },
    answers: {
        type: Array,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Question', QuestionSchema);
