import axios from 'axios';

const instance=axios.create({
    baseURL: "https://groceryback-end.herokuapp.com"
})

export default instance

//https://groceryback-end.herokuapp.com
//http://localhost:8000