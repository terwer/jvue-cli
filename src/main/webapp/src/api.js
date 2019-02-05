import axios from "axios";

const http = axios.create({
  baseURL: "http://127.0.0.1:8081/api/",
  timeout: 10000
  // headers: {'X-Custom-Header': 'foo'}
});

// Make a request for a user with a given ID
function getPostList() {
  return http.post("blog/post/list");
}

const api = {
  getPostList: getPostList
};

export default api;
