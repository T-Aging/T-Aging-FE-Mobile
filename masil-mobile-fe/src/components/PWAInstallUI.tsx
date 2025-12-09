import { usePWAInstall } from "@/hooks/usePWAInstall";

const PWAInstallUI = () => {
  const { showIOSBanner, showAndroidButton, installPWA } = usePWAInstall();

  return (
    <>
      {/* --------------------------------- */}
      {/* iOS Safari 설치 안내 배너        */}
      {/* --------------------------------- */}
      {showIOSBanner && (
        <div className="fixed bottom-6 left-1/2 w-[90vw] -translate-x-1/2 rounded-2xl border border-[#EADBA5] bg-[#F6E7B4] px-5 py-4 text-[#4A3828] shadow-lg">
          <p className="text-center text-[3.7vw] leading-snug font-medium">
            이 앱을 설치하려면
            <br />
            <b>Safari → 공유버튼 → 홈 화면에 추가</b>를 부탁드려요!
          </p>
        </div>
      )}

      {/* ------------------------------- */}
      {/* Android Chrome PWA 설치 버튼     */}
      {/* ------------------------------- */}
      {showAndroidButton && (
        <button
          onClick={installPWA}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-2xl bg-[#6B3F21] px-8 py-4 text-[4vw] font-semibold text-white shadow-xl transition-all active:scale-95"
        >
          마실이 앱 설치하기
        </button>
      )}
    </>
  );
};

export default PWAInstallUI;
