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
        // Button: {
        //   colorPrimary: "#00b96b",
        //   algorithm: true,
        // },
        // Input: {
        //   colorPrimary: "#eb2f96",
        //   algorithm: true,
        // },
        Layout: {
          headerBg: "#0667AF",
          headerColor: "#fff",
          headerHeight: "50px",
        },
      },
    }}
  >
    {children}
  </ConfigProvider>
);

export default AntConfigurationProvider;
