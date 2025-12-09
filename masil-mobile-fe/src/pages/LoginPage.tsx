import kakaoIcon from "@/assets/images/kakao_icon.png";

const LoginPage = () => {
  const K_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const K_REDIRECT_URI = import.meta.env.VITE_KAKAO_OAUTH_REDIRECT_URI;

  console.log("🔍 VITE_KAKAO_REST_API_KEY =", K_REST_API_KEY);
  console.log("🔍 VITE_KAKAO_OAUTH_REDIRECT_URI =", K_REDIRECT_URI);
  // 카카오 로그인 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code&prompt=login`;

  const handleKakaoLogin = () => {
    window.location.href = kakaoURL; // 카카오 로그인 페이지로 이동
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[#F5EEDC] px-[6%] pt-16">
      {/* 타이틀 */}
      <h1 className="mb-20 text-[9vw] font-semibold text-[#6B3F21]">
        오늘도 마실
      </h1>

      {/* 아이콘 자체가 버튼 */}
      <button
        onClick={handleKakaoLogin}
        className="h-[70vw] w-[70vw] overflow-hidden rounded-2xl bg-[#F6E7B4] shadow-md transition active:scale-95"
      >
        <img
          src={kakaoIcon}
          alt="카카오 아이콘"
          className="h-full w-full object-contain"
        />
      </button>

      {/* 보조 텍스트 */}
      <span className="mt-6 text-[6vw] font-semibold text-[#4A3828]">
        카카오로 시작하기
      </span>
    </div>
  );
};

export default LoginPage;
