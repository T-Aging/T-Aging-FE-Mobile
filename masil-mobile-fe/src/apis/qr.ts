import api from "./axiosInstance";

export const getUserQR = async (userId: number) => {
  const res = await api.get(`/t-age/users/${userId}/qr`);
  return res.data?.data; 
};
