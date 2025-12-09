import kakaoIcon from "@/assets/images/kakao_icon.png";
import masilCharacter from "@/assets/images/masil.png"; // 새로운 캐릭터 이미지

const LoginPage = () => {
  const K_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const K_REDIRECT_URI = import.meta.env.VITE_KAKAO_OAUTH_REDIRECT_URI;

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code&prompt=login`;

  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[#F5EEDC] px-[6%] pt-40">
      {/* 타이틀 */}
      <h1 className="mb-12 text-[10vw] font-bold text-[#6B3F21]">
        오늘도 마실
      </h1>

      {/* 마실 캐릭터 이미지 */}
      <img
        src={masilCharacter}
        alt="마실 캐릭터"
        className="mb-16 h-[50vw] w-[50vw] object-contain"
      />

      {/* 카카오 로그인 버튼 */}
      <button
        onClick={handleKakaoLogin}
        className="h-[20vw] w-[60vw] overflow-hidden rounded-2xl bg-[#FEE500] shadow-md transition active:scale-95"
      >
        <img
          src={kakaoIcon}
          alt="카카오 아이콘"
          className="h-full w-full object-contain"
        />
      </button>
    </div>
  );
};

export default LoginPage;
