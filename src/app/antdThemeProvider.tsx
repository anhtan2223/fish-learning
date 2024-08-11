'use client'
import React, { useState, useEffect } from 'react';
import { ConfigProvider, theme as antdTheme } from "antd";
import { useTheme } from 'next-themes';
const darkTheme = {
  // colorSuccess: 'rgba(53, 89, 224, 1)', // medium-blue
  // colorWarning: 'rgba(76, 185, 231, 1)', // light-blue
  colorBgBase: '#1a222c',
  // colorBgContainer: 'rgb(36, 48, 63)', // dark secondary background
  // colorText: 'blue', // dark-text
  // colorBgTextHover: "red",
  // colorIconHover: "white",
  // colorTextSecondary: 'white', // dark-text-secondary
};

const lightTheme = {
  // colorPrimary: 'black',
  // colorBgBase: 'rgba(245, 245, 245, 1)', // body
  // colorBgContainer: 'rgba(255, 255, 255, 1)', // secondary
  // colorText: 'black', // text
  // colorTextSecondary: 'rgba(137, 137, 137, 1)', // text-secondary
  // colorBorder: 'rgba(217, 217, 217, 1)', // border color
  
};

export default function AntdThemeProvider({ children }: { children: React.ReactNode }) {

  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    return null
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: resolvedTheme == 'dark' ? [antdTheme.darkAlgorithm] : [antdTheme.defaultAlgorithm],
        token: resolvedTheme == 'dark' ? darkTheme : lightTheme
      }}
    >
      {children}
    </ConfigProvider>
  );
};
