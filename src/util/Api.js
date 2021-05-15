import axios from "axios";

const Api = axios.create({
    baseURL: 'http://ec2-3-35-212-67.ap-northeast-2.compute.amazonaws.com/api',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
});

Api.interceptors.request.use(
    (config) => {
        config.headers = {...config.headers,'X-AUTH-TOKEN': window.localStorage.getItem("userToken")};
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Api.interceptors.response.use(
    (response)=>{
        return response;
    },

    (error)=>{
        return Promise.reject(error);
    }
);

export default Api;