import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-dvh w-dvw justify-center bg-gray-100">
      <div className="flex h-full w-full flex-col bg-white">
        <main className="h-full w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
