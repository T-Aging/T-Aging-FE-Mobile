import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { kakaoLogin } from "@/apis/auth"; // 새로 만든 API 함수

const KakaoRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (!code) return;

    const sendCode = async () => {
      try {
        const res = await kakaoLogin(code);
        const data = res.data;

        const userId = data.userId;
        localStorage.setItem("userId", userId);

        // 토큰 저장
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        // 프론트에서 신규 여부 판단 (프로필 등록 완료 여부)
        const profileDone =
          localStorage.getItem(`profile:${userId}`) === "done";

        if (!profileDone) {
          return navigate("/signup");
        }

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
