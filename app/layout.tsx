import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { CartFavProvider } from "./context/CartFavContext";

// Google Fonts setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for the app
export const metadata: Metadata = {
  title: "Urban Furn",
  description: "Created by Supriyo",
};

// Root layout with sticky footer fix
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col min-h-screen antialiased
          ${geistSans.variable} ${geistMono.variable}`}
      >
        <AuthProvider>
          <CartFavProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </CartFavProvider>
        </AuthProvider>
      </body>
    </html>
  );
}


