import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import SchoolLogo from "../components/schoolLogo";
const { Header: AntHeader } = Layout;

const AdminLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <AntHeader className="h-16 px-6 py-2 shadow-md flex items-center justify-between bg-white z-10">
        <div className="text-xl">
          <SchoolLogo />
        </div>
        <Header />
      </AntHeader>

      <div className="flex flex-1 h-0 overflow-hidden">
        <div className="w-[220px] bg-white  overflow-y-auto pt-4">
          <Sidebar role="admin" />
        </div>
        <main
          className="flex-1 p-4 overflow-y-auto"
          style={{
            background: "#F3F3F9",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
