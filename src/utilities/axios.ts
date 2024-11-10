import axios from "axios";

axios.defaults.withCredentials = true;

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL as string;

axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
export default axios;