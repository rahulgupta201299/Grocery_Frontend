import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8002",
});

export default instance;

//https://groceryback-end.herokuapp.com
//http://localhost:8000
