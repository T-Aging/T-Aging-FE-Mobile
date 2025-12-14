import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/apis/axiosInstance"; // axios 인스턴스 사용

export default function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  const formatPhone = (value: string) => {
    const onlyNums = value.replace(/[^0-9]/g, "");

    if (onlyNums.length < 4) return onlyNums;
    if (onlyNums.length < 8) {
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    }

    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(
      7,
      11,
    )}`;
  };

  // 페이지 진입 시: 필수 정보(전화번호) 등록 여부 확인
  useEffect(() => {
    const checkUserInfo = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("accessToken");

      // 로그인 정보 자체가 없으면
      // → 체크 종료, 입력 화면 보여줌
      if (!userId || !token) {
        setChecking(false);
        return;
      }

      try {
        const res = await api.get(`/t-age/users/${userId}`);
        const phone = res.data?.data?.phone;

        // 이미 전화번호 등록된 유저면 홈으로
        if (phone) {
          navigate("/home", { replace: true });
          return;
        }
      } catch (err) {
        console.error("사용자 정보 조회 실패:", err);
      } finally {
        // 어떤 경우든 반드시 false
        setChecking(false);
      }
    };

    checkUserInfo();
  }, [navigate]);

  const handleSubmit = async () => {
    if (loading) return;
    if (!name.trim() || !phoneNumber.trim()) return;

    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const rawPhone = phoneNumber.replace(/-/g, "");

    try {
      setLoading(true);

      await api.post(`/t-age/users/${userId}/phone`, {
        name,
        phone: rawPhone,
      });

      navigate("/home");
    } catch (err) {
      console.error("전화번호 등록 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  // 사용자 상태 확인 중에는 렌더링하지 않음
  if (checking) return null;

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#F5EEDC] px-6 pt-20">
      <h1 className="mb-10 text-[24px] font-semibold text-[#6B3F21]">
        필수 정보 등록
      </h1>

      <div className="flex w-full flex-col gap-6">
        <input
          type="text"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-[#D5C7A1] bg-white p-4 text-[16px]"
        />

        <input
          type="text"
          placeholder="전화번호를 입력하세요 (010-0000-0000)"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(formatPhone(e.target.value))}
          maxLength={13}
          className="w-full rounded-xl border border-[#D5C7A1] bg-white p-4 text-[16px]"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 w-full rounded-xl bg-[#F6E7B4] p-4 text-[18px] font-semibold text-[#4A3828] disabled:opacity-60"
        >
          {loading ? "등록 중..." : "등록하고 시작하기"}
        </button>
      </div>
    </div>
  );
}
