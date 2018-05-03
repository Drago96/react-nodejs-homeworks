import axios from "axios";

const instance = axios.create({
    baseURL: "https://simple-c520e.firebaseio.com/"
});

export default instance;
