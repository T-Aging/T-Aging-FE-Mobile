import api from "@/apis/axiosInstance";

export interface UserProfile {
  id: number;
  username: string | null;
  email: string | null;
  phone: string | null;
  profileImageUrl: string | null;
  createdAt: string;
  lastLoginAt: string | null;
}

export const getUserProfile = async (userId: number, token: string) => {
  try {
    const res = await api.get(`/t-age/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      data: res.data.data as UserProfile,
    };
  } catch (error) {
    console.error("사용자 정보 조회 실패:", error);
    return {
      success: false,
      data: null,
    };
  }
};