import { useNavigate } from "react-router-dom";
import qrIcon from "@/assets/images/qr.png";
import historyIcon from "@/assets/images/order-history.png";
import profileIcon from "@/assets/images/myprofile.png";

const MainMenu = () => {
  const navigate = useNavigate();

  const goToQr = () => navigate("/qr");
  const goToHistory = () => navigate("/orders");
  const goToProfile = () => navigate("/profile");

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[#F5EEDC] px-[6%] pt-12 pb-10">
      {/* 타이틀 */}
      <h1 className="mb-10 text-[26px] font-semibold text-[#4A3828]">
        메인 화면
      </h1>

      {/* 버튼 영역 */}
      <div className="flex w-full flex-col items-center gap-6">
        {/* QR 코드 버튼 */}
        <button
          onClick={goToQr}
          className="flex w-[80%] flex-col items-center justify-center gap-3 rounded-2xl bg-[#F6E7B4] py-6 shadow-md"
        >
          <img src={qrIcon} alt="QR Icon" className="h-12 w-12" />
          <span className="text-[16px] font-medium text-[#4A3828]">
            키오스크용 QR 코드 보기
          </span>
        </button>

        {/* 주문내역 버튼 */}
        <button
          onClick={goToHistory}
          className="flex w-[80%] flex-col items-center justify-center gap-3 rounded-2xl bg-[#F6E7B4] py-6 shadow-md"
        >
          <img src={historyIcon} alt="History Icon" className="h-12 w-12" />
          <span className="text-[16px] font-medium text-[#4A3828]">
            주문내역 확인
          </span>
        </button>

        {/* 나의 정보 버튼 */}
        <button
          onClick={goToProfile}
          className="flex w-[80%] flex-col items-center justify-center gap-3 rounded-2xl bg-[#F6E7B4] py-6 shadow-md"
        >
          <img src={profileIcon} alt="Profile Icon" className="h-12 w-12" />
          <span className="text-[16px] font-medium text-[#4A3828]">
            나의 개인정보
          </span>
        </button>
      </div>

      {/* 앱 사용방법 버튼 */}
      <button className="mt-5 flex w-[80%] items-center justify-center gap-2 rounded-xl bg-[#6B3F21] py-4 text-[16px] font-medium text-white shadow-md">
        앱 사용방법
      </button>
    </div>
  );
};

export default MainMenu;
