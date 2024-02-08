"use client";
import "./globals.css";
import Header from "./components/header/Header";
import { SessionProvider } from "next-auth/react";
import Footer from "./components/footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "./components/setting/BootstrapClient";

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className="wrapper">
          <BootstrapClient />
          <div className="contentWrapper">
            <div className="navbar">
              <Header />
            </div>
            <div className="main">{children}</div>
          </div>
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}
