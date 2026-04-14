import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./default/ThemeProvider";
import { Toaster } from "sonner";
import AuthContext from "./default/utils/auth-context";
import TanStackProvider from "./default/wrapper/TanStackProvider";
import Logout from "./default/utils/Logout";
import HomeNav from "./default/home-nav";
import ChatbotComponent from "./default/utils/ChatbotComponnet";
import Footer from "./default/Footer";
import NextTopLoader from 'nextjs-toploader';
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learning Management System",
  description: "A modern Learning Management System designed to help students, teachers, and institutions manage courses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
          <meta name="Brigth Path Academy" content="BP Academy" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="BP Academy" />
<meta name="description" content="Best PWA App in the world" />
<meta name="format-detection" content="telephone=no" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="msapplication-config" content="/icons/browserconfig.xml" />
<meta name="msapplication-TileColor" content="#2B5797" />
<meta name="msapplication-tap-highlight" content="no" />
<meta name="theme-color" content="#000000" />

<link rel="apple-touch-icon" href="/logo.jpg" />
<link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />
<link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />

<link rel="icon" type="image/jpg" sizes="32x32" href="/logo.jpg" />
<link rel="icon" type="image/jpg" sizes="16x16" href="/logo.jpg" />
<link rel="manifest" href="/manifest.json" />
<link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
<link rel="shortcut icon" href="/favicon.ico" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

<meta name="twitter:card" content="summary" />
<meta name="twitter:url" content="https://client-side-two-sepia.vercel.app" />
<meta name="twitter:title" content="PWA App" />
<meta name="twitter:description" content="Best PWA App in the world" />
<meta name="twitter:image" content="https://client-side-two-sepia.vercel.app/logo.png" />
<meta name="twitter:creator" content="@DavidWShadow" />
<meta property="og:type" content="website" />
<meta property="og:title" content="PWA App" />
<meta property="og:description" content="Best PWA App in the world" />
<meta property="og:site_name" content="PWA App" />
<meta property="og:url" content="https://client-side-two-sepia.vercel.app" />
<meta property="og:image" content="https://client-side-two-sepia.vercel.app/logo.png" />

   
        </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthContext>
            <NextTopLoader />
            <Toaster />
            <Suspense fallback={<div>Loading...</div>}>
            
          <TanStackProvider>
            <HomeNav />
            <Logout />
            {children}
            <ChatbotComponent />
            <Footer />
            </TanStackProvider>
            
            </Suspense>
          </AuthContext>
          </ThemeProvider>
      </body>
    </html>
  );
}
