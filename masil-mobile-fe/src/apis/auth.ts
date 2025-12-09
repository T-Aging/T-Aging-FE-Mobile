import axios from "axios";

export const kakaoLogin = async (authorizationCode: string) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/t-age/login`,
    { authorizationCode }
  );
  return res.data;
};
