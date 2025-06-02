import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getServerData } from "../helper/helper";

/** Redux actions */
import * as Action from '../redux/question_reducer';

/** Custom hook to fetch API data and set values in the store */
export const useFetchQuestion = () => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({
        isLoading: true,
        apiData: [],
        serverError: null
    });

    useEffect(() => {
        console.log("🚀 Fetching from:", `${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`);

        const fetchData = async () => {
            try {
                const data = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`);
                console.log("API Response:", data);

                if (!Array.isArray(data) || data.length === 0) throw new Error("API response is empty or not an array.");
                
                const { questions, answers } = data[0]; // Extract first object
                
                if (!Array.isArray(questions)) throw new Error("Missing 'questions' array.");

                /** Update Redux Store */
                dispatch(Action.startExamAction({ question: questions, answers }));

                /** Update local state */
                setGetData({ isLoading: false, apiData: questions, serverError: null });

            } catch (error) {
                console.error("Fetching Questions Error:", error);
                setGetData({ isLoading: false, apiData: [], serverError: error.message });
            }
        };

        fetchData();
    }, [dispatch]);

    return [getData, setGetData];
};

/** Move to the next question */
export const MoveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction()); /** Increase trace by 1 */
    } catch (error) {
        console.error(" Error moving to the next question:", error);
    }
};

/** Move to the previous question */
export const MovePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction()); /** Decrease trace by 1 */
    } catch (error) {
        console.error(" Error moving to the previous question:", error);
    }
};
