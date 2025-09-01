import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from 'axios';

/** Calculate the number of attempts */
export function attempts_Number(result) {
    return result.filter(r => r !== undefined).length;
}

/** Calculate total earned points */
export function earnPoints_Number(result, answers, point) {
    return result.reduce((total, element, i) => {
        return answers[i] === element ? total + point : total;
    }, 0);
}

/** Check if user has passed (50% threshold) */
export function flagResult(totalPoints, earnPoints) {
    return earnPoints >= (totalPoints * 50 / 100);
}

/** Check user authentication */

export function CheckUserExist({ children }) {
    const auth = useSelector(state => state.result.userId);
    const user = JSON.parse(localStorage.getItem('user'));
    
    // Check if session is valid (less than 24 hours old)
    const isSessionValid = user?.lastLogin && 
        (new Date() - new Date(user.lastLogin)) < 24 * 60 * 60 * 1000;
    
    return auth || isSessionValid ? children : <Navigate to='/' replace={true} />;
}
/** Fetch data from server */
export async function getServerData(url, callback) {
    try {
        const response = await axios.get(url);
        const data = response.data;
        return callback ? callback(data) : data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

/** Post data to server */
export async function postServerData(url, result, callback) {
    try {
        const response = await axios.post(url, result);
        const data = response.data;
        return callback ? callback(data) : data;
    } catch (error) {
        console.error("Error posting data:", error);
        return null;
    }
}
