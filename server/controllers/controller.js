import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
// import questions from '../database/data.js'; // Only import questions, not answers
import questionsData, { answers } from '../database/data.js'; // Import answers

/** Get all questions */
export async function getQuestions(req, res) {
    try {
        const q = await Questions.find();
        if (!q.length) {
            return res.status(404).json({ message: "No questions found" });
        }
        res.status(200).json(q);
    } catch (error) {
        res.status(500).json({ message: "Error fetching questions", error: error.message });
    }
}


// /** Insert all questions */
// export async function insertQuestions(req, res) {
//     try {
//         await Questions.insertMany(questions);  //  Fixed
//         res.status(201).json({ msg: "Data Saved Successfully!" });
//     } catch (error) {
//         res.status(500).json({ message: "Error inserting questions", error: error.message });
//     }
// }
/** Insert all questions */
export async function insertQuestions(req, res) {
    try {
        const { questions, answers } = req.body; // ✅ Get data from request body

        if (!questions || !answers || questions.length === 0 || answers.length === 0) {
            return res.status(400).json({ message: "Questions and answers are required!" });
        }

        const newEntry = new Questions({ questions, answers }); // ✅ Store both questions & answers

        await newEntry.save();
        res.status(201).json({ msg: "Data Saved Successfully!" });

    } catch (error) {
        console.error("Error inserting questions:", error);
        res.status(500).json({ message: "Error inserting questions", error: error.message });
    }
}

/** Delete all Questions */
export async function dropQuestions(req, res) {
    try {
        await Questions.deleteMany();
        res.status(200).json({ msg: "Questions Deleted Successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting questions", error: error.message });
    }
}

/** Get all results */
export async function getResult(req, res) {
    try {
        const r = await Results.find();
        if (!r.length) {
            return res.status(404).json({ message: "No results found" });
        }
        res.status(200).json(r);
    } catch (error) {
        res.status(500).json({ message: "Error fetching results", error: error.message });
    }
}

/** Store user result */
export async function storeResult(req, res) {
    try {
        const { username, result, attempts, points, achieved } = req.body;

        if (!username || !result) {
            return res.status(400).json({ message: "Username and result are required!" });
        }

        await Results.create({ username, result, attempts, points, achieved });
        res.status(201).json({ msg: "Result Saved Successfully!" });

    } catch (error) {
        res.status(500).json({ message: "Error saving result", error: error.message });
    }
}

/** Delete all results */
export async function dropResult(req, res) {
    try {
        await Results.deleteMany();
        res.status(200).json({ msg: "Results Deleted Successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting results", error: error.message });
    }
}
