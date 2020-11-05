import axios from "axios";

const instance = axios.create({
  baseURL: "https://agh-burger-app.firebaseio.com/",
});

export default instance;
