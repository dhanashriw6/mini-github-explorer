import axios from "axios";

axios.interceptors.request.use((request) => {
  const data = localStorage.getItem("userData");

  try {
    if (data) {
      const userData = JSON.parse(data);
      request.headers["Authorization"] = `Bearer ${
        userData?.accessToken || "dummy"
      }`;
    }
  } catch (error) {
    console.warn("Error parsing userData:", error);
  }

  return request;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn("Axios error -> ", error);

    const status = error?.response?.status;

    if (status === 401) {
      localStorage.removeItem("userData");
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  patch: axios.patch,
  put: axios.put,
};
