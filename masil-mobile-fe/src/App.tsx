import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MainMenu from "./pages/MainMenu";
import MyQR from "./pages/MyQR";
import OrderHistory from "./pages/OrderHistory";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./layout/Layout";
import KakaoRedirect from "./pages/KakaoRedirect";
import PWAInstallUI from "./components/PWAInstallUI";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      {
        path: "redirect",
        element: <KakaoRedirect />,
      },
      { path: "home", element: <MainMenu /> },
      { path: "qr", element: <MyQR /> },
      { path: "orders", element: <OrderHistory /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PWAInstallUI />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
