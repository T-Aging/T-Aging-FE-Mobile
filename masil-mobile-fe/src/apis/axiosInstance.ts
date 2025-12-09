import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
   headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420", 
  },
});

/* 요청 인터셉터: AccessToken 자동 추가 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/* 응답 인터셉터: 401 발생 시 RefreshToken으로 재발급 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    // 401: 토큰 만료 처리
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(error);
      }

      try {
        const refreshRes = await axios.post(
          `${import.meta.env.VITE_API_URL}/t-age/refresh`,
          { refreshToken },
        );

        const newAccessToken = refreshRes.data?.data?.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        original.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(original);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
