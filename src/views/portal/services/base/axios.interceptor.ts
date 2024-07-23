import axios from 'axios';
// Tạo một instance của axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL, // Đặt baseURL nếu cần
});
console.warn(import.meta.env.VITE_APP_BASE_URL);
// Thêm một request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // Lấy token từ localStorage hoặc từ một nơi lưu trữ khác
    const token = localStorage.getItem('token');
    // Nếu token tồn tại, thêm nó vào header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Thêm header 'realm'
    config.headers.realm = import.meta.env.VITE_APP_REALM;
    return config;
  },
  error => {
    // Xử lý lỗi trước khi request được gửi đi
    return Promise.reject(error);
  }
);

export default axiosInstance;
