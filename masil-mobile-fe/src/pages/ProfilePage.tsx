import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import profileImg from "@/assets/images/profile.png";
import { getUserProfile, type UserProfile } from "@/apis/profile";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const handleBack = () => navigate(-1);

  const userId = Number(localStorage.getItem("userId"));
  const token = localStorage.getItem("accessToken") ?? "";

  // 가입일 ~ 오늘 몇 일차인지 계산
  const getDaysWithMasil = (iso: string) => {
    const created = new Date(iso);
    const today = new Date();
    const diffTime = today.getTime() - created.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // 첫날도 1일차로 표시
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await getUserProfile(userId, token);
        if (res.success) setProfile(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, token]);

  return (
    <div className="min-h-screen w-full bg-[#F5EEDC]">
      {/* 상단 헤더 */}
      <div className="flex h-14 w-full items-center gap-2 bg-[#F6E7B4] px-4">
        <button onClick={handleBack} className="text-[22px]">
          ←
        </button>
        <span className="text-[16px] text-[#4A3828]">뒤로가기</span>
      </div>

      {/* 제목 */}
      <h2 className="mt-6 px-6 text-[6.5vw] font-semibold text-[#4A3828]">
        개인정보
      </h2>

      {/* 프로필 아이콘 */}
      <div className="mt-6 mb-6 flex justify-center">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#6B3F21]">
          <img
            src={profile?.profileImageUrl ?? profileImg}
            alt="profile"
            className="h-20 w-20 rounded-full object-cover"
          />
        </div>
      </div>

      {loading && (
        <div className="text-center text-[14px] text-[#4A3828] opacity-70">
          불러오는 중...
        </div>
      )}

      {profile && (
        <div className="flex flex-col gap-4 px-6">
          {/* 닉네임 */}
          <div className="rounded-xl bg-white p-4 shadow-md">
            <div className="mb-1 text-[6.5vw] font-semibold text-[#4A3828]">
              닉네임
            </div>
            <div className="text-[5vw] font-semibold text-[#4A3828]">
              {profile.username ?? "누구시죠...?"}
            </div>
          </div>

          {/* 가입일 → 마실이와 n일차 */}
          <div className="rounded-xl bg-white p-4 shadow-md">
            <div className="mb-1 text-[6.5vw] font-semibold text-[#4A3828]">
              가입 날짜
            </div>

            {/* 마실이와 n일차 */}
            <div className="text-[5vw] font-semibold text-[#4A3828]">
              {profile.createdAt
                ? `마실이와 ${getDaysWithMasil(profile.createdAt)}일차❤️`
                : "정보 없음"}
            </div>
          </div>

          {/* 전화번호 */}
          <div className="rounded-xl bg-white p-4 shadow-md">
            <div className="mb-1 text-[6.5vw] font-semibold text-[#4A3828]">
              전화번호
            </div>
            <div className="text-[5vw] font-semibold text-[#4A3828]">
              {profile.phone ?? "없음"}
            </div>
          </div>

          {/* 설정 구분선 */}
          <div className="mt-4 mb-1 ml-3 text-[6.5vw] font-semibold text-[#4A3828]">
            기타
          </div>

          {/* 알림 설정 */}
          <div className="rounded-xl bg-white p-4 shadow-md">
            <div className="text-[6.5vw] font-semibold text-[#4A3828]">
              알림 설정
            </div>
            <div className="text-[5vw] font-semibold text-[#4A3828]">
              주문 알림 및 마케팅 수신 설정
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
