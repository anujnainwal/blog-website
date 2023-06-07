import { useState, useEffect } from "react";
import axios from "axios";

const usePrivateAxios = () => {
  const [privateAxios, setPrivateAxios] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPrivateAxios = async () => {
      // Localhost URL
      let baseUrl = "http://localhost:7000/api/v1";
      // AWS URL
      // let baseUrl = "http://65.2.146.106:7000/api/v1";
      // Production URL
      // let baseUrl = "https://blog-backend-xq2z.onrender.com/api/v1";

      const token = JSON.parse(localStorage.getItem("accessToken"));
      const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const instance = axios.create({
        baseURL: baseUrl,
        timeout: 10000,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, application/formData",
        },
        withCredentials: true,
      });

      instance.interceptors.response.use(
        (res) => res,
        async (err) => {
          let originalConfig = err.config;

          try {
            if (err.response.status === 401 && !originalConfig._retry) {
              console.log("---------------->error", originalConfig);

              originalConfig._retry = true;
              if (!refreshToken) {
                localStorage.clear();
                window.location.href = "/login";
              }

              const response = await instance.post("/user/refreshToken", {
                userId: userInfo._id,
                refreshToken: refreshToken,
              });

              const { accessToken } = response.data;
              localStorage.setItem("accessToken", JSON.stringify(accessToken));
              originalConfig.headers.Authorization = `Bearer ${accessToken}`;
              return instance(originalConfig);
            }
          } catch (_error) {
            return Promise.reject(_error);
          }

          return Promise.reject(err);
        }
      );

      instance.interceptors.request.use(
        (config) => {
          if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
          }
          return config;
        },
        (err) => {
          return Promise.reject(err);
        }
      );

      if (isMounted) {
        setPrivateAxios(instance);
      }
    };

    fetchPrivateAxios();

    return () => {
      isMounted = false;
    };
  }, []);

  return privateAxios;
};

export default usePrivateAxios;
