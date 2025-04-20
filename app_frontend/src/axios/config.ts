import axios from 'axios'

const RmaApi = axios.create({
    baseURL: "http://localhost:4000",
    headers:{
        "Content-Type": "application/json",
    }
});

RmaApi.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token")
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})

export default RmaApi; 