import axios from 'axios';

export default axios.create({
  baseURL: `https://react-quize-e85a5.firebaseio.com`
});
