import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserQR } from "@/apis/qr";

const MYQR = () => {
  const navigate = useNavigate();
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const userId = Number(localStorage.getItem("userId"));

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchQR = async () => {
      try {
        let base64 = await getUserQR(userId);

        // base64가 문자열이 아닌 경우
        if (!base64 || typeof base64 !== "string") {
          setError(true);
          return;
        }

        // 공백, 줄바꿈 제거
        base64 = base64.replace(/\s/g, "");

        // 서버가 이미 "data:image/png;base64," 형태로 보내는 경우 방지
        const hasPrefix = base64.startsWith("data:image");

        const imgSrc = hasPrefix ? base64 : `data:image/png;base64,${base64}`;

        setQrImage(imgSrc);
      } catch (err) {
        console.error("QR 조회 실패:", err);
        setError(true);
      }
    };

    fetchQR();
  }, [userId]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[#F5EEDC]">
      {/* 상단 뒤로가기 헤더 */}
      <div className="flex h-14 w-full items-center gap-2 bg-[#F6E7B4] px-4">
        <button onClick={handleBack} className="text-[22px]">
          ←
        </button>
        <span className="text-[16px] text-[#4A3828]">뒤로가기</span>
      </div>

      {/* 제목 */}
      <div className="mt-10 mb-6 w-full text-center">
        <h2 className="text-[20px] font-semibold text-[#4A3828]">
          회원님의 QR 코드
        </h2>
      </div>

      {/* QR 코드 */}
      <div className="rounded-2xl bg-white p-4 shadow-lg">
        {error ? (
          <div className="flex h-[220px] w-[220px] items-center justify-center text-red-500">
            QR 불러오기 실패
          </div>
        ) : qrImage ? (
          <img
            src={qrImage}
            alt="QR Code"
            className="h-[220px] w-[220px] rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-[220px] w-[220px] items-center justify-center">
            로딩 중...
          </div>
        )}
      </div>

      {/* 안내 문구 */}
      <p className="s mt-6 px-6 text-center text-[20px] leading-relaxed text-[#4A3828]">
        키오스크에 이 QR 코드를
        <br />
        인식시켜 간편하게 주문하세요
      </p>
    </div>
  );
};

export default MYQR;
