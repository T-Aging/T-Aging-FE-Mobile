import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { kakaoLogin } from "@/apis/auth"; // 새로 만든 API 함수

const KakaoRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // redirect URL에서 code 추출
    const code = new URL(window.location.href).searchParams.get("code");
    if (!code) return;

    const sendCode = async () => {
      try {
        const res = await kakaoLogin(code);
        const data = res?.data;
        localStorage.setItem("userId", data.userId);

        // 신규 사용자 여부 확인
        const isNewUser = data?.isNewUser || !data?.email;
        if (isNewUser) {
          return navigate("/signup");
        }

        // 기존 사용자 → 토큰 저장 후 홈 이동
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("userId", data.userId);

        navigate("/home");
      } catch (err) {
        console.error("카카오 로그인 실패:", err);
      }
    };

    sendCode();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center text-xl">
      로그인 처리 중...
    </div>
  );
};

export default KakaoRedirect;
