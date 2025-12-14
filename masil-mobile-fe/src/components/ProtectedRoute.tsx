import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const access = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  // 인증 정보가 없으면 로그인 페이지로 이동
  if (!access || !userId) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
