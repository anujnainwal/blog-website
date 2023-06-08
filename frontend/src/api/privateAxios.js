import axios from "axios";
//Localhost url :'
//developement url:
export let BASE_URL = "http://localhost:7000/api/v1";
//aws url
// export let BASE_URL = "http://65.2.146.106:7000/api/v1";
//Production URL
// export let BASE_URL = "https://blog-backend-xq2z.onrender.com/api/v1";
let refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
let userInfo = JSON.parse(localStorage.getItem("userInfo"));
export const privateAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, application/formData",
  },
});

//response interceptor
privateAxios.interceptors.request.use(
  (config) => {
    let token = JSON.parse(localStorage.getItem("accessToken"));

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      // config.headers["x-access-token"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
privateAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    let originalConfig = err.config;

    try {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        if (!refreshToken) {
          localStorage.clear();
          window.location.href = "/login";
        }
        let response = await privateAxios.post("/user/refreshToken", {
          userId: userInfo._id,
          refreshToken: refreshToken,
        });
        let { accessToken } = response.data;

        localStorage.setItem("accessToken", JSON.stringify(accessToken));
        privateAxios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        return privateAxios(originalConfig);
      }
    } catch (_error) {
      let {
        status,
        data: { error },
      } = _error?.response;
      if (
        (status === 400 &&
          error === "Token was expired. Please login again.") ||
        error === "Token not found"
      ) {
        localStorage.clear();
        window.location.href = "/login";
      }

      return Promise.reject(_error);
    }

    console.log("testing:::::::", err);
    return Promise.reject(err);
  }
);
//request interceptor
