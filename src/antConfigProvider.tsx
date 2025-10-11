import React from "react";
import { ConfigProvider } from "antd";

const AntConfigurationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <ConfigProvider
    theme={{
      components: {
        Layout: {
          headerBg: "#0667AF",
          headerColor: "#fff",
          headerHeight: "50px",
        },
        Modal: {
          // ✅ Set default top spacing for all modals
          margin: 20,
        },
      },
    }}
    modal={{
      // ✅ Global Modal configuration (works for v5+)
      style: { top: 20 },
    }}
  >
    {children}
  </ConfigProvider>
);

export default AntConfigurationProvider;
