import axios from "axios";

export default axios.create({
  baseURL: 'https://react-quiz-f17e6-default-rtdb.firebaseio.com/',
})