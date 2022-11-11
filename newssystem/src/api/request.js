import axios from "axios";


const server = axios.create({
    baseURL:"http://localhost:5000",
    timeout:3000
})
server.interceptors.request.use(
    (config) => { 
        console.log("请求拦截成功");
        return config
     },
    (err) => { console.log(err.message); }
)

server.interceptors.response.use(
    (res) => { 
        return res.data
     },
    (err) => {
        console.log(err.message);
        return new Promise(() => {})}
)

export default server