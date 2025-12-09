import { useMutation } from "@tanstack/react-query";
import { kakaoLogin } from "@/apis/auth";

export const useKakaoLogin = () => {
  return useMutation({
    mutationFn: (token: string) => kakaoLogin(token),
    onError: (error) => {
      console.error("카카오 로그인 실패", error);
    },
  });
};
