import axios from "axios";
//Localhost url :'
//developement url:
export let BASE_URL = "http://localhost:7000/api/v1";
//aws url
// export let BASE_URL = "http://65.2.146.106:7000/api/v1";
//Production URL
// export let BASE_URL = "https://blog-backend-xq2z.onrender.com/api/v1";
let token = JSON.parse(localStorage.getItem("accessToken"));
let refreshToken= JSON.parse(localStorage.getItem('refreshToken'))
let userInfo = JSON.parse(localStorage.getItem('userInfo'))
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
  async (err) => {
    let originalConfig = err.config;
   
    try {
      if(err.response.status === 401 && !originalConfig._retry ){
        console.log("---------------->error", originalConfig);
       
        originalConfig._retry = true
        if(!refreshToken){
          localStorage.clear()
          window.location.href = '/login'
        }
        let response = await privateAxios.post('/user/refreshToken',{
          userId: userInfo._id,
          refreshToken: refreshToken
        });
        let {accessToken} = response.data
        localStorage.setItem('accessToken',JSON.stringify(accessToken))
        originalConfig.headers.Authorization = `Bearer ${accessToken}`;
        return privateAxios(originalConfig)
      }
      
    } catch (_error) {
      // return Promise.reject(_error)
    }
   
     
    return Promise.reject(err);
  }
);
//request interceptor
privateAxios.interceptors.request.use(
  (config) => {
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
