import axios from "axios";
//Localhost url :'
//developement url:
export let BASE_URL = "http://localhost:7000/api/v1";
//aws url
// export let BASE_URL = "http://65.2.146.106:7000/api/v1";
//Production URL
// export let BASE_URL = "https://blog-backend-xq2z.onrender.com/api/v1";
export const privateAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, application/formData",
  },
  withCredentials: true,
});

//response interceptor
privateAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//request interceptor
privateAxios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("accessToken");
    if (token) {
      // config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["x-access-token"] = `Bearer ${token}`;
    }
    return config;
  },
  async (err) => {
    let originalConfig = err.config;
    if (originalConfig.url !== "/auth/signin" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          let refreshToken = localStorage.getItem("refreshToken");
          const rs = await privateAxios.post("/auth/refreshtoken", {
            refreshToken: refreshToken,
          });

          const { accessToken } = rs.data;
          privateAxios.defaults.headers["Authorization"] =
            "Bearer " + accessToken;
          return privateAxios(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);
