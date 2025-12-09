import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const formatPhone = (value: string) => {
    const onlyNums = value.replace(/[^0-9]/g, "");

    if (onlyNums.length < 4) return onlyNums;
    if (onlyNums.length < 8)
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;

    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(
      7,
      11,
    )}`;
  };

  const handleSubmit = async () => {
    if (loading) return;
    if (!name.trim() || !phoneNumber.trim()) return;

    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/t-age/users/${userId}/phone`,
        {
          name,
          phoneNumber,
        },
      );

      navigate("/home");
    } catch (err) {
      console.error("전화번호 등록 실패:", err);
    } finally {
      setLoading(false);
    }
  };

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
          className="mt-4 w-full rounded-xl bg-[#F6E7B4] p-4 text-[18px] font-semibold text-[#4A3828] disabled:opacity-60"
        >
          {loading ? "등록 중..." : "등록하고 시작하기"}
        </button>
      </div>
    </div>
  );
}
