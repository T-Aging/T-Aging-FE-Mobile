import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-dvh w-dvw justify-center bg-gray-100">
      <div className="flex h-full w-full max-w-[430px] flex-col bg-white">
        <main className="h-full w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
