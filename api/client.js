import axios from "axios";


export default axios.create(
  {
    // baseURL: "https://finalissima.onrender.com/api",
  //  baseURL:"https://dev-8v6l.onrender.com/api"
  // baseURL:"https://personal-3tgc.onrender.com/api"

  baseURL:"https://localhost:5000/api"
    // adapter: cache.adapter,
  }
);
